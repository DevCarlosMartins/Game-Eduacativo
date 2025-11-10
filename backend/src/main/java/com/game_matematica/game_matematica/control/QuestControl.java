package com.game_matematica.game_matematica.control;

import com.game_matematica.game_matematica.model.QuestModel;
import com.game_matematica.game_matematica.service.QuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/quests")
public class QuestControl {

    @Autowired
    private QuestService questService;

    // Listar todas as quests
    @GetMapping
    public ResponseEntity<List<QuestModel>> listarQuests() {
        List<QuestModel> quests = questService.listarQuests();
        return ResponseEntity.ok(quests);
    }

    // Buscar quest por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> listarQuestId(@PathVariable Long id) {
        Optional<QuestModel> opt = questService.listarQuestId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quest não encontrada");
        }
        return ResponseEntity.ok(opt.get());
    }

    // Criar nova quest
    @PostMapping
    public ResponseEntity<QuestModel> criarQuest(@RequestBody QuestModel questModel) {
        QuestModel novaQuest = questService.criarQuest(questModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaQuest);
    }

    // Deletar quest por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuest(@PathVariable Long id) {
        Optional<QuestModel> opt = questService.listarQuestId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quest não encontrada");
        }

        questService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
