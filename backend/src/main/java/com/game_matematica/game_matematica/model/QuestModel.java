package com.game_matematica.game_matematica.model;


import jakarta.persistence.*;

@Entity
@Table(name = "quest")
public class QuestModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Pergunta;
    private int id_Repost;


    public QuestModel() {
    }

    public QuestModel(Long id, String pergunta, int id_Repost) {
        this.id = id;
        Pergunta = pergunta;
        this.id_Repost = id_Repost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPergunta() {
        return Pergunta;
    }

    public void setPergunta(String pergunta) {
        Pergunta = pergunta;
    }

    public int getId_Repost() {
        return id_Repost;
    }

    public void setId_Repost(int id_Repost) {
        this.id_Repost = id_Repost;
    }
}
