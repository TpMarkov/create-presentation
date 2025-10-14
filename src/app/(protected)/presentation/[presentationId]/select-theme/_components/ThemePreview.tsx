"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { themes } from "@/lib/constants";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import ThemeCard from "./ThemeCard";

const ThemePreview = () => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();
  const { project, currentTheme, setCurrentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [project]);

  // Start the animation
  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const leftCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol
          className="list-decimal list-inside spce-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and publish</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lh font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it acts as a text box.
          </p>
        </div>
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            You can get these by typing /smart
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="h-12 px-6 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Primary Buttton
        </Button>
        <Button
          variant="outline"
          className="h-12 px-6 text-lg font-medium"
          style={{
            borderColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Secondary Button
        </Button>
      </div>
    </div>
  );

  const rightCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className="list-disc list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive design</li>
          <li>Dark and Light modes</li>
          <li>Custom color schemas</li>
          <li>Accessibility optimized</li>
        </ul>
      </div>
      <Button
        variant="outline"
        className="w-full h-12 text-lg font-medium"
        style={{
          borderColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  );

  return (
    <div
      className="h-screen w-full flex"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-12 flex flex-col items-center min-h-screen">
          <Button
            variant="outline"
            className="mb-12 selft-start"
            size="lg"
            style={{
              backgroundColor: selectedTheme.accentColor + "10",
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + "20",
            }}
            onClick={() => router.push(`/create-page`)}
          >
            <ArrowLeftIcon />
            Back
          </Button>
          <div className="w-full flex justify-center items-center relative flex-grow">
            <ThemeCard
              title="Quick Start"
              theme={selectedTheme}
              controls={controls}
              content={leftCardContent}
              description="Get up and running in no time"
              variant="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
