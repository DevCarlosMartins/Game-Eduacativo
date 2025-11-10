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
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> listarUsers(){
        return userRepository.findAll();
    }

    public Optional<User> listarUserId(Long id){
        return userRepository.findById(id);
    }

    public User criarUser(User user){
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public User login(LoginRequest user) {
        User userFromDb = userRepository.findByEmail(user.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email não encontrado"));

        if (!passwordEncoder.matches(user.password(), userFromDb.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas");
        }

        return userFromDb;
    }

    public void delete (Long id){
        userRepository.deleteById(id);
    }
}