package ai.applysmart.service.file;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class FileDeletionSchedulerTest {

    @Mock
    private FileStorageService fileStorageService;

    @AfterEach
    void tearDown() {
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.clearSynchronization();
        }
    }

    @Test
    void deleteAfterCommitDeletesImmediatelyWhenNoTransactionIsActive() {
        FileDeletionScheduler scheduler = new FileDeletionScheduler(fileStorageService);

        scheduler.deleteAfterCommit("asset-public-id");

        verify(fileStorageService).deleteFile("asset-public-id");
    }

    @Test
    void deleteAfterCommitDefersDeletionUntilTransactionCommits() {
        FileDeletionScheduler scheduler = new FileDeletionScheduler(fileStorageService);
        TransactionSynchronizationManager.initSynchronization();

        scheduler.deleteAfterCommit("asset-public-id");

        verify(fileStorageService, never()).deleteFile("asset-public-id");
        TransactionSynchronizationManager.getSynchronizations()
                .forEach(TransactionSynchronization::afterCommit);
        verify(fileStorageService).deleteFile("asset-public-id");
    }

    @Test
    void deleteAfterRollbackOnlyDeletesWhenTransactionRollsBack() {
        FileDeletionScheduler scheduler = new FileDeletionScheduler(fileStorageService);
        TransactionSynchronizationManager.initSynchronization();

        scheduler.deleteAfterRollback("new-asset-public-id");

        verify(fileStorageService, never()).deleteFile("new-asset-public-id");
        TransactionSynchronizationManager.getSynchronizations()
                .forEach(synchronization -> synchronization.afterCompletion(TransactionSynchronization.STATUS_ROLLED_BACK));
        verify(fileStorageService).deleteFile("new-asset-public-id");
    }
}
