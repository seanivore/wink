import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { questions } from './data/questions';
import { artStyles } from './data/artStyles';
import { QuizProgress } from './components/QuizProgress';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import type { ArtStyle } from './types';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ArtStyle | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    // Calculate style scores based on answer patterns
    const styleScores = {
      artNouveau: 0,
      artDeco: 0,
      bauhaus: 0,
      brutalism: 0,
      constructivism: 0,
      minimalism: 0,
      biophilic: 0,
      cyberpunk: 0,
      popArt: 0
    };

    // Weight answers based on question relevance to each style
    Object.entries(finalAnswers).forEach(([questionIndex, answer]) => {
      const qIdx = parseInt(questionIndex);
      
      // Organic vs Geometric (Questions 0-2)
      if (qIdx <= 2) {
        if (answer <= 2) styleScores.artNouveau += 2;
        if (answer === 3) styleScores.artDeco += 2;
        if (answer === 4) styleScores.constructivism += 2;
        if (answer === 5) styleScores.cyberpunk += 2;
      }
      
      // Technology vs Nature (Questions 3-5)
      if (qIdx > 2 && qIdx <= 5) {
        if (answer <= 2) styleScores.biophilic += 2;
        if (answer === 3) styleScores.bauhaus += 2;
        if (answer === 4) styleScores.brutalism += 2;
        if (answer === 5) styleScores.cyberpunk += 2;
      }
      
      // Complexity vs Simplicity (Questions 6-8)
      if (qIdx > 5 && qIdx <= 8) {
        if (answer <= 2) styleScores.artNouveau += 2;
        if (answer === 3) styleScores.minimalism += 2;
        if (answer === 4) styleScores.constructivism += 2;
        if (answer === 5) styleScores.popArt += 2;
      }
      
      // Cultural attitude (Questions 9+)
      if (qIdx > 8) {
        if (answer <= 2) styleScores.artDeco += 2;
        if (answer === 3) styleScores.bauhaus += 2;
        if (answer === 4) styleScores.brutalism += 2;
        if (answer === 5) styleScores.cyberpunk += 2;
      }
    });

    // Find the style with the highest score
    const winningStyle = Object.entries(styleScores).reduce((a, b) => 
      styleScores[a[0]] > styleScores[b[0]] ? a : b
    )[0];

    setResult(artStyles[winningStyle as keyof typeof artStyles]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Palette className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Art Style Quiz</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
          {!result ? (
            <>
              <QuizProgress 
                currentQuestion={currentQuestion} 
                totalQuestions={questions.length} 
              />
              <QuizQuestion
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <QuizResult result={result} onReset={resetQuiz} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;