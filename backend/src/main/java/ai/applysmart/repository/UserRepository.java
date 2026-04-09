package ai.applysmart.repository;

import ai.applysmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email address.
     *
     * @param email the email address
     * @return Optional containing the user if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if a user exists with the given email.
     *
     * @param email the email address
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Find user by provider and provider ID (for OAuth2).
     *
     * @param authProvider the authentication provider
     * @param providerId the provider-specific user ID
     * @return Optional containing the user if found
     */
    Optional<User> findByAuthProviderAndProviderId(User.AuthProvider authProvider, String providerId);
}
