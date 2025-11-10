package com.game_matematica.game_matematica.service;

import com.game_matematica.game_matematica.model.Quest;
import com.game_matematica.game_matematica.repository.QuestRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestService {

    @Autowired
    private final QuestRepositoy questRepository;

    public QuestService(QuestRepositoy questRepository) {
        this.questRepository = questRepository;
    }
    // Listar todas as quests
    public List<Quest> listarQuests() {
        return questRepository.findAll();
    }

    // Buscar quest por ID
    public Optional<Quest> listarQuestId(Long id) {
        return questRepository.findById(id);
    }

    // Criar nova quest
    public Quest criarQuest(Quest quest) {
        return questRepository.save(quest);
    }

    // Deletar quest
    public void delete(Long id) {
        questRepository.deleteById(id);
    }
}
