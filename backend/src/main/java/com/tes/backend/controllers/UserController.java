package com.tes.backend.controllers;

import com.tes.backend.dto.LoginRequest;
import com.tes.backend.dto.LoginResponse;
import com.tes.backend.dto.RegisterRequest;
import com.tes.backend.models.User;
import com.tes.backend.services.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
@Tag(name = "user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Optionally, you can add a message in the body
        }
    }

    

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest == null || loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password must not be null.");
        }

        try {
            // Attempt to authenticate and return successful login response
            LoginResponse loginResponse = userService.login(loginRequest);
            return ResponseEntity.ok(loginResponse);
        } catch (ResponseStatusException e) {
            // Menangani exception yang dikenal
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            // Menyediakan pesan detail saat terjadi kesalahan
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }




    @GetMapping("/google-login")
    public ResponseEntity<String> googleLogin(OAuth2AuthenticationToken authenticationToken) {
        if (authenticationToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("User is not authenticated");
        }
        return ResponseEntity.ok("User is authenticated as " + authenticationToken.getPrincipal().getName());
    }
}
