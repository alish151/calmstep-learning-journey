import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(72);
const nameSchema = z.string().max(100).optional();

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const texts = {
    pageTitle: language === "ru" ? "Вход" : "Sign In",
    signIn: language === "ru" ? "Вход" : "Sign In",
    signUp: language === "ru" ? "Регистрация" : "Sign Up",
    email: language === "ru" ? "Email" : "Email",
    password: language === "ru" ? "Пароль" : "Password",
    fullName: language === "ru" ? "Имя" : "Full Name",
    noAccount: language === "ru" ? "Нет аккаунта?" : "Don't have an account?",
    hasAccount: language === "ru" ? "Уже есть аккаунт?" : "Already have an account?",
    welcomeBack: language === "ru" ? "С возвращением!" : "Welcome Back!",
    createAccount: language === "ru" ? "Создать аккаунт" : "Create Account",
    signInDesc: language === "ru" ? "Войдите, чтобы продолжить обучение" : "Sign in to continue your learning journey",
    signUpDesc: language === "ru" ? "Начните своё путешествие в мир знаний" : "Start your learning adventure today",
    trialInfo: language === "ru" ? "3 дня бесплатного доступа ко всем заданиям!" : "3 days free access to all tasks!",
    signInSuccess: language === "ru" ? "Добро пожаловать!" : "Welcome back!",
    signUpSuccess: language === "ru" ? "Аккаунт создан!" : "Account created!",
    errorOccurred: language === "ru" ? "Произошла ошибка" : "An error occurred",
    userExists: language === "ru" ? "Пользователь уже существует" : "User already exists",
    invalidCredentials: language === "ru" ? "Неверный email или пароль" : "Invalid email or password",
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0]?.message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0]?.message;
      }
    }

    if (!isLogin && fullName) {
      try {
        nameSchema.parse(fullName);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.name = e.errors[0]?.message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: texts.errorOccurred,
              description: texts.invalidCredentials,
              variant: "destructive",
            });
          } else {
            toast({
              title: texts.errorOccurred,
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: texts.signInSuccess,
          });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: texts.errorOccurred,
              description: texts.userExists,
              variant: "destructive",
            });
          } else {
            toast({
              title: texts.errorOccurred,
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: texts.signUpSuccess,
            description: texts.trialInfo,
          });
        }
      }
    } catch (error) {
      toast({
        title: texts.errorOccurred,
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{texts.pageTitle} - CalmStep</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back")}
          </Button>

          <Card className="border-2 border-primary/20 shadow-card">
            <CardHeader className="text-center pb-2">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-soft">
                  <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {isLogin ? texts.welcomeBack : texts.createAccount}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isLogin ? texts.signInDesc : texts.signUpDesc}
              </CardDescription>
              {!isLogin && (
                <div className="mt-2 px-4 py-2 bg-accent-light rounded-xl">
                  <p className="text-sm font-medium text-accent-foreground">
                    🎉 {texts.trialInfo}
                  </p>
                </div>
              )}
            </CardHeader>

            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {texts.fullName}
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {texts.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    required
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {texts.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    required
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isLogin ? (
                    texts.signIn
                  ) : (
                    texts.signUp
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? texts.noAccount : texts.hasAccount}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    {isLogin ? texts.signUp : texts.signIn}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
