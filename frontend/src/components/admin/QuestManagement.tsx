import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questApi } from "../../lib/api";
import type { Quest } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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

export const QuestManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Quest>({
    pergunta: "",
    answer_id: 0,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: quests, isLoading } = useQuery({
    queryKey: ["quests"],
    queryFn: questApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: questApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      setIsOpen(false);
      setFormData({ pergunta: "", answer_id: 0 });
      toast({
        title: "Sucesso!",
        description: "Questão criada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar questão.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: questApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      toast({
        title: "Sucesso!",
        description: "Questão deletada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao deletar questão.",
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
          <CardTitle>Gerenciar Questões</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Questão
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Questão</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="pergunta">Pergunta</Label>
                  <Textarea
                    id="pergunta"
                    value={formData.pergunta}
                    onChange={(e) =>
                      setFormData({ ...formData, pergunta: e.target.value })
                    }
                    placeholder="Ex: Quanto é 12 + 6 / 2?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="answer_id">ID da Resposta Correta</Label>
                  <Input
                    id="answer_id"
                    type="number"
                    value={formData.answer_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        answer_id: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Criar Questão
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
                <TableHead>Pergunta</TableHead>
                <TableHead>ID Resposta Correta</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quests?.map((quest) => (
                <TableRow key={quest.id}>
                  <TableCell>{quest.id}</TableCell>
                  <TableCell>{quest.pergunta}</TableCell>
                  <TableCell>{quest.answer_id}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        quest.id && deleteMutation.mutate(quest.id)
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
