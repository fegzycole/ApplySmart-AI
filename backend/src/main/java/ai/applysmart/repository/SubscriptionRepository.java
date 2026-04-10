package ai.applysmart.repository;

import ai.applysmart.entity.Subscription;
import ai.applysmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUser(User user);

    long countByPlan(Subscription.Plan plan);
}
