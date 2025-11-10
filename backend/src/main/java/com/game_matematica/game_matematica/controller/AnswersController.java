package com.game_matematica.game_matematica.controller;

import com.game_matematica.game_matematica.model.Answer;
import com.game_matematica.game_matematica.service.AnswersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/answers")
public class AnswersController {

    @Autowired
    private final AnswersService answersService;

    public AnswersController(AnswersService answersService) {
        this.answersService = answersService;
    }

    // Listar todas as respostas
    @GetMapping
    public ResponseEntity<List<Answer>> listarAnswers() {
        List<Answer> answers = answersService.listarAnswers();
        return ResponseEntity.ok(answers);
    }

    // Buscar resposta por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> listarAnswerId(@PathVariable Long id) {
        Optional<Answer> opt = answersService.listarAnswerId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Resposta não encontrada");
        }
        return ResponseEntity.ok(opt.get());
    }

    // Criar nova resposta
    @PostMapping
    public ResponseEntity<Answer> criarAnswer(@RequestBody Answer answer) {
        Answer novaAnswer = answersService.criarAnswer(answer);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaAnswer);
    }

    // Deletar resposta por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Long id) {
        Optional<Answer> opt = answersService.listarAnswerId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Resposta não encontrada");
        }

        answersService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
