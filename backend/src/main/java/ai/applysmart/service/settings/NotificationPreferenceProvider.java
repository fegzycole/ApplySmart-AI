package ai.applysmart.service.settings;

import ai.applysmart.dto.settings.NotificationPreferenceDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationPreferenceProvider {

    public List<NotificationPreferenceDto> getDefaults() {
        return List.of(
                preference(
                        "email-applications",
                        "Application Updates",
                        "Receive email notifications about your job applications",
                        true
                ),
                preference(
                        "email-interviews",
                        "Interview Reminders",
                        "Get reminders before scheduled interviews",
                        true
                ),
                preference(
                        "email-tips",
                        "Career Tips",
                        "Receive tips and advice for your job search",
                        false
                ),
                preference(
                        "email-marketing",
                        "Marketing Emails",
                        "Product updates and promotional offers",
                        false
                )
        );
    }

    private NotificationPreferenceDto preference(String id, String label, String description, boolean enabled) {
        return NotificationPreferenceDto.builder()
                .id(id)
                .label(label)
                .description(description)
                .enabled(enabled)
                .build();
    }
}
