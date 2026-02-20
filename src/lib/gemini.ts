import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Check if API key is valid (not placeholder)
const isValidApiKey = API_KEY && API_KEY !== "your_gemini_api_key_here" && API_KEY.length > 20;

// Only initialize if API key is valid
const genAI = isValidApiKey ? new GoogleGenerativeAI(API_KEY) : null;

export const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

// Smart mock AI response generator
function generateMockResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // Educational/tutoring responses
  if (lowerPrompt.includes("explain") || lowerPrompt.includes("what is") || lowerPrompt.includes("how")) {
    const topics: Record<string, string> = {
      "photosynthesis": "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This happens in the chloroplasts, specifically using chlorophyll which gives plants their green color.",
      "algebra": "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in equations. For example, in the equation 2x + 5 = 11, we solve for x by subtracting 5 from both sides (2x = 6) and then dividing by 2 (x = 3).",
      "mitosis": "Mitosis is the process of cell division where a single cell divides to produce two identical daughter cells. It has four phases: Prophase, Metaphase, Anaphase, and Telophase (PMAT). This is how your body grows and repairs tissues.",
      "newton": "Newton's Laws of Motion are three fundamental principles: 1) An object at rest stays at rest unless acted upon by a force. 2) Force equals mass times acceleration (F=ma). 3) For every action, there's an equal and opposite reaction.",
      "democracy": "Democracy is a system of government where power is vested in the people, who exercise it directly or through elected representatives. Nigeria practices federal democracy with three tiers: Federal, State, and Local governments.",
    };
    
    for (const [key, value] of Object.entries(topics)) {
      if (lowerPrompt.includes(key)) return value;
    }
    
    return "That's a great question! In education, understanding core concepts is key. Let me break this down: The topic you're asking about involves fundamental principles that build upon each other. I recommend studying the basics first, then working through practice problems to solidify your understanding. Would you like me to explain a specific aspect in more detail?";
  }
  
  // Math help
  if (lowerPrompt.includes("solve") || lowerPrompt.includes("calculate") || lowerPrompt.includes("math")) {
    return "To solve mathematical problems, follow these steps: 1) Identify what you're solving for. 2) Write down the given information. 3) Choose the appropriate formula or method. 4) Substitute values and solve step by step. 5) Check your answer by substituting back. Remember: practice makes perfect! Would you like me to walk through a specific example?";
  }
  
  // Question explanations
  if (lowerPrompt.includes("correct answer") || lowerPrompt.includes("why is")) {
    return "The correct answer relates to the fundamental concepts we've studied. When approaching such questions, first eliminate obviously wrong options, then analyze the remaining choices based on your knowledge of the subject. The key principle here involves understanding how the core concepts apply to this specific scenario.";
  }
  
  // Study tips
  if (lowerPrompt.includes("study") || lowerPrompt.includes("prepare") || lowerPrompt.includes("exam")) {
    return "Here are effective study strategies for WAEC/JAMB: 1) Create a study timetable and stick to it. 2) Practice with past questions - they reveal exam patterns. 3) Understand concepts rather than memorizing. 4) Use active recall by testing yourself. 5) Take regular breaks using the Pomodoro technique. 6) Form study groups for discussion. 7) Get enough sleep before exams!";
  }
  
  // Research assistance
  if (lowerPrompt.includes("research") || lowerPrompt.includes("academic") || lowerPrompt.includes("paper")) {
    return "For academic research, I recommend: 1) Start with a clear research question. 2) Use reputable sources like Google Scholar, JSTOR, and ResearchGate. 3) Take organized notes with proper citations. 4) Create an outline before writing. 5) Use the IMRaD structure for scientific papers. 6) Always cite your sources properly using APA or MLA format.";
  }
  
  // Default helpful response
  return "I'm your AI learning assistant! I can help you with:\n\n• Explaining difficult concepts in simple terms\n• Solving math and science problems step-by-step\n• Providing study tips for WAEC and JAMB\n• Answering questions about your subjects\n• Helping with research and essay writing\n\nJust ask me anything about your studies, and I'll do my best to help you understand!";
}

