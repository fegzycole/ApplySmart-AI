package ai.applysmart.service.admin;

import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.dto.admin.UserAdminDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    List<UserAdminDto> getAllUsers();
    Page<UserAdminDto> getAllUsers(Pageable pageable);
    AnalyticsDto getAnalytics();
}
