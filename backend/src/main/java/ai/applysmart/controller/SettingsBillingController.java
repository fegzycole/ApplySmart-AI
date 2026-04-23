package ai.applysmart.controller;

import ai.applysmart.dto.common.ApiResponse;
import ai.applysmart.dto.settings.BillingDto;
import ai.applysmart.entity.User;
import ai.applysmart.exception.UnsupportedFeatureException;
import ai.applysmart.service.settings.SettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "User settings and account management endpoints")
public class SettingsBillingController {

    private final SettingsService settingsService;

    @GetMapping("/billing/plan")
    @Operation(summary = "Get billing plan information")
    public ResponseEntity<BillingDto> getBillingInfo(@AuthenticationPrincipal User user) {
        log.info("Get billing info request from user: {}", user.getId());
        BillingDto billing = settingsService.getBillingInfo(user);
        return ResponseEntity.ok(billing);
    }

    @GetMapping("/billing/payment-method")
    @Operation(summary = "Get payment method")
    public ResponseEntity<ApiResponse<Void>> getPaymentMethod(@AuthenticationPrincipal User user) {
        log.info("Get payment method request from user: {}", user.getId());
        throw new UnsupportedFeatureException("Payment methods are not available until billing is enabled");
    }

    @PatchMapping("/billing/payment-method")
    @Operation(summary = "Update payment method")
    public ResponseEntity<ApiResponse<Void>> updatePaymentMethod(@AuthenticationPrincipal User user) {
        log.info("Update payment method request from user: {}", user.getId());
        throw new UnsupportedFeatureException("Payment methods are not available until billing is enabled");
    }

    @GetMapping("/billing/invoices")
    @Operation(summary = "Get invoice history")
    public ResponseEntity<ApiResponse<Void>> getInvoices(@AuthenticationPrincipal User user) {
        log.info("Get invoices request from user: {}", user.getId());
        throw new UnsupportedFeatureException("Invoices are not available until billing is enabled");
    }

    @PostMapping("/billing/subscription/cancel")
    @Operation(summary = "Cancel subscription")
    public ResponseEntity<ApiResponse<Void>> cancelSubscription(@AuthenticationPrincipal User user) {
        log.info("Cancel subscription request from user: {}", user.getId());
        throw new UnsupportedFeatureException("Subscription cancellation is not available until billing is enabled");
    }
}
