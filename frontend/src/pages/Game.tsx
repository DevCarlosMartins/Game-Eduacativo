import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { GameCard } from "../components/GameCard";
import { questApi, answerApi, userApi } from "../lib/api";
import type { Quest, Answer } from "../lib/api";
import { Loader2, Trophy, Home, LogOut } from "lucide-react";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    loadGameData();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const userData = await userApi.getById(JSON.parse(currentUser).id);
        setUser(userData || null);
      }
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      setUser(null);
    }
  };

  const loadGameData = async () => {
    try {
      setLoading(true);
      const [questsData, answersData] = await Promise.all([
        questApi.getAll(),
        answerApi.getAll(),
      ]);

      setQuests(questsData);
      setAnswers(answersData);

      if (questsData.length === 0) {
        toast.error("Nenhuma questão disponível no momento");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar o jogo. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setTotalAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Correto! +1 ponto", {
        icon: "⭐",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestIndex < quests.length - 1) {
      setCurrentQuestIndex(prev => prev + 1);
    } else {
      toast.success(`Jogo finalizado! Pontuação: ${score}/${quests.length}`, {
        icon: "🎉",
      });
      navigate("/result", { state: { score, totalAttempts, totalQuestions: quests.length } });
      setCurrentQuestIndex(0);
      setScore(0);
      setTotalAttempts(0);
    }
  };

  const handleLogout = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        const userData = await userApi.getAll();
        const loggedInUser = userData.find(user => user.email === userEmail);
        if (loggedInUser) {
          await userApi.delete(loggedInUser.id!);
        }
      }
      localStorage.removeItem("currentUser");
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      toast.error("Erro ao realizar logout. Tente novamente.");
    }
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl font-display text-foreground">Carregando desafios...</p>
        </div>
      </div>
    );
  }

  if (quests.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Nenhum desafio disponível
          </h2>
          <p className="text-muted-foreground mb-6">
            Verifique se o backend está rodando e tem questões cadastradas.
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  const currentQuest = quests[currentQuestIndex];
  const currentAnswers = answers.filter(a => a.idQuest === currentQuest.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b-2 border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">
                🎯 Matemática em Ação
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-gradient-primary text-white px-6 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">
                  {score} / {quests.length}
                </span>
              </div>

              {user !== null && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden mt-3 flex justify-center">
            <div className="flex items-center gap-2 bg-gradient-primary text-white px-6 py-2 rounded-full">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">
                {score} / {quests.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-lg text-muted-foreground">
            Questão {currentQuestIndex + 1} de {quests.length}
          </p>
        </div>

        <GameCard
          quest={currentQuest}
          answers={currentAnswers}
          onAnswer={handleAnswer}
        />

        {currentQuestIndex < quests.length - 1 && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleNextQuestion}
              size="lg"
              className="bg-gradient-secondary text-xl font-bold px-8"
            >
              Próxima Questão →
            </Button>
          </div>
        )}

        {currentQuestIndex === quests.length - 1 && score > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleNextQuestion}
              size="lg"
              variant="outline"
              className="text-xl font-bold px-8"
            >
              Ver Resultado Final
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Game;
