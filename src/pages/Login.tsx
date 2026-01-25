import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, BarChart3, Eye, EyeOff, ArrowRight } from "lucide-react";
import loginIllustration1 from "@/assets/login-illustration.png";
import loginIllustration2 from "@/assets/login-illustration-2.png";
import loginIllustration3 from "@/assets/login-illustration-3.png";

const slides = [
  {
    image: loginIllustration1,
    title: "Descubra o potencial",
    subtitle: "econômico do Piauí em",
    highlight: "um só lugar!",
  },
  {
    image: loginIllustration2,
    title: "Análise regional",
    subtitle: "com dados de todos os",
    highlight: "87 municípios!",
  },
  {
    image: loginIllustration3,
    title: "Tome decisões",
    subtitle: "estratégicas baseadas em",
    highlight: "dados reais!",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 via-primary to-primary/80 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center p-8 xl:p-12 w-full h-full">
          {/* Headline with transition */}
          <div className="text-center mb-6 h-28 flex items-center relative w-full">
            {slides.map((slide, index) => (
              <h2
                key={index}
                className={`text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight absolute left-0 right-0 px-8 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.title}
                <br />
                {slide.subtitle}
                <br />
                <span className="italic text-white/90">{slide.highlight}</span>
              </h2>
            ))}
          </div>
          
          {/* Illustration with transition */}
          <div className="w-full max-w-lg xl:max-w-xl flex-1 max-h-[450px] relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-white/95 rounded-3xl p-4 xl:p-6 shadow-2xl transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/60">
            JUCEPI • SEBRAE • Governo do Piauí
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Observatório</h1>
              <p className="text-xs text-muted-foreground">Dados Empresariais</p>
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 gradient-primary text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Não tem uma conta? </span>
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Ao entrar, você concorda com nossos{" "}
            <a href="#" className="underline hover:text-foreground">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="underline hover:text-foreground">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
