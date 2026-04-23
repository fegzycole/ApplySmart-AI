package ai.applysmart.service.settings;

import ai.applysmart.entity.User;
import ai.applysmart.exception.UnsupportedFeatureException;
import ai.applysmart.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class SettingsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SettingsDtoMapper settingsDtoMapper;

    @Mock
    private AccountSecurityManager accountSecurityManager;

    @Mock
    private NotificationPreferenceProvider notificationPreferenceProvider;

    @Test
    void getActiveSessionsRejectsUnsupportedSessionTracking() {
        SettingsServiceImpl service = new SettingsServiceImpl(
                userRepository,
                settingsDtoMapper,
                accountSecurityManager,
                notificationPreferenceProvider
        );
        User user = new User();
        user.setId(7L);

        assertThrows(
                UnsupportedFeatureException.class,
                () -> service.getActiveSessions(user)
        );
    }
}
