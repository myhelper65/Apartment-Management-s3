package com.apartmentmanager.apartmentmanager.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    // Injects the frontend URL from environment properties, defaulting to production domain
//    @Value("${app.frontend.url:https://abc.xyz}")
    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. CORS – must include every origin the browser will call from
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. CSRF – CRITICAL UPDATE: Enabled for SPA using Cookie repository
                // This prevents Cross-Site Request Forgery attacks while allowing React to read the token.
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
                )

                .authorizeHttpRequests(auth -> auth
                        // Static assets
                        .requestMatchers("/", "/index.html", "/static/**", "/*.js", "/*.css", "/vite.svg").permitAll()
                        // OAuth2 redirect endpoints
                        .requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll()
                        // Auth status endpoint
                        .requestMatchers("/api/auth/me").permitAll()
                        // *** CRITICAL: logout endpoint must be explicitly permitted ***
                        .requestMatchers(new AntPathRequestMatcher("/logout")).permitAll()
                        // Health check
                        .requestMatchers("/actuator/health").permitAll()
                        // All other API calls require authentication
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().authenticated()
                )

                // 3. OAuth2 login (Google)
                .oauth2Login(oauth2 -> oauth2
                        // Updated to use the environment variable
                        .defaultSuccessUrl(frontendUrl, true)
                )

                // 4. Logout – SPA-safe: return 200, clear session + cookie
                .logout(logout -> logout
                        // Match a POST to /logout from any origin
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                        .logoutSuccessHandler((request, response, authentication) -> {
                            // Return 200 OK so the browser's fetch() resolves as .ok
                            // Do NOT send a redirect (302) – that breaks SPA CORS handling
                            response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_OK);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"status\":\"logged out\"}");
                        })
                        .invalidateHttpSession(true)   // Destroy the server-side session
                        .clearAuthentication(true)      // Clear SecurityContext
                        .deleteCookies("JSESSIONID")    // Remove the session cookie
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Include production domains alongside local dev environments
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",   // Vite dev server
                "http://localhost:8080",   // Spring itself (for same-origin requests)
                "http://localhost",        // Nginx
                "https://abc.xyz"          // Production domain
        ));

        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        // Allow all headers so Authorization, Content-Type, etc. all pass through
        configuration.setAllowedHeaders(List.of("*"));

        // Expose headers the browser may need to read (e.g. Location on redirect)
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Location"));

        // *** CRITICAL: credentials must be true for cookies (JSESSIONID) to be sent ***
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}