// Mock question bank for different subjects
function getMockQuestions(subject: string, topic: string, count: number) {
  const questionBanks: Record<string, any[]> = {
    Mathematics: [
      { id: 1, text: "Solve for x: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 7", "x = 3"], correct: "A", explanation: "Subtract 5 from both sides: 2x = 10. Then divide by 2: x = 5.", followUp: "Can you solve 3x - 7 = 14?" },
      { id: 2, text: "What is the value of 2³ + 3²?", options: ["17", "15", "13", "19"], correct: "A", explanation: "2³ = 8 and 3² = 9. So 8 + 9 = 17.", followUp: "What is the value of 4² - 2³?" },
      { id: 3, text: "If a triangle has angles 50° and 60°, what is the third angle?", options: ["70°", "80°", "60°", "90°"], correct: "A", explanation: "The sum of angles in a triangle is 180°. So 180° - 50° - 60° = 70°.", followUp: "What type of triangle is this?" },
      { id: 4, text: "Simplify: (3x + 2)(x - 1)", options: ["3x² - x - 2", "3x² + x - 2", "3x² - 3x - 2", "3x² + 2x - 2"], correct: "A", explanation: "Using FOIL: 3x² - 3x + 2x - 2 = 3x² - x - 2.", followUp: "Can you factorize x² - 5x + 6?" },
      { id: 5, text: "What is 15% of 200?", options: ["30", "25", "35", "20"], correct: "A", explanation: "15% × 200 = 0.15 × 200 = 30.", followUp: "What is 200 increased by 15%?" },
      { id: 6, text: "Find the LCM of 12 and 18", options: ["36", "72", "6", "24"], correct: "A", explanation: "12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 36.", followUp: "What is the HCF of 12 and 18?" },
      { id: 7, text: "If y = 2x + 3, what is y when x = 4?", options: ["11", "9", "14", "8"], correct: "A", explanation: "Substitute x = 4: y = 2(4) + 3 = 8 + 3 = 11.", followUp: "What is x when y = 15?" },
      { id: 8, text: "What is the gradient of the line y = 3x - 7?", options: ["3", "-7", "7", "-3"], correct: "A", explanation: "In y = mx + c form, m is the gradient. Here m = 3.", followUp: "What is the y-intercept of this line?" },
      { id: 9, text: "Calculate: √144 + √81", options: ["21", "15", "18", "25"], correct: "A", explanation: "√144 = 12 and √81 = 9. So 12 + 9 = 21.", followUp: "What is √(144 × 81)?" },
      { id: 10, text: "A car travels 150km in 3 hours. What is its average speed?", options: ["50 km/h", "45 km/h", "55 km/h", "60 km/h"], correct: "A", explanation: "Speed = Distance ÷ Time = 150 ÷ 3 = 50 km/h.", followUp: "How long will it take to travel 200km at this speed?" },
    ],
    English: [
      { id: 1, text: "Choose the correct spelling:", options: ["Accommodation", "Accomodation", "Acomodation", "Acommodation"], correct: "A", explanation: "Accommodation has double 'c' and double 'm'.", followUp: "Can you use this word in a sentence?" },
      { id: 2, text: "What is the past tense of 'begin'?", options: ["Began", "Begun", "Beginned", "Beginning"], correct: "A", explanation: "'Began' is the simple past tense. 'Begun' is the past participle.", followUp: "Use 'begun' correctly in a sentence." },
      { id: 3, text: "Identify the noun in: 'The quick brown fox jumps.'", options: ["Fox", "Quick", "Jumps", "Brown"], correct: "A", explanation: "'Fox' is the noun (naming word). 'Quick' and 'brown' are adjectives, 'jumps' is a verb.", followUp: "What type of noun is 'fox'?" },
      { id: 4, text: "What is a synonym for 'happy'?", options: ["Joyful", "Sad", "Angry", "Tired"], correct: "A", explanation: "Joyful means feeling or expressing great happiness, similar to 'happy'.", followUp: "What is an antonym for 'happy'?" },
      { id: 5, text: "Complete: 'Neither John ___ Mary was present.'", options: ["nor", "or", "and", "but"], correct: "A", explanation: "'Neither...nor' is the correct correlative conjunction pair.", followUp: "Use 'either...or' in a sentence." },
      { id: 6, text: "What figure of speech is: 'The wind whispered through the trees'?", options: ["Personification", "Simile", "Metaphor", "Hyperbole"], correct: "A", explanation: "Personification gives human qualities to non-human things. Wind cannot actually whisper.", followUp: "Give another example of personification." },
      { id: 7, text: "Choose the correct sentence:", options: ["She and I went to school.", "Me and her went to school.", "Her and I went to school.", "She and me went to school."], correct: "A", explanation: "Subject pronouns (She, I) are used as subjects of sentences.", followUp: "When do we use 'me' instead of 'I'?" },
      { id: 8, text: "What type of sentence is: 'Close the door!'?", options: ["Imperative", "Declarative", "Interrogative", "Exclamatory"], correct: "A", explanation: "Imperative sentences give commands or make requests.", followUp: "Give an example of an interrogative sentence." },
      { id: 9, text: "'She writes well.' - 'Well' is what part of speech?", options: ["Adverb", "Adjective", "Noun", "Verb"], correct: "A", explanation: "'Well' modifies the verb 'writes', making it an adverb.", followUp: "What is the difference between 'good' and 'well'?" },
      { id: 10, text: "What is the plural of 'analysis'?", options: ["Analyses", "Analysises", "Analysis", "Analysi"], correct: "A", explanation: "Words ending in '-is' from Greek origin change to '-es' in plural.", followUp: "What is the plural of 'crisis'?" },
    ],
    Physics: [
      { id: 1, text: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], correct: "A", explanation: "Force is measured in Newtons (N). 1 N = 1 kg⋅m/s².", followUp: "What is the relationship between force, mass, and acceleration?" },
      { id: 2, text: "Which law states F = ma?", options: ["Newton's Second Law", "Newton's First Law", "Newton's Third Law", "Law of Gravitation"], correct: "A", explanation: "Newton's Second Law of Motion states that Force equals mass times acceleration.", followUp: "If F = 20N and m = 4kg, what is the acceleration?" },
      { id: 3, text: "What is the speed of light in vacuum?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁹ m/s", "3 × 10⁷ m/s"], correct: "A", explanation: "Light travels at approximately 300,000,000 m/s (3 × 10⁸ m/s) in vacuum.", followUp: "Why does light slow down in glass?" },
      { id: 4, text: "What type of energy does a moving car have?", options: ["Kinetic energy", "Potential energy", "Chemical energy", "Nuclear energy"], correct: "A", explanation: "Kinetic energy is the energy of motion. KE = ½mv².", followUp: "What happens to KE if velocity doubles?" },
      { id: 5, text: "What is the formula for pressure?", options: ["P = F/A", "P = F × A", "P = A/F", "P = F + A"], correct: "A", explanation: "Pressure equals Force divided by Area. Unit is Pascal (Pa) or N/m².", followUp: "Why do sharp knives cut better?" },
      { id: 6, text: "Which electromagnetic wave has the longest wavelength?", options: ["Radio waves", "Gamma rays", "X-rays", "Ultraviolet"], correct: "A", explanation: "Radio waves have wavelengths from about 1mm to 100km, the longest in the EM spectrum.", followUp: "Which EM wave has the highest energy?" },
      { id: 7, text: "What is Ohm's Law?", options: ["V = IR", "V = I/R", "V = I + R", "V = I - R"], correct: "A", explanation: "Voltage (V) equals Current (I) times Resistance (R).", followUp: "If V = 12V and R = 4Ω, what is I?" },
      { id: 8, text: "What happens to resistance when temperature increases in metals?", options: ["Increases", "Decreases", "Stays the same", "Becomes zero"], correct: "A", explanation: "In metals, higher temperature means more atomic vibration, hindering electron flow.", followUp: "Why do semiconductors behave differently?" },
      { id: 9, text: "What is the principle behind a hydraulic press?", options: ["Pascal's Principle", "Archimedes' Principle", "Bernoulli's Principle", "Newton's Law"], correct: "A", explanation: "Pascal's Principle: Pressure applied to enclosed fluid is transmitted equally in all directions.", followUp: "Give another application of this principle." },
      { id: 10, text: "What type of mirror is used in car headlights?", options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic only"], correct: "A", explanation: "Concave mirrors converge light to produce a powerful parallel beam.", followUp: "What type of mirror is used for rear-view?" },
    ],
    Chemistry: [
      { id: 1, text: "What is the atomic number of Carbon?", options: ["6", "12", "8", "14"], correct: "A", explanation: "Carbon has 6 protons in its nucleus, giving it atomic number 6.", followUp: "What is the mass number of Carbon-12?" },
      { id: 2, text: "What type of bond is formed between Na and Cl in NaCl?", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], correct: "A", explanation: "Na donates an electron to Cl, forming Na⁺ and Cl⁻ ions held by electrostatic attraction.", followUp: "Why is NaCl soluble in water?" },
      { id: 3, text: "What is the pH of a neutral solution?", options: ["7", "0", "14", "1"], correct: "A", explanation: "pH 7 is neutral. Below 7 is acidic, above 7 is basic/alkaline.", followUp: "What is the pH of lemon juice?" },
      { id: 4, text: "What gas is produced when acid reacts with a carbonate?", options: ["Carbon dioxide", "Hydrogen", "Oxygen", "Nitrogen"], correct: "A", explanation: "Acid + Carbonate → Salt + Water + CO₂. The CO₂ causes effervescence.", followUp: "How do you test for CO₂ gas?" },
      { id: 5, text: "What is the chemical formula for water?", options: ["H₂O", "HO₂", "H₂O₂", "OH"], correct: "A", explanation: "Water consists of 2 hydrogen atoms bonded to 1 oxygen atom.", followUp: "What is H₂O₂?" },
      { id: 6, text: "Which group in the periodic table contains noble gases?", options: ["Group 18", "Group 1", "Group 17", "Group 2"], correct: "A", explanation: "Noble gases (He, Ne, Ar, Kr, Xe, Rn) are in Group 18 with full outer shells.", followUp: "Why are noble gases unreactive?" },
      { id: 7, text: "What is the process of a solid changing directly to gas called?", options: ["Sublimation", "Evaporation", "Condensation", "Melting"], correct: "A", explanation: "Sublimation is solid → gas without passing through liquid state. Example: dry ice.", followUp: "What is the reverse process called?" },
      { id: 8, text: "What is the valency of oxygen?", options: ["2", "1", "3", "4"], correct: "A", explanation: "Oxygen has 6 valence electrons and needs 2 more to complete its octet, so valency is 2.", followUp: "What is the valency of nitrogen?" },
      { id: 9, text: "What catalyst is used in the Haber process?", options: ["Iron", "Platinum", "Nickel", "Copper"], correct: "A", explanation: "Iron catalyst is used to produce ammonia: N₂ + 3H₂ ⇌ 2NH₃.", followUp: "What conditions favor ammonia production?" },
      { id: 10, text: "Which element is the most electronegative?", options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"], correct: "A", explanation: "Fluorine has the highest electronegativity (3.98) on the Pauling scale.", followUp: "What is electronegativity?" },
    ],
    Biology: [
      { id: 1, text: "What organelle is known as the 'powerhouse of the cell'?", options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], correct: "A", explanation: "Mitochondria produce ATP through cellular respiration, providing energy for the cell.", followUp: "What process occurs in mitochondria?" },
      { id: 2, text: "What is the basic unit of life?", options: ["Cell", "Tissue", "Organ", "Organism"], correct: "A", explanation: "The cell is the smallest structural and functional unit of all living organisms.", followUp: "What are the two main types of cells?" },
      { id: 3, text: "What is the process by which plants make their food?", options: ["Photosynthesis", "Respiration", "Digestion", "Excretion"], correct: "A", explanation: "Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.", followUp: "Where does photosynthesis occur in the plant?" },
      { id: 4, text: "What carries genetic information in cells?", options: ["DNA", "RNA only", "Proteins", "Carbohydrates"], correct: "A", explanation: "DNA (Deoxyribonucleic Acid) contains the genetic instructions for all living organisms.", followUp: "What is the shape of DNA?" },
      { id: 5, text: "What blood type is the universal donor?", options: ["O negative", "AB positive", "A positive", "B negative"], correct: "A", explanation: "O negative has no A, B antigens or Rh factor, so it won't cause immune reactions.", followUp: "What blood type is the universal recipient?" },
      { id: 6, text: "What is the function of white blood cells?", options: ["Fight infections", "Carry oxygen", "Clot blood", "Transport nutrients"], correct: "A", explanation: "White blood cells (leukocytes) are part of the immune system and fight pathogens.", followUp: "Name two types of white blood cells." },
      { id: 7, text: "What is the largest organ in the human body?", options: ["Skin", "Liver", "Heart", "Brain"], correct: "A", explanation: "The skin covers about 2 square meters and weighs about 3.6 kg in adults.", followUp: "What are the three layers of skin?" },
      { id: 8, text: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B"], correct: "A", explanation: "UV-B rays convert 7-dehydrocholesterol in skin to Vitamin D3.", followUp: "What is the function of Vitamin D?" },
      { id: 9, text: "What is the process of cell division for growth called?", options: ["Mitosis", "Meiosis", "Binary fission", "Budding"], correct: "A", explanation: "Mitosis produces two identical daughter cells for growth and repair.", followUp: "How many chromosomes do human cells have?" },
      { id: 10, text: "What part of the brain controls balance?", options: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"], correct: "A", explanation: "The cerebellum coordinates voluntary movements and maintains balance and posture.", followUp: "What does the medulla control?" },
    ],
  };
  
  const subjectQuestions = questionBanks[subject] || questionBanks["Mathematics"];
  // Shuffle and return requested count
  const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, i) => ({ ...q, id: i + 1, subject }));
}

