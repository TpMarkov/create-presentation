"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwithcer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-between gap-2 m-3">
      <Switch
        className="data-[state=checked]:bg-primary/10"
        id="theme"
        onCheckedChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        checked={theme === "light"}
      />
      <Label htmlFor="theme">{theme === "dark" ? "Dark" : "Light"}</Label>
    </div>
  );
};

export default ThemeSwithcer;
