package ai.applysmart.config;

import ai.applysmart.security.CustomAccessDeniedHandler;
import ai.applysmart.security.CustomUserDetailsService;
import ai.applysmart.security.JwtAuthenticationEntryPoint;
import ai.applysmart.security.JwtAuthenticationFilter;
import ai.applysmart.security.oauth2.CustomOAuth2UserService;
import ai.applysmart.security.oauth2.OAuth2AuthenticationFailureHandler;
import ai.applysmart.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Security configuration for the application.
 * Configures JWT authentication, OAuth2 login (optional), and authorization rules.
 */
@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    // OAuth2 components are optional - only used when OAuth2 is configured
    @Autowired(required = false)
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired(required = false)
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired(required = false)
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Autowired(required = false)
    private ClientRegistrationRepository clientRegistrationRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints - No authentication required
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/oauth2/**",
                                "/error",
                                "/actuator/health",
                                "/api-docs/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()
                        // Admin endpoints - Requires ADMIN role + JWT
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        // All API endpoints require JWT authentication
                        // Protected: /api/v1/resumes/**, /api/v1/cover-letters/**, /api/v1/jobs/**
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler)
                );

        // Configure OAuth2 login only if ClientRegistrationRepository is available
        if (clientRegistrationRepository != null && customOAuth2UserService != null) {
            log.info("OAuth2 configuration detected - enabling OAuth2 login");
            http.oauth2Login(oauth2 -> oauth2
                    .authorizationEndpoint(authorization -> authorization
                            .baseUri("/oauth2/authorize")
                    )
                    .redirectionEndpoint(redirection -> redirection
                            .baseUri("/oauth2/callback/*")
                    )
                    .userInfoEndpoint(userInfo -> userInfo
                            .userService(customOAuth2UserService)
                    )
                    .successHandler(oAuth2AuthenticationSuccessHandler)
                    .failureHandler(oAuth2AuthenticationFailureHandler)
            );
        } else {
            log.warn("OAuth2 not configured - OAuth2 login will be disabled. JWT authentication only.");
        }

        http.authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000",
                "https://applysmart-ai.vercel.app",
                "https://applysmart-ai.org",
                "http://applysmart-ai.org",
                "https://www.applysmart-ai.org",
                "http://www.applysmart-ai.org"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
