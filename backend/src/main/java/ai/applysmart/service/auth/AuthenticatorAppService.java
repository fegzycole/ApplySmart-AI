package ai.applysmart.service.auth;

import ai.applysmart.entity.User;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.time.Clock;
import java.util.Arrays;
@Component
public class AuthenticatorAppService {

    private static final String ISSUER = "ApplySmart AI";
    private static final String HMAC_ALGORITHM = "HmacSHA1";
    private static final int SECRET_SIZE_BYTES = 20;
    private static final int TIME_STEP_SECONDS = 30;
    private static final int VALIDATION_WINDOW_STEPS = 1;
    private static final char[] BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".toCharArray();

    private final SecureRandom secureRandom = new SecureRandom();
    private final Clock clock;

    public AuthenticatorAppService(Clock clock) {
        this.clock = clock;
    }

    public String generateSecret() {
        byte[] bytes = new byte[SECRET_SIZE_BYTES];
        secureRandom.nextBytes(bytes);
        return encodeBase32(bytes);
    }

    public String buildOtpAuthUri(User user, String secret) {
        return "otpauth://totp/"
                + urlEncode(ISSUER + ":" + user.getEmail())
                + "?secret=" + urlEncode(secret)
                + "&issuer=" + urlEncode(ISSUER)
                + "&algorithm=SHA1"
                + "&digits=6"
                + "&period=" + TIME_STEP_SECONDS;
    }

    public boolean verifyCode(String secret, String code) {
        if (secret == null || secret.isBlank() || code == null || !code.matches("^\\d{6}$")) {
            return false;
        }

        long currentCounter = clock.instant().getEpochSecond() / TIME_STEP_SECONDS;
        for (int offset = -VALIDATION_WINDOW_STEPS; offset <= VALIDATION_WINDOW_STEPS; offset++) {
            if (generateCode(secret, currentCounter + offset).equals(code)) {
                return true;
            }
        }

        return false;
    }

    public String getIssuer() {
        return ISSUER;
    }

    private String generateCode(String secret, long counter) {
        byte[] decodedSecret = decodeBase32(secret);
        byte[] counterBytes = ByteBuffer.allocate(8).putLong(counter).array();

        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(new SecretKeySpec(decodedSecret, HMAC_ALGORITHM));
            byte[] hash = mac.doFinal(counterBytes);
            int offset = hash[hash.length - 1] & 0x0F;
            int binary = ((hash[offset] & 0x7F) << 24)
                    | ((hash[offset + 1] & 0xFF) << 16)
                    | ((hash[offset + 2] & 0xFF) << 8)
                    | (hash[offset + 3] & 0xFF);
            int otp = binary % 1_000_000;
            return String.format("%06d", otp);
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Failed to generate authenticator code", exception);
        }
    }

    private String encodeBase32(byte[] bytes) {
        StringBuilder builder = new StringBuilder((bytes.length * 8 + 4) / 5);
        int buffer = bytes[0];
        int next = 1;
        int bitsLeft = 8;

        while (bitsLeft > 0 || next < bytes.length) {
            if (bitsLeft < 5) {
                if (next < bytes.length) {
                    buffer <<= 8;
                    buffer |= bytes[next++] & 0xFF;
                    bitsLeft += 8;
                } else {
                    int padding = 5 - bitsLeft;
                    buffer <<= padding;
                    bitsLeft += padding;
                }
            }

            int index = (buffer >> (bitsLeft - 5)) & 0x1F;
            bitsLeft -= 5;
            builder.append(BASE32_ALPHABET[index]);
        }

        return builder.toString();
    }

    private byte[] decodeBase32(String value) {
        String normalized = value.trim().replace("=", "").toUpperCase();
        byte[] bytes = new byte[normalized.length() * 5 / 8];
        int buffer = 0;
        int bitsLeft = 0;
        int index = 0;

        for (char character : normalized.toCharArray()) {
            int alphabetIndex = indexOfBase32Character(character);
            if (alphabetIndex < 0) {
                throw new IllegalArgumentException("Invalid authenticator secret");
            }

            buffer <<= 5;
            buffer |= alphabetIndex & 0x1F;
            bitsLeft += 5;

            if (bitsLeft >= 8) {
                bytes[index++] = (byte) ((buffer >> (bitsLeft - 8)) & 0xFF);
                bitsLeft -= 8;
            }
        }

        return index == bytes.length ? bytes : Arrays.copyOf(bytes, index);
    }

    private int indexOfBase32Character(char character) {
        for (int index = 0; index < BASE32_ALPHABET.length; index++) {
            if (BASE32_ALPHABET[index] == character) {
                return index;
            }
        }

        return -1;
    }

    private String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
