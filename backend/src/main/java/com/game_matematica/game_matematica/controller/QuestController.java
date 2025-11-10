package com.game_matematica.game_matematica.controller;

import com.game_matematica.game_matematica.model.Quest;
import com.game_matematica.game_matematica.service.QuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/quests")
public class QuestController {

    @Autowired
    private final QuestService questService;

    public QuestController(QuestService questService) {
        this.questService = questService;
    }

    // Listar todas as quests
    @GetMapping
    public ResponseEntity<List<Quest>> listarQuests() {
        List<Quest> quests = questService.listarQuests();
        return ResponseEntity.ok(quests);
    }

    // Buscar quest por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> listarQuestId(@PathVariable Long id) {
        Optional<Quest> opt = questService.listarQuestId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quest não encontrada");
        }
        return ResponseEntity.ok(opt.get());
    }

    // Criar nova quest
    @PostMapping
    public ResponseEntity<Quest> criarQuest(@RequestBody Quest quest) {
        Quest novaQuest = questService.criarQuest(quest);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaQuest);
    }

    // Deletar quest por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuest(@PathVariable Long id) {
        Optional<Quest> opt = questService.listarQuestId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quest não encontrada");
        }

        questService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
