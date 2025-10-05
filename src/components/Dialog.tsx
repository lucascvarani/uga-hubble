import React, { useState, useEffect } from "react";
import DiamondLine from "./structure/DiamondLine";

interface DialogUIProps {
  text: string;
  onNext: () => void;
  typingSpeed?: number;
}

const Dialog: React.FC<DialogUIProps> = ({
  text,
  onNext,
  typingSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed]);

  const handleClick = () => {
    if (isTypingComplete) {
      onNext();
    } else {
      // Instantly complete the text if clicked during typing
      setDisplayedText(text);
      setIsTypingComplete(true);
    }
  };

  return (
    // We add a className to target this element reliably with CSS
    <div className="dialog-wrapper">
      <div
        className="dialog-container"
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "40px",
          paddingTop: "30px", // Less padding on top to make room for the line
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "white",
          textAlign: "center",
          fontSize: "1.1rem",
          zIndex: 1000,
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <DiamondLine />
        <span>
          {displayedText}
          {!isTypingComplete && (
            <span
              style={{
                animation: "blink 1s infinite",
                marginLeft: "2px",
              }}
            >
              |
            </span>
          )}
        </span>

        <style>
          {`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* The dialog needs a relative position for its pseudo-elements */
        .dialog-container {
          position: relative;
        }
        `}
        </style>
      </div>
    </div>
  );
};

export default Dialog;
