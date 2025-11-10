package com.game_matematica.game_matematica.controller;

import com.game_matematica.game_matematica.dto.LoginRequest;
import com.game_matematica.game_matematica.model.User;
import com.game_matematica.game_matematica.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<User>> listarUsers() {
        List<User> users = userService.listarUsers();
        return ResponseEntity.ok(users);
    }

    // Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> listarUserId(@PathVariable Long id) {
        Optional<User> opt = userService.listarUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
        return ResponseEntity.ok(opt.get());
    }

    // Criar novo usuário
    @PostMapping
    public ResponseEntity<User> criarUser(@RequestBody User user) {
        User novoUser = userService.criarUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUser);
    }

    // Fazer login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest user) {
        User authenticatedUser = userService.login(user);
        return ResponseEntity.status(HttpStatus.OK).body(authenticatedUser);
    }

    // Deletar usuário por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> opt = userService.listarUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }

        userService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
