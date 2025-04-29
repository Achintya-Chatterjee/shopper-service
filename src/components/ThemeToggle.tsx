import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full overflow-hidden relative transition-all",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            theme === "dark" ? "bg-muted/20" : "bg-white"
          )}
          aria-label="Toggle theme"
        >
          <span className="sr-only">Toggle theme</span>
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? 45 : 0,
              scale: theme === "dark" ? 0 : 1,
              opacity: theme === "dark" ? 0 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? 0 : -45,
              scale: theme === "dark" ? 1 : 0,
              opacity: theme === "dark" ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
