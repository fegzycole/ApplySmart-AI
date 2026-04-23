package ai.applysmart.repository;

import ai.applysmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByAuthProviderAndProviderId(User.AuthProvider authProvider, String providerId);

    long countByEnabledTrue();

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
