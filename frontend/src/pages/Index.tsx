import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Brain, Users, Trophy, Sparkles } from "lucide-react";
import matematicaEmAcao from "../assets/matematica-em-acao.png";

const Index = () => {
  const navigate = useNavigate();

  const handleGuestMode = () => {
    navigate("/game");
  };

  const features = [
    {
      icon: Brain,
      title: "Aprenda Brincando",
      description: "Desafios matemáticos divertidos e educativos",
    },
    {
      icon: Sparkles,
      title: "Dicas Inteligentes",
      description: "Receba ajuda quando precisar com dicas personalizadas",
    },
    {
      icon: Trophy,
      title: "Acompanhe seu Progresso",
      description: "Veja sua evolução e conquiste estrelas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-6">
              <div className="inline-block bg-gradient-primary text-white px-6 py-2 rounded-full font-bold text-sm md:text-base shadow-soft">
                🎯 Matemática em Ação - Educação de Qualidade Para Todos
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                Matemática em{" "}
                <span className="text-primary">Ação!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Transforme o aprendizado de matemática em uma aventura divertida e interativa. 
                Perfeito para crianças nos anos iniciais!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => navigate("/auth")}
                  size="lg"
                  className="bg-gradient-primary text-white text-xl font-bold shadow-medium hover:shadow-strong transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-2" />
                  Entrar / Cadastrar
                </Button>
                
                <Button
                  onClick={handleGuestMode}
                  size="lg"
                  variant="outline"
                  className="text-xl font-bold border-2"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Jogar como Visitante
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-secondary opacity-20 blur-3xl rounded-full" />
              <img
                src={matematicaEmAcao}
                alt="Crianças aprendendo matemática de forma divertida"
                className="relative rounded-3xl shadow-strong w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Por que escolher Matemática em Ação?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para tornar a matemática acessível e divertida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center shadow-medium hover:shadow-strong transition-all duration-300 border-2"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-display">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-secondary text-white shadow-strong border-0">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="text-5xl">🚀</div>
              <CardTitle className="text-3xl md:text-4xl font-display font-bold">
                Pronto para começar?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg max-w-2xl mx-auto">
                Junte-se a milhares de crianças que já estão aprendendo matemática de forma divertida!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                variant="secondary"
                className="text-xl font-bold"
              >
                Criar Conta Grátis
              </Button>
              <Button
                onClick={handleGuestMode}
                size="lg"
                variant="outline"
                className="text-xl font-bold bg-white/10 hover:bg-white/20 border-white text-white"
              >
                Experimentar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-card border-t-2 border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 SoftKoe Games - Matemática em Ação
          </p>
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin")}
              className="text-muted-foreground hover:text-foreground"
            >
              Acesso Administrativo
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
