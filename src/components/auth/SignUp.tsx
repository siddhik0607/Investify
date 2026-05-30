import { useState } from "react";
import { registerUser } from "@/lib/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent double submissions
    setIsLoading(true);

    try {
      console.log('Submitting registration...');
      // Use our custom register function that hashes the password
      const result = await registerUser(email, password, fullName, phone);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Account created!",
        description: `Welcome to Investify, ${fullName}!`,
      });
      
      // Save info for the welcome message
      localStorage.setItem("user_name", fullName);
      localStorage.setItem("user_email", email);
      
      // Navigate to landing page
      navigate("/");
      // Force a reload to update the Navbar
      window.location.reload();
      
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to connect to database. Check if 'user_credentials' table exists.";
      toast({
        title: "Registration Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="John Doe"
            className="pl-10"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <div className="relative">
          <Input
            type="tel"
            placeholder="9876543210"
            className="h-10"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
};
