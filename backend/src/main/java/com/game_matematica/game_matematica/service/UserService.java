package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.model.UserModel;
import com.game_matematica.game_matematica.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

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

    // Deleta o User
    public void delete (Long id){

        userRepository.deleteById(id);

    }
}
