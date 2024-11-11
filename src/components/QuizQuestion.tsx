import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (score: number) => void;
}

export function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h2>
      <div className="grid gap-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index + 1)}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
          >
            <span className="text-gray-700">{answer}</span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </>
  );
}