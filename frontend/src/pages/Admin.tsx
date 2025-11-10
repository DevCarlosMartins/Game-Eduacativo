import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UserManagement } from "../components/admin/UserManagement";
import { QuestManagement } from "../components/admin/QuestManagement.tsx";
import { AnswerManagement } from "../components/admin/AnswerManagement.tsx";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground font-heading">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie questões, respostas e usuários do sistema
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <Tabs defaultValue="quests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quests">Questões</TabsTrigger>
            <TabsTrigger value="answers">Respostas</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="mt-6">
            <QuestManagement />
          </TabsContent>

          <TabsContent value="answers" className="mt-6">
            <AnswerManagement />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
