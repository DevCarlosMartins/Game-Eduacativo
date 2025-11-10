package com.game_matematica.game_matematica.control;

import com.game_matematica.game_matematica.model.UserModel;
import com.game_matematica.game_matematica.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UserControl {

    @Autowired
    private UserService userService;

    // Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<UserModel>> listarUsers() {
        List<UserModel> users = userService.listarUsers();
        return ResponseEntity.ok(users);
    }

    // Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> listarUserId(@PathVariable Long id) {
        Optional<UserModel> opt = userService.listarUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
        return ResponseEntity.ok(opt.get());
    }

    // Criar novo usuário
    @PostMapping
    public ResponseEntity<UserModel> criarUser(@RequestBody UserModel userModel) {
        UserModel novoUser = userService.criarUser(userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUser);
    }

    // Deletar usuário por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<UserModel> opt = userService.listarUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }

        userService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
