import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const AllCategories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Full Curriculum</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our complete range of subjects across all secondary levels in Nigeria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would ideally be populated with all subjects from a central data source */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Junior Secondary</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Basic Science</li>
                <li>Basic Technology</li>
                <li>Mathematics</li>
                <li>English Language</li>
                <li>Business Studies</li>
                <li>Social Studies</li>
                <li>Home Economics</li>
                <li>Agricultural Science</li>
                <li>CCA</li>
                <li>Physical & Health Education</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Sciences</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Biology</li>
                <li>Further Mathematics</li>
                <li>Agricultural Science</li>
                <li>Computer Science</li>
                <li>Mathematics</li>
                <li>English Language</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Arts</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Literature in English</li>
                <li>Government</li>
                <li>History</li>
                <li>Geography</li>
                <li>Civic Education</li>
                <li>French</li>
                <li>Christian Religious Knowledge</li>
                <li>Islamic Religious Knowledge</li>
                <li>Visual Arts</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Commercial</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Economics</li>
                <li>Commerce</li>
                <li>Accounting</li>
                <li>Government</li>
                <li>Business Studies</li>
                <li>Office Practice</li>
                <li>Insurance</li>
                <li>Data Processing</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">AI & Tech</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Prompt Engineering</li>
                <li>AI Ethics</li>
                <li>Data Science</li>
                <li>Machine Learning</li>
                <li>Creative AI</li>
                <li>Future of Work</li>
                <li>Robotics</li>
                <li>Cybersecurity</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllCategories;
