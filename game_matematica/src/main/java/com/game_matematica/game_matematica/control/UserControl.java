package com.game_matematica.game_matematica.control;

import com.game_matematica.game_matematica.model.UserModel;
import com.game_matematica.game_matematica.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public class UserControl {


    private UserRepository userRepository;


    private List<UserModel> listarUsers(){
        return userRepository.findAll();
    }

    private Optional<UserModel> listarUser(Long id){
        return userRepository.findById(id);
    }

}
