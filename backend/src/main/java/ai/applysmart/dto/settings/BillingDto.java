package ai.applysmart.dto.settings;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BillingDto {
    private String plan;
    private String status;
    private LocalDateTime expiresAt;
    private Boolean hasPaymentMethod;
    private String paymentMethodLast4;
}
