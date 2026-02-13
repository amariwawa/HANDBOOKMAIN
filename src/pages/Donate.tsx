import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, CreditCard, ArrowRight } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Support Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Help Us Democratize <span className="text-primary">Education</span> in Nigeria
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your contribution helps us keep Handbook free for students who need it most 
              and develop new AI tools to enhance learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-3xl border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">One-Time Donation</h3>
              <p className="text-muted-foreground mb-8">
                Make a single contribution to support our server costs and content development.
              </p>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Donate Now <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 rounded-3xl border border-border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Monthly Partner</h3>
              <p className="text-muted-foreground mb-8">
                Become a monthly partner and get regular updates on our impact and roadmap.
              </p>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                Become a Partner <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer Placeholder if Footer component doesn't exist or isn't imported globally */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        © {new Date().getFullYear()} Handbook Nigeria. All rights reserved.
      </footer>
    </div>
  );
};

export default Donate;
