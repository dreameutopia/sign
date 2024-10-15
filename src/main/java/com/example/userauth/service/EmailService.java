package com.example.userauth.service;

import com.example.userauth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("确认您的账户");
        message.setText("请点击以下链接确认您的账户: " +
                "http://localhost:8080/confirm-account?token=" + user.getConfirmationToken());
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("重置密码");
        message.setText("请点击以下链接重置您的密码: " +
                "http://localhost:8080/reset-password?token=" + user.getPasswordResetToken());
        mailSender.send(message);
    }
}