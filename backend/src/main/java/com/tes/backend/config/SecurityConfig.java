package com.tes.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tes.backend.jwt.JwtRequestFilter;

@Configuration
public class SecurityConfig {
    @Autowired
    JwtRequestFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for REST API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("api/anggota/add-anggota",
                                "api/anggota/get-all")
                    .authenticated() // Require authentication for these endpoints
                .requestMatchers("api/user/register",
                                 "api/user/login",
                                 "/v3/api-docs/**",
                                 "/swagger-ui/**")
                    
                    .permitAll())
            .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class);
            
            // .oauth2Login(oauth -> oauth
            //     .loginPage("/api/user/auth/google-login") // Custom login page for OAuth2
            // );
        
        return http.build();
    }
}
