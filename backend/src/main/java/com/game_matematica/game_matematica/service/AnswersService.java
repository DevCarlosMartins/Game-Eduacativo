package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.model.AnswersModel;
import com.game_matematica.game_matematica.repository.AnswersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswersService {

    @Autowired
    private AnswersRepository answersRepository;

    // Listar todas as respostas
    public List<AnswersModel> listarAnswers() {
        return answersRepository.findAll();
    }

    // Buscar resposta por ID
    public Optional<AnswersModel> listarAnswerId(Long id) {
        return answersRepository.findById(id);
    }

    // Criar nova resposta
    public AnswersModel criarAnswer(AnswersModel answersModel) {
        return answersRepository.save(answersModel);
    }

    // Deletar resposta por ID
    public void delete(Long id) {
        answersRepository.deleteById(id);
    }
}
