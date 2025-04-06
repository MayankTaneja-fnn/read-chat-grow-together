
import React from "react";
import { Book, Sun, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-accent" />
          <h1 className="text-xl font-semibold">TextEase</h1>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
