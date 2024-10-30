package com.tes.backend.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tes.backend.models.User;

public interface UsersRepository extends JpaRepository<User, String>{
    User findUserByEmail(String email);
}

