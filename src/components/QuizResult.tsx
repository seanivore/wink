import React from 'react';
import { RefreshCcw, ExternalLink } from 'lucide-react';
import type { ArtStyle } from '../types';

interface QuizResultProps {
  result: ArtStyle;
  onReset: () => void;
}

export function QuizResult({ result, onReset }: QuizResultProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <img 
        src={result.imageUrl} 
        alt={result.name}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Your Art Style: {result.name}
      </h2>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        {result.description}
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-xl">Notable Artists</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {result.artists.map((artist) => (
              <span key={artist} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {artist}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <RefreshCcw className="w-5 h-5" />
            Take Quiz Again
          </button>
          <a
            href={result.learnMoreUrl}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}