"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  Loader2Icon,
  RotateCcw,
  SparkleIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { SelectValue } from "@radix-ui/react-select";
import CardList from "../Common/CardList";

type Props = {
  onBack: () => void;
};
const CreateAI = ({ onBack }: Props) => {
  const router = useRouter();
  const { currentAIPrompt, setCurrentAIPrompt, outlines, resetOutlines } =
    useCreativeAIStore();

  const [editingCard, setEditingCrd] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [numberOfCartds, setNumberOfCards] = useState(0);

  const resetCards = () => {
    setEditingCrd(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAIPrompt("");
    resetOutlines();
  };

  const generateOutline = () => {
    setIsGenerating(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !isGenerating) {
        generateOutline();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGenerating]);

  return (
    <motion.div
      className="space-y-6 w-full max-2-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button variant={"outline"} className="mb-4" onClick={onBack}>
        <ChevronLeftIcon />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text font-bold text-4xl">
            Creative AI
          </span>
        </h1>
        <p className="text-muted-foreground">
          What would you like to create today?
        </p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="dark:bg-primary/20 bg-primary/10 p-4 rounded-xl"
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            placeholder="Enter Prompt and add to the cards..."
            className="text-bse sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
            value={currentAIPrompt}
            onChange={(e) => setCurrentAIPrompt(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Select
              value={numberOfCartds.toString()}
              onValueChange={(value) => setNumberOfCards(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of cards" />
                <SelectContent className="w-full">
                  {outlines.length === 0 ? (
                    <SelectItem value="0" className="font-semibold">
                      No Cards
                    </SelectItem>
                  ) : (
                    Array.from(
                      { length: outlines.length },
                      (_, idx) => idx + 1
                    ).map((el, idx) => (
                      <SelectItem
                        key={idx}
                        className="font-semibold"
                        value={el.toString()}
                      >
                        {el}
                        {el === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </SelectTrigger>
            </Select>
            <Button
              onClick={resetCards}
              variant="destructive"
              aria-label="Reset Cards"
            >
              <RotateCcw />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex items-center justify-center">
        {isGenerating ? (
          <>
            <Loader2Icon className="animate-spin" /> Generating...
          </>
        ) : (
          <Button
            disabled={isGenerating}
            onClick={generateOutline}
            className="text-md flex gap-2 items-center"
          >
            <SparkleIcon />
            Generate Outline
          </Button>
        )}
      </div>
      <CardList />
    </motion.div>
  );
};

export default CreateAI;
