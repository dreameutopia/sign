package com.example.userauth.service;

import com.example.userauth.model.User;
import com.example.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Transactional
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmationToken(UUID.randomUUID().toString());
        User savedUser = userRepository.save(user);
        emailService.sendConfirmationEmail(user);
        return savedUser;
    }

    @Transactional
    public boolean confirmUserAccount(String token) {
        User user = userRepository.findByConfirmationToken(token);
        if (user != null) {
            user.setEnabled(true);
            user.setConfirmationToken(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public void resetPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        userRepository.save(user);
    }

    @Transactional
    public boolean createPasswordResetTokenForUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            user.setPasswordResetToken(token);
            user.setPasswordResetTokenExpiry(LocalDateTime.now().plusHours(24));
            userRepository.save(user);
            emailService.sendPasswordResetEmail(user);
            return true;
        }
        return false;
    }

    @Transactional
    public User getUserByPasswordResetToken(String token) {
        return userRepository.findByPasswordResetToken(token);
    }

    @Transactional
    public void updateProfile(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void incrementLoginAttempts(User user) {
        user.setLoginAttempts(user.getLoginAttempts() + 1);
        user.setLastLoginAttempt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void resetLoginAttempts(User user) {
        user.setLoginAttempts(0);
        user.setLastLoginAttempt(null);
        userRepository.save(user);
    }
}