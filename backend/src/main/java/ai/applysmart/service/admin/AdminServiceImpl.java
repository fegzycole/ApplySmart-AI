package ai.applysmart.service.admin;

import ai.applysmart.dto.admin.AnalyticsDto;
import ai.applysmart.dto.admin.UserAdminDto;
import ai.applysmart.repository.UserRepository;
import ai.applysmart.service.admin.AdminService;
import ai.applysmart.service.admin.AdminAnalyticsAssembler;
import ai.applysmart.service.admin.AdminUserDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final AdminUserDtoMapper adminUserDtoMapper;
    private final AdminAnalyticsAssembler adminAnalyticsAssembler;

    @Override
    public List<UserAdminDto> getAllUsers() {
        log.info("Fetching all users for admin");
        return userRepository.findAll().stream()
                .map(adminUserDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<UserAdminDto> getAllUsers(Pageable pageable) {
        log.info("Fetching paginated users for admin - page: {}, size: {}",
                 pageable.getPageNumber(), pageable.getPageSize());
        return userRepository.findAll(pageable)
                .map(adminUserDtoMapper::toDto);
    }

    @Override
    public AnalyticsDto getAnalytics() {
        log.info("Generating admin analytics");
        return adminAnalyticsAssembler.build();
    }
}
