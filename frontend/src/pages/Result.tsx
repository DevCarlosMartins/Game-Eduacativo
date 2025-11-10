import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { useEffect, useState } from "react";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("🤔");

  useEffect(() => {
    if (location.state) {
      const { score, totalAttempts, totalQuestions } = location.state;
      setScore(score);
      setTotal(totalQuestions);

      const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

      if (percentage === 100) {
        setMessage("Perfeito! Você é um mestre da matemática!");
        setEmoji("🏆");
      } else if (percentage >= 70) {
        setMessage("Excelente trabalho! Você realmente sabe muito.");
        setEmoji("🎉");
      } else if (percentage >= 50) {
        setMessage("Muito bem! Continue praticando para chegar ao topo.");
        setEmoji("😮");
      } else {
        setMessage("Não desista! A prática leva à perfeição.");
        setEmoji("😊");
      }
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleRetry = () => {
    navigate("/game");
  };

  const handleMenu = () => {
    navigate("/");
  };

  if (!location.state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-strong border-2 text-center animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white">
            <Trophy className="w-12 h-12" />
          </div>
          <CardTitle className="text-4xl font-display font-bold text-primary">
            Fim de Jogo!
          </CardTitle>
          <CardDescription className="text-xl font-medium">
            Confira seu desempenho:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="text-7xl font-bold text-foreground">{emoji}</div>
            <p className="text-2xl font-semibold text-muted-foreground">
              Você acertou
            </p>
            <h2 className="text-6xl font-display font-bold text-foreground">
              {score} / {total}
            </h2>
            <p className="text-xl text-foreground pt-2">{message}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleRetry}
              size="lg"
              className="bg-gradient-secondary text-xl font-bold w-full"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Tentar Novamente
            </Button>
            <Button
              onClick={handleMenu}
              size="lg"
              variant="outline"
              className="text-xl font-bold w-full"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Result;