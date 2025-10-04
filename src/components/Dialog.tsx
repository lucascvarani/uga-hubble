import React, { useEffect } from "react";

interface DialogUIProps {
  text: string;
  onNext: () => void; // callback when user clicks to go to next dialog
}

const Dialog: React.FC<DialogUIProps> = ({ text, onNext }) => {
  // Attach a click listener to the whole window
  useEffect(() => {
    const handleClick = () => {
      onNext();
    };

    window.addEventListener("click", handleClick);

    // Clean up the listener when component unmounts
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onNext]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "12px 0",
        fontSize: "1.2rem",
        zIndex: 1000,
        pointerEvents: "none", // lets clicks pass through so window click triggers
      }}
    >
      <span style={{ pointerEvents: "auto" }}>{text}</span>
    </div>
  );
};

export default Dialog;
