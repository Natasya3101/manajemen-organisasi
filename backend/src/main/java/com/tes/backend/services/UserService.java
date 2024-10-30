package com.tes.backend.services;

import com.tes.backend.dto.LoginRequest;
import com.tes.backend.dto.LoginResponse;
import com.tes.backend.dto.RegisterRequest;
import com.tes.backend.jwt.JwtUtil;
import com.tes.backend.models.User;
import com.tes.backend.repositorys.UsersRepository;

import jakarta.servlet.http.Cookie;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public User register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findUserByEmail(request.getEmail()) != null) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encode the password
        user.setFullName(request.getFullName());
        // Optional: user.setAuthProvider("LOCAL"); // Uncomment if using auth providers

        // Save user to the database
        return userRepository.save(user);
    }

    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findUserByEmail(request.getEmail());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Username or Password");
        }
    
        Boolean isMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!isMatch) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Username or Password");
        }
    
        // Jika login berhasil
        LoginResponse response = new LoginResponse();
        response.setEmail(user.getEmail());
    
        Map<String, Object> claims = new HashMap<>();
        Cookie cookie = new Cookie("token", jwtUtil.generateToken(user.getId().toString(), claims));
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 7);
        cookie.setPath("/");
        response.setToken(cookie.getValue());
        return response;
    }
    
    

    public User processOAuth2User(String email, String name) {
        // Check if the user exists by email
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            // Optional: user.setAuthProvider("GOOGLE"); // Uncomment if using auth providers

            // Save the new user to the database
            userRepository.save(user);
        }
        return user;
    }
}
