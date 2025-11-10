package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.dto.LoginRequest;
import com.game_matematica.game_matematica.model.UserModel;
import com.game_matematica.game_matematica.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private UserRepository userRepository;

    // Mostra todos os User
    public List<UserModel> listarUsers(){

        return userRepository.findAll();
    }

    // Mostra User
    public Optional<UserModel> listarUserId(Long id){

        return userRepository.findById(id);

    }

    public UserModel criarUser(UserModel userModel){
        return userRepository.save(userModel);
    }

    public UserModel login(LoginRequest user) {
        return userRepository.findByEmail(user.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found"));
    }

    // Deleta o User
    public void delete (Long id){

        userRepository.deleteById(id);

    }
}
