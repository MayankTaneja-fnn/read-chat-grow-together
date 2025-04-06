
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Accessibility, Sun, Moon, ArrowLeft, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type FontType = "Inter" | "OpenDyslexic" | "Roboto" | "Arial";

interface AccessibilitySettingsProps {
  isDyslexicFont: boolean;
  setIsDyslexicFont: (value: boolean) => void;
  letterSpacing: number[];
  setLetterSpacing: (value: number[]) => void;
  fontType: FontType;
  setFontType: (value: FontType) => void;
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  isDyslexicFont,
  setIsDyslexicFont,
  letterSpacing,
  setLetterSpacing,
  fontType,
  setFontType
}) => {
  const { theme, setTheme } = useTheme();

  const handleFontChange = (value: string) => {
    setFontType(value as FontType);
    if (value === "OpenDyslexic") {
      setIsDyslexicFont(true);
    } else {
      setIsDyslexicFont(false);
    }
  };

  return (
    <section className="mint-gradient py-10 px-6 rounded-xl mb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          Accessibility Settings <Accessibility className="h-8 w-8 text-blue-500" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium flex items-center gap-2">
              Display Theme <span role="img" aria-label="Theme">🎨</span>
            </h3>
            <div className="flex gap-4">
              <div 
                className={`theme-button ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <Sun className="h-6 w-6 text-yellow-500" />
                <span>Light</span>
              </div>
              <div 
                className={`theme-button ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-6 w-6 text-yellow-300" />
                <span>Dark</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium flex items-center gap-2">
              Font Type <span role="img" aria-label="Font">abc</span>
            </h3>
            <div>
              <Select value={fontType} onValueChange={handleFontChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="OpenDyslexic">OpenDyslexic</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Inter">Inter</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm mt-2 text-gray-600">Choose a font that is easier to read.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium flex items-center gap-2">
              Letter Spacing <span role="img" aria-label="Spacing">↔️</span>
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <ArrowLeft className="h-5 w-5 text-blue-500" />
                <Slider
                  className="mx-4 flex-grow"
                  min={0}
                  max={0.1}
                  step={0.005}
                  value={letterSpacing}
                  onValueChange={setLetterSpacing}
                />
                <ArrowRight className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-center text-sm text-gray-600">
                Adjust the spacing between letters for better readability.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-lg">
            Made with <span role="img" aria-label="love">❤️</span> for You
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccessibilitySettings;
