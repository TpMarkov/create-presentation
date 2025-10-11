"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/lib/constants";
import usePromptStore from "@/store/usePormptStore";
import { motion } from "framer-motion";

const RecentPrompts = () => {
  const { prompts, setPage } = usePromptStore();

  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt?.id === id);

    if (prompt) {
      setPage("creative-ai");
      addMUltiipleOutlines(prompt?.outlines);
      setCurrentAiPrompt(prompt?.title);
    }
  };
  return (
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center"
      >
        Your recent Prompts
      </motion.h2>

      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-4 flex justify-between hover:bg-accent/50 transition-colors duration-300">
            {/* Wrap everything in a flex container and center items vertically */}
            <div className="flex items-center justify-between w-full">
              {/* Left side: title + time */}
              <div className="flex flex-col justify-center max-w-[70%]">
                <h3 className="font-semibold text-xl line-clamp-1">
                  {/* {prompt?.title} */}
                  Some title
                </h3>
                <p className="font-semibold text-sm text-muted-foreground">
                  5 h ago
                  {/* {timeAgo(prompt?.createdAt)} */}
                </p>
              </div>

              {/* Right side: Creative AI + Edit button */}
              <div className="flex items-center gap-4">
                <p className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text font-bold">
                  Creative AI
                </p>
                <Button
                  className="rounded-lg bg-primary/80 dark:hover:bg-gray-700 hover:bg-gray-200 hover:text-primary"
                  variant="default"
                  onClick={() => handleEdit(prompt?.id)}
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
