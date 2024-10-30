package com.tes.backend.models;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @UuidGenerator
    @Column(name ="id", length = 36, nullable=false)
    private String id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", length = 2000, nullable = false)
    private String password;

    @Column(name = "full_name")
    private String fullName;

    // @Column(name = "auth_provider")
    // private String authProvider;

    
    
}
