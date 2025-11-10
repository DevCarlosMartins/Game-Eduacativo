package com.game_matematica.game_matematica.model;


import jakarta.persistence.*;

@Entity
@Table(name = "quests")
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Pergunta;
    private int answer_id;


    public Quest() {
    }

    public Quest(Long id, String pergunta, int answer_id) {
        this.id = id;
        Pergunta = pergunta;
        this.answer_id = answer_id;
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

    public int getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(int answer_id) {
        this.answer_id = answer_id;
    }
}
