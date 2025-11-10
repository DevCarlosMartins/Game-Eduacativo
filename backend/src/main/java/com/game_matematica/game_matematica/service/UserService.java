package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.dto.LoginRequest;
import com.game_matematica.game_matematica.model.User;
import com.game_matematica.game_matematica.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Mostra todos os User
    public List<User> listarUsers(){

        return userRepository.findAll();
    }

    // Mostra User
    public Optional<User> listarUserId(Long id){

        return userRepository.findById(id);

    }

    public User criarUser(User user){
        return userRepository.save(user);
    }

    public User login(LoginRequest user) {
        return userRepository.findByEmail(user.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found"));
    }

    // Deleta o User
    public void delete (Long id){

        userRepository.deleteById(id);

    }
}
