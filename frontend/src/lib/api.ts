const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:8080';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Quest {
  id?: number;
  pergunta: string;
  answer_id: number;
}

export interface Answer {
  id?: number;
  idQuest: number;
  desc: string;
}

export interface GameResponse {
  correct: boolean;
  hint?: string;
  correctAnswer?: string;
}

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return response.json();
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return response.json();
  },

  create: async (user: User): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  },

  login: async (user: UserLogin): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Erro ao fazer login');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
  },
};

// Quest API
export const questApi = {
  getAll: async (): Promise<Quest[]> => {
    const response = await fetch(`${API_BASE_URL}/quests`);
    if (!response.ok) throw new Error('Erro ao buscar questões');
    return response.json();
  },

  getById: async (id: number): Promise<Quest> => {
    const response = await fetch(`${API_BASE_URL}/quests/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar questão');
    return response.json();
  },

  create: async (quest: Quest): Promise<Quest> => {
    const response = await fetch(`${API_BASE_URL}/quests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quest),
    });
    if (!response.ok) throw new Error('Erro ao criar questão');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/quests/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar questão');
  },
};

// Answer API
export const answerApi = {
  getAll: async (): Promise<Answer[]> => {
    const response = await fetch(`${API_BASE_URL}/answers`);
    if (!response.ok) throw new Error('Erro ao buscar respostas');
    return response.json();
  },

  getById: async (id: number): Promise<Answer> => {
    const response = await fetch(`${API_BASE_URL}/answers/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar resposta');
    return response.json();
  },

  getByQuestId: async (questId: number): Promise<Answer[]> => {
    const allAnswers = await answerApi.getAll();
    return allAnswers.filter(answer => answer.idQuest === questId);
  },

  create: async (answer: Answer): Promise<Answer> => {
    const response = await fetch(`${API_BASE_URL}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answer),
    });
    if (!response.ok) throw new Error('Erro ao criar resposta');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/answers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar resposta');
  },
};
