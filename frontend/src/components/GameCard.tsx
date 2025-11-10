import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Quest, Answer } from "../lib/api";
import { CheckCircle2, XCircle, Lightbulb, Star } from "lucide-react";
import { cn } from "../lib/utils";

interface GameCardProps {
  quest: Quest;
  answers: Answer[];
  onAnswer: (isCorrect: boolean) => void;
}

export const GameCard = ({ quest, answers, onAnswer }: GameCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    resetQuestion();
  }, [quest]);

  const handleSubmit = () => {
    const correct = selectedAnswer === quest.answer_id;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (!correct && selectedAnswer) {
      // Por enquanto, uma dica genérica
      const wrongAnswer = answers.find(a => a.id === selectedAnswer);
      if (wrongAnswer) {
        setHint("Dica: Lembre-se da ordem das operações matemáticas! Primeiro divisão/multiplicação, depois soma/subtração.");
      }
    }
    
    onAnswer(correct);
  };

  const handleAnswerClick = (answerId: number) => {
    if (!showResult) {
      setSelectedAnswer(answerId);
    }
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
    setHint(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium border-2">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center gap-1 mb-2">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className="w-6 h-6 fill-warning text-warning"
            />
          ))}
        </div>
        <CardTitle className="text-2xl md:text-3xl font-display text-primary">
          Desafio Matemático
        </CardTitle>
        <CardDescription className="text-lg font-medium">
          Escolha a resposta correta!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gradient-primary text-white p-6 rounded-lg text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-display">
            {quest.pergunta}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {answers.map((answer) => (
            <Button
              key={answer.id}
              variant="outline"
              size="lg"
              className={cn(
                "h-20 text-2xl font-bold transition-all duration-300",
                selectedAnswer === answer.id && !showResult && "ring-4 ring-primary scale-105",
                showResult && selectedAnswer === answer.id && answer.id === quest.answer_id && "bg-success text-success-foreground border-success",
                showResult && selectedAnswer === answer.id && answer.id !== quest.answer_id && "bg-error text-error-foreground border-error"
              )}
              onClick={() => handleAnswerClick(answer.id!)}
              disabled={showResult}
            >
              {answer.desc}
            </Button>
          ))}
        </div>

        {!showResult && selectedAnswer && (
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full text-xl font-bold bg-gradient-secondary"
          >
            Confirmar Resposta
          </Button>
        )}

        {showResult && (
          <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
            <div
              className={cn(
                "p-6 rounded-lg text-center",
                isCorrect ? "bg-success/10 border-2 border-success" : "bg-error/10 border-2 border-error"
              )}
            >
              <div className="flex justify-center mb-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-16 h-16 text-success" />
                ) : (
                  <XCircle className="w-16 h-16 text-error" />
                )}
              </div>
              <h4 className="text-2xl font-bold font-display mb-2">
                {isCorrect ? "Parabéns! 🎉" : "Ops! Não foi dessa vez 😊"}
              </h4>
              <p className="text-lg">
                {isCorrect
                  ? "Você acertou! Continue assim!"
                  : "Não desista, você pode tentar de novo!"}
              </p>
            </div>

            {hint && !isCorrect && (
              <div className="bg-warning/10 border-2 border-warning p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-warning mb-1">Dica:</h5>
                    <p className="text-foreground">{hint}</p>
                  </div>
                </div>
              </div>
            )}

            {
            !isCorrect && <Button
              onClick={resetQuestion}
              size="lg"
              variant="outline"
              className="w-full text-xl font-bold"
            >
              Tentar Novamente
            </Button>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
