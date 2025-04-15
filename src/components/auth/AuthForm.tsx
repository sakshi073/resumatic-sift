
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import type { LoginFormValues, RegisterFormValues } from "./schemas";

interface AuthFormProps {
  type: "login" | "register";
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { email, password } = values;
      const { error } = await login(email, password);
      if (!error) {
        toast.success("Login successful!");
        onSuccess();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { name, email, password } = values;
      const { error } = await signup(email, password, name);
      if (!error) {
        onSuccess();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return type === "login" ? (
    <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
  ) : (
    <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
  );
};

export default AuthForm;
