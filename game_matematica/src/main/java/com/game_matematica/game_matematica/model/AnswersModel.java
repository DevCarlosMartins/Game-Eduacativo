package com.game_matematica.game_matematica.model;


import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class AnswersModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int idQuest;

    private String desc;

    public AnswersModel() {
    }

    public AnswersModel(int idQuest, Long id, String desc) {
        this.idQuest = idQuest;
        this.id = id;
        this.desc = desc;
    }

    public int getIdQuest() {
        return idQuest;
    }

    public void setIdQuest(int idQuest) {
        this.idQuest = idQuest;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
