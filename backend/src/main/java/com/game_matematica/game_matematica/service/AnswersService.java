package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.model.Answer;
import com.game_matematica.game_matematica.repository.AnswersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswersService {

    @Autowired
    private final AnswersRepository answersRepository;

    public AnswersService(AnswersRepository answersRepository) {
        this.answersRepository = answersRepository;
    }

    // Listar todas as respostas
    public List<Answer> listarAnswers() {
        return answersRepository.findAll();
    }

    // Buscar resposta por ID
    public Optional<Answer> listarAnswerId(Long id) {
        return answersRepository.findById(id);
    }

    // Criar nova resposta
    public Answer criarAnswer(Answer answer) {
        return answersRepository.save(answer);
    }

    // Deletar resposta por ID
    public void delete(Long id) {
        answersRepository.deleteById(id);
    }
}
