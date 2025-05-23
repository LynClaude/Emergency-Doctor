import React from "react";

interface ChoiceButtonProps {
  label: string;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  label,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}) => {
  let bg = "bg-gray-100";
  if (showResult) {
    bg = isCorrect
      ? isSelected
        ? "bg-green-300"
        : "bg-green-100"
      : isSelected
      ? "bg-red-300"
      : "bg-gray-100";
  } else if (isSelected) {
    bg = "bg-blue-200";
  }

  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 rounded ${bg}`}
    >
      {label}
    </button>
  );
};

export default ChoiceButton; 