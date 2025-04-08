import React from "react";
import Typewriter from "typewriter-effect";

interface WriterProps {
  text: string;
  isLastIndex: boolean;
  onComplete: () => void
}

export const Writer: React.FC<WriterProps> = ({ text, isLastIndex, onComplete }) => {
  const handleReload = () => {
    isLastIndex && window.location.reload()
  }

  return (
    <div className="write-container" onClick={handleReload}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .callFunction(onComplete)
            .start();
        }}
        options={{
          delay: 40,
        }}
      />
    </div>
  );
};