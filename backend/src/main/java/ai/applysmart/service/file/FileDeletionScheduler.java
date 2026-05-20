package ai.applysmart.service.file;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Component
@RequiredArgsConstructor
public class FileDeletionScheduler {

    private final FileStorageService fileStorageService;

    public void deleteAfterCommit(String publicId) {
        if (isBlank(publicId)) {
            return;
        }

        if (!TransactionSynchronizationManager.isSynchronizationActive()) {
            fileStorageService.deleteFile(publicId);
            return;
        }

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                fileStorageService.deleteFile(publicId);
            }
        });
    }

    public void deleteAfterRollback(String publicId) {
        if (isBlank(publicId) || !TransactionSynchronizationManager.isSynchronizationActive()) {
            return;
        }

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCompletion(int status) {
                if (status == STATUS_ROLLED_BACK) {
                    fileStorageService.deleteFile(publicId);
                }
            }
        });
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
