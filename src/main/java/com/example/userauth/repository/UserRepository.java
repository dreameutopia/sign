package com.example.userauth.repository;

import com.example.userauth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByConfirmationToken(String token);
    User findByPasswordResetToken(String token);
}