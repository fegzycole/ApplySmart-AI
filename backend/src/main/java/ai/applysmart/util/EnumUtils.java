package ai.applysmart.util;

import ai.applysmart.exception.BadRequestException;

/**
 * Utility class for enum operations.
 */
public final class EnumUtils {

    private EnumUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    /**
     * Parse enum value from string with proper error handling.
     *
     * @param enumClass enum class type
     * @param value string value to parse
     * @param fieldName name of field for error message
     * @param <E> enum type
     * @return parsed enum value
     * @throws BadRequestException if value is invalid
     */
    public static <E extends Enum<E>> E parseEnum(Class<E> enumClass, String value, String fieldName) {
        if (value == null || value.isBlank()) {
            return null;
        }

        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(
                String.format("Invalid %s: %s. Valid values are: %s",
                    fieldName,
                    value,
                    String.join(", ", getEnumNames(enumClass)))
            );
        }
    }

    /**
     * Parse enum value from string with default value.
     *
     * @param enumClass enum class type
     * @param value string value to parse
     * @param defaultValue default value if parsing fails
     * @param <E> enum type
     * @return parsed enum value or default
     */
    public static <E extends Enum<E>> E parseEnumOrDefault(Class<E> enumClass, String value, E defaultValue) {
        if (value == null || value.isBlank()) {
            return defaultValue;
        }

        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return defaultValue;
        }
    }

    /**
     * Get all enum constant names.
     *
     * @param enumClass enum class type
     * @param <E> enum type
     * @return array of enum names
     */
    private static <E extends Enum<E>> String[] getEnumNames(Class<E> enumClass) {
        E[] constants = enumClass.getEnumConstants();
        String[] names = new String[constants.length];
        for (int i = 0; i < constants.length; i++) {
            names[i] = constants[i].name();
        }
        return names;
    }
}
