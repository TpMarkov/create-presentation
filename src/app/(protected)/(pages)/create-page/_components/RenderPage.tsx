"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePromptStore from "@/store/usePormptStore";
import CreatePage from "../_components/createPage/CreatePage";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage />;
      case "create-scratch":
        return <></>;
      case "creative-ai":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 20 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
