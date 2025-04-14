
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Form schema validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  type: "login" | "register";
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Set up form based on type
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues: type === "login" 
      ? { email: "", password: "" } 
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setIsLoading(true);
    try {
      console.log("Form values:", values);
      
      // Delay to simulate API call
      setTimeout(() => {
        if (type === "login") {
          // Modified login logic to check registered users
          const registeredUsers = localStorage.getItem("registeredUsers");
          const users = registeredUsers ? JSON.parse(registeredUsers) : [];
          
          const user = users.find((u: any) => 
            u.email === (values as LoginFormValues).email && 
            u.password === (values as LoginFormValues).password
          );
          
          // Also allow the default admin login
          const isAdminLogin = 
            (values as LoginFormValues).email === "admin@example.com" && 
            (values as LoginFormValues).password === "password";
          
          if (user || isAdminLogin) {
            // Get user info
            const userData = user || { name: "Admin User", email: (values as LoginFormValues).email };
            
            // Store user info in localStorage
            localStorage.setItem("auth", JSON.stringify({
              isAuthenticated: true,
              user: {
                name: userData.name,
                email: userData.email,
              }
            }));
            
            toast.success("Login successful!");
            onSuccess();
          } else {
            toast.error("Invalid credentials. Please check your email and password.");
          }
        } else {
          // Register logic - store user data for future logins
          const registeredUsers = localStorage.getItem("registeredUsers");
          const users = registeredUsers ? JSON.parse(registeredUsers) : [];
          
          // Check if email already exists
          const emailExists = users.some((user: any) => 
            user.email === (values as RegisterFormValues).email
          );
          
          if (emailExists) {
            toast.error("Email already registered. Please use a different email.");
            setIsLoading(false);
            return;
          }
          
          // Add new user
          users.push({
            name: (values as RegisterFormValues).name,
            email: (values as RegisterFormValues).email,
            password: (values as RegisterFormValues).password
          });
          
          // Save updated users list
          localStorage.setItem("registeredUsers", JSON.stringify(users));
          
          // Log user in
          localStorage.setItem("auth", JSON.stringify({
            isAuthenticated: true,
            user: {
              name: (values as RegisterFormValues).name,
              email: (values as RegisterFormValues).email,
            }
          }));
          
          toast.success("Account created successfully!");
          onSuccess();
        }
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "register" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : type === "login" ? "Login" : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