export async function generateContent(prompt: string) {
  // Try real API first if available
  if (model) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      // Fall through to mock response
    }
  }
  
  // Use mock response system
  console.info("Using mock AI response (no valid API key)");
  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  return generateMockResponse(prompt);
}

export async function generateQuestions(subject: string, topic: string, count: number = 5) {
  // Try real API first if available
  if (model) {
    const prompt = `You are an expert Nigerian educational content creator. Generate exactly ${count} multiple-choice questions for ${subject} on the topic of "${topic}".

IMPORTANT REQUIREMENTS:
1. Questions must be suitable for Nigerian secondary school students (SS1-SS3, WAEC/JAMB level)
2. Use Nigerian context and examples where appropriate
3. Each question must have exactly 4 options
4. Options should be the actual answer text, not just letters
5. The "correct" field should be the letter (A, B, C, or D) of the correct option

Format your response as a valid JSON array with this exact structure:
[
  {
    "id": 1,
    "text": "Clear question text here?",
    "options": ["First option text", "Second option text", "Third option text", "Fourth option text"],
    "correct": "A",
    "explanation": "Detailed explanation of why the correct answer is right",
    "followUp": "A follow-up question to test deeper understanding"
  }
]

Subject: ${subject}
Topic: ${topic}
Number of questions: ${count}

Return ONLY the JSON array, no additional text or markdown formatting.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean up the response - remove markdown code blocks if present
      const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(jsonStr);
      // Validate and ensure proper structure
      return parsed.map((q: any, i: number) => ({
        id: i + 1,
        text: q.text || "Question not available",
        options: Array.isArray(q.options) ? q.options : ["A", "B", "C", "D"],
        correct: q.correct || "A",
        explanation: q.explanation || "No explanation available",
        followUp: q.followUp || "Can you explain this further?"
      }));
    } catch (error) {
      console.error("Gemini AI Questions Error:", error);
      // Fall through to mock questions
    }
  }
  
  // Use mock question bank
  console.info("Using mock questions (no valid API key)");
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
  return getMockQuestions(subject, topic, count);
}

export async function generateResearchContent(query: string): Promise<{
  summary: string;
  keyPoints: string[];
  sources: { title: string; url: string }[];
  relatedTopics: string[];
}> {
  if (model) {
    try {
      const prompt = `Research the following topic and provide educational content suitable for teachers and students: "${query}"
      
      Format your response as JSON with this structure:
      {
        "summary": "A comprehensive 2-3 paragraph summary of the topic",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4", "Key point 5"],
        "sources": [{"title": "Source name", "url": "https://example.com"}],
        "relatedTopics": ["Related topic 1", "Related topic 2", "Related topic 3"]
      }`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonStr = text.replace(/```json|```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Research Error:", error);
    }
  }
  
  // Mock research content
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const mockResearch: Record<string, any> = {
    default: {
      summary: `The topic "${query}" is an important area of study in education. Understanding this concept helps students develop critical thinking skills and apply knowledge to real-world situations. This topic has significant relevance in the Nigerian educational curriculum, particularly for WAEC and JAMB examinations.\n\nResearch in this area has shown that effective learning requires both theoretical understanding and practical application. Teachers can enhance student comprehension by using interactive methods, visual aids, and real-life examples.`,
      keyPoints: [
        "Foundational concepts are essential for advanced understanding",
        "Regular practice improves retention and application skills",
        "Connecting theory to real-world examples enhances learning",
        "Group discussions promote deeper understanding",
        "Assessment should focus on comprehension, not just memorization"
      ],
      sources: [
        { title: "Nigerian Educational Research Council", url: "https://nerc.gov.ng" },
        { title: "WAEC Syllabus Guide", url: "https://waec.org.ng" },
        { title: "Khan Academy", url: "https://khanacademy.org" }
      ],
      relatedTopics: [
        "Teaching methodologies",
        "Student assessment strategies",
        "Curriculum development",
        "Educational technology"
      ]
    }
  };
  
  return mockResearch.default;
}
