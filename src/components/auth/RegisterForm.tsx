
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
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
import { registerSchema, type RegisterFormValues } from "./schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate email suggestions when name changes
  useEffect(() => {
    const name = form.watch("name");
    if (name.length > 1) {
      const nameParts = name.toLowerCase().trim().split(" ");
      const suggestions: string[] = [];
      
      if (nameParts.length > 1) {
        // First name + last name
        suggestions.push(`${nameParts[0]}.${nameParts[nameParts.length - 1]}@example.com`);
        // First initial + last name
        suggestions.push(`${nameParts[0][0]}${nameParts[nameParts.length - 1]}@example.com`);
        // First name + last initial
        suggestions.push(`${nameParts[0]}${nameParts[nameParts.length - 1][0]}@example.com`);
      } else if (nameParts.length === 1 && nameParts[0]) {
        // Just one name
        suggestions.push(`${nameParts[0]}@example.com`);
        suggestions.push(`${nameParts[0]}123@example.com`);
      }
      
      // Add a numeric version if we have suggestions
      if (suggestions.length > 0) {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        const baseEmail = suggestions[0].split('@')[0];
        suggestions.push(`${baseEmail}${randomNum}@example.com`);
      }

      setEmailSuggestions(suggestions.filter(Boolean));
    } else {
      setEmailSuggestions([]);
    }
  }, [form.watch("name")]);

  const selectSuggestion = (email: string) => {
    form.setValue("email", email);
    setShowSuggestions(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input placeholder="your@email.com" type="email" {...field} />
                </FormControl>
                
                {emailSuggestions.length > 0 && (
                  <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
                    <PopoverTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2 w-72">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email suggestions</p>
                        {emailSuggestions.map((email, index) => (
                          <Button 
                            key={index} 
                            type="button"
                            variant="ghost" 
                            className="w-full justify-start text-sm h-auto py-1.5"
                            onClick={() => selectSuggestion(email)}
                          >
                            {email}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};
