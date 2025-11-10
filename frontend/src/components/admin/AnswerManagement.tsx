import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { answerApi } from "../../lib/api";
import type { Answer } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export const AnswerManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Answer>({
    idQuest: 0,
    desc: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: answers, isLoading } = useQuery({
    queryKey: ["answers"],
    queryFn: answerApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: answerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      setIsOpen(false);
      setFormData({ idQuest: 0, desc: "" });
      toast({
        title: "Sucesso!",
        description: "Resposta criada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar resposta.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: answerApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      toast({
        title: "Sucesso!",
        description: "Resposta deletada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao deletar resposta.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gerenciar Respostas</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Resposta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Resposta</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="idQuest">ID da Questão</Label>
                  <Input
                    id="idQuest"
                    type="number"
                    value={formData.idQuest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idQuest: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="desc">Resposta</Label>
                  <Input
                    id="desc"
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                    placeholder="Ex: 15"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Criar Resposta
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>ID da Questão</TableHead>
                <TableHead>Resposta</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {answers?.map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell>{answer.id}</TableCell>
                  <TableCell>{answer.idQuest}</TableCell>
                  <TableCell>{answer.desc}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        answer.id && deleteMutation.mutate(answer.id)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
