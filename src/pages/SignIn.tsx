import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Signed in",
      description: "Welcome back to Handbook.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto glass border border-border rounded-3xl p-8 md:p-10"
          >
            <div className="text-center mb-8">
              <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
                Welcome Back
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
                Sign in to continue learning
              </h1>
              <p className="text-muted-foreground">
                This flow is ready for Firebase or Supabase when you add keys.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New here?{" "}
              <a href="/sign-up" className="text-primary hover:text-primary/80">
                Create an account
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
