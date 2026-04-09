package ai.applysmart.repository;

import ai.applysmart.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    Optional<VerificationCode> findByEmailAndCodeAndType(String email, String code, VerificationCode.CodeType type);

    @Modifying
    @Query("DELETE FROM VerificationCode v WHERE v.email = :email AND v.type = :type")
    void deleteByEmailAndType(String email, VerificationCode.CodeType type);

    @Modifying
    @Query("DELETE FROM VerificationCode v WHERE v.expiresAt < :now")
    void deleteExpiredCodes(LocalDateTime now);
}
