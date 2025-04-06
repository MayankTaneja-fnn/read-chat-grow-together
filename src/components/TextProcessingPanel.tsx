
import React, { useState } from "react";
import { Pencil, FileText, BrainCircuit, Volume, Sparkles, Search } from "lucide-react";

interface TextProcessingPanelProps {
  isDyslexicFont: boolean;
  letterSpacing: number[];
  fontType: string;
  startReading: () => void;
  summarizeText: () => void;
  text: string;
  setText: (text: string) => void;
  processedText: string;
  isProcessing: boolean;
}

const TextProcessingPanel: React.FC<TextProcessingPanelProps> = ({
  isDyslexicFont,
  letterSpacing,
  fontType,
  startReading,
  summarizeText,
  text,
  setText,
  processedText,
  isProcessing
}) => {
  const [isWordHighlighting, setIsWordHighlighting] = useState(false);

  const getFontClass = () => {
    switch(fontType) {
      case 'OpenDyslexic':
        return 'font-dyslexic';
      case 'Roboto':
        return 'font-roboto';
      case 'Arial':
        return 'font-arial';
      default:
        return 'font-sans';
    }
  };

  const fontClass = getFontClass();
  
  const readingStyles = {
    letterSpacing: `${letterSpacing[0]}em`,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Text Input <Pencil className="h-5 w-5 text-orange-500" />
        </h2>
        <textarea
          className={`text-input-area ${fontClass}`}
          placeholder="Enter or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={readingStyles}
        ></textarea>
        <div className="flex flex-wrap gap-3">
          <button onClick={summarizeText} className="action-button primary">
            <BrainCircuit className="h-5 w-5" />
            Summarize
          </button>
          <button onClick={startReading} className="action-button secondary">
            <Volume className="h-5 w-5" />
            Read Aloud
          </button>
          <button onClick={() => {}} className="action-button dark">
            <Sparkles className="h-5 w-5" />
            Simplify
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Processed Text <FileText className="h-5 w-5 text-purple-500" />
        </h2>
        <div 
          className={`text-input-area ${fontClass} overflow-y-auto`}
          style={readingStyles}
        >
          {isProcessing ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : processedText ? (
            <div className={isWordHighlighting ? "space-x-1" : ""}>
              {isWordHighlighting ? 
                processedText.split(' ').map((word, i) => (
                  <span key={i} className="inline-block bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 rounded">{word}</span>
                )) : 
                processedText
              }
            </div>
          ) : (
            <p className="text-area-placeholder">Processed text will appear here... <span role="img" aria-label="Edit">🖋️</span></p>
          )}
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => setIsWordHighlighting(prev => !prev)} 
            className={`action-button ${isWordHighlighting ? 'primary' : 'dark'}`}
          >
            <Search className="h-5 w-5" />
            Word Highlighting
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextProcessingPanel;
