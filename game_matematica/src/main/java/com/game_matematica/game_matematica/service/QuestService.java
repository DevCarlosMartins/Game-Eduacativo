package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.model.QuestModel;
import com.game_matematica.game_matematica.repository.QuestRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestService {

    @Autowired
    private QuestRepositoy questRepository;

    // Listar todas as quests
    public List<QuestModel> listarQuests() {
        return questRepository.findAll();
    }

    // Buscar quest por ID
    public Optional<QuestModel> listarQuestId(Long id) {
        return questRepository.findById(id);
    }

    // Criar nova quest
    public QuestModel criarQuest(QuestModel questModel) {
        return questRepository.save(questModel);
    }

    // Deletar quest
    public void delete(Long id) {
        questRepository.deleteById(id);
    }
}
