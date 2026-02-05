import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type props = {
  text: string,
  className?: string,
}
export function WordPullUp({ text, className }: props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const words = text;
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "text-center font-display font-bold drop-shadow-sm",
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        "tracking-[-0.02em]",
        "leading-tight sm:leading-tight md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]",
        "text-neutral-500 dark:text-neutral-500",
        "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: "inline-block", paddingRight: "15px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}