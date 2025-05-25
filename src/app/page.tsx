'use client';

import React, { useState } from 'react';
import ChoiceButton from '../components/ChoiceButton';

interface Question {
  question: string;
  choices: Array<{
    label: string;
    isCorrect: boolean;
  }>;
}

const questions: Question[] = [
  {
    question: "在急诊室，患者出现急性胸痛，以下哪项是最优先的处理？",
    choices: [
      { label: "立即进行心电图检查", isCorrect: true },
      { label: "等待患者疼痛缓解", isCorrect: false },
      { label: "给予止痛药", isCorrect: false },
      { label: "安排常规检查", isCorrect: false }
    ]
  },
  {
    question: "对于急性呼吸窘迫的患者，首选的氧疗方式是？",
    choices: [
      { label: "鼻导管给氧", isCorrect: false },
      { label: "面罩给氧", isCorrect: true },
      { label: "等待患者自行缓解", isCorrect: false },
      { label: "给予口服药物", isCorrect: false }
    ]
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (choiceIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = choiceIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const currentQ = questions[currentQuestion];
  const score = selectedAnswers.reduce((acc: number, answer: number, index: number) => {
    return acc + (questions[index].choices[answer]?.isCorrect ? 1 : 0);
  }, 0);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          急诊医生知识测试
        </h1>
        
        {!showResults ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                问题 {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.choices.map((choice, index) => (
                <ChoiceButton
                  key={index}
                  label={choice.label}
                  isSelected={selectedAnswers[currentQuestion] === index}
                  isCorrect={choice.isCorrect}
                  showResult={showResults}
                  onClick={() => handleAnswer(index)}
                />
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                {currentQuestion === questions.length - 1 ? "完成" : "下一题"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">测试完成！</h2>
            <p className="text-xl mb-6">
              您的得分：{score} / {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              重新开始
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 