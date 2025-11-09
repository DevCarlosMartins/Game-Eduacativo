package com.game_matematica.game_matematica.repository;

import com.game_matematica.game_matematica.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,Long> {

}
