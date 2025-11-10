package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.dto.LoginRequest;
import com.game_matematica.game_matematica.model.User;
import com.game_matematica.game_matematica.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder; // <-- IMPORTAR
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // <-- ADICIONAR

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) { // <-- MODIFICAR
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // <-- ADICIONAR
    }

    // Mostra todos os User
    public List<User> listarUsers(){
        return userRepository.findAll();
    }

    // Mostra User
    public Optional<User> listarUserId(Long id){
        return userRepository.findById(id);
    }

    // --- MÉTODO MODIFICADO ---
    public User criarUser(User user){
        // 1. Verificar se o e-mail já existe
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }

        // 2. Criptografar a senha antes de salvar
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // 3. Salvar o usuário com a senha criptografada
        return userRepository.save(user);
    }

    // --- MÉTODO MODIFICADO ---
    public User login(LoginRequest user) {
        // 1. Buscar o usuário pelo e-mail
        User userFromDb = userRepository.findByEmail(user.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email não encontrado"));

        // 2. Comparar a senha enviada (texto plano) com a senha do banco (hashed)
        if (!passwordEncoder.matches(user.password(), userFromDb.getPassword())) {
            // Usar mensagem genérica por segurança
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
        }

        // 3. Se as senhas baterem, retorna o usuário
        return userFromDb;
    }

    // Deleta o User
    public void delete (Long id){
        userRepository.deleteById(id);
    }
}