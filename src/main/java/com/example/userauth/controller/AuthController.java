package com.example.userauth.controller;

import com.example.userauth.model.User;
import com.example.userauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "register";
        }
        userService.registerUser(user);
        model.addAttribute("message", "注册成功！请检查您的邮箱以激活账户。");
        return "login";
    }

    @GetMapping("/confirm-account")
    public String confirmUserAccount(@RequestParam("token") String confirmationToken, Model model) {
        boolean isConfirmed = userService.confirmUserAccount(confirmationToken);
        if (isConfirmed) {
            model.addAttribute("message", "账户已成功激活！");
        } else {
            model.addAttribute("message", "无效的确认令牌。");
        }
        return "login";
    }

    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password";
    }

    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email, Model model) {
        boolean isTokenCreated = userService.createPasswordResetTokenForUser(email);
        if (isTokenCreated) {
            model.addAttribute("message", "密码重置链接已发送到您的邮箱。");
        } else {
            model.addAttribute("error", "未找到与该邮箱关联的账户。");
        }
        return "forgot-password";
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        User user = userService.getUserByPasswordResetToken(token);
        if (user == null) {
            model.addAttribute("error", "无效的密码重置令牌。");
            return "login";
        }
        model.addAttribute("token", token);
        return "reset-password";
    }

    @PostMapping("/reset-password")
    public String processResetPassword(@RequestParam("token") String token,
                                       @RequestParam("password") String password,
                                       Model model) {
        User user = userService.getUserByPasswordResetToken(token);
        if (user == null) {
            model.addAttribute("error", "无效的密码重置令牌。");
            return "login";
        }
        userService.resetPassword(user, password);
        model.addAttribute("message", "密码已成功重置。请使用新密码登录。");
        return "login";
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }
}