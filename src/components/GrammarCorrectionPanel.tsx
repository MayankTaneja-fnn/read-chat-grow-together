
import React, { useState } from "react";
import { Pencil, CheckCircle } from "lucide-react";

interface GrammarCorrectionPanelProps {
  isDyslexicFont: boolean;
  letterSpacing: number[];
  fontType: string;
}

const GrammarCorrectionPanel: React.FC<GrammarCorrectionPanelProps> = ({
  isDyslexicFont,
  letterSpacing,
  fontType
}) => {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const correctText = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call for grammar correction
    setTimeout(() => {
      // Simple corrections for demo purposes
      let text = inputText
        .replace(/teh/gi, "the")
        .replace(/thier/gi, "their")
        .replace(/alot/gi, "a lot")
        .replace(/i ([a-z])/gi, (match, p1) => `I ${p1}`)
        .replace(/([.!?]) ([a-z])/g, (match, p1, p2) => `${p1} ${p2.toUpperCase()}`);
      
      setCorrectedText(text);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-10">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        Grammar & Spelling Assistance <Pencil className="h-6 w-6 text-orange-500" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xl font-medium">Enter text for correction:</h3>
          <textarea
            className="text-input-area"
            placeholder="Enter text with spelling or grammar issues..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={readingStyles}
          ></textarea>
          
          <button onClick={correctText} className="action-button primary w-full">
            <CheckCircle className="h-5 w-5" />
            Correct Text
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium">Corrected Version:</h3>
          <div 
            className={`text-input-area ${fontClass} overflow-y-auto`}
            style={readingStyles}
          >
            {isProcessing ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : correctedText ? (
              correctedText
            ) : (
              <p className="text-area-placeholder">Corrected text will appear here... <span role="img" aria-label="Pencil">📝</span></p>
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tips:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use clear, simple sentences</li>
              <li>Avoid complicated words when possible</li>
              <li>Check for subject-verb agreement</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrammarCorrectionPanel;
