'use client';

import React, { useState } from 'react';
import GameScene from '../components/GameScene';

interface GameState {
  currentScene: 'emergency' | 'treatment' | 'result';
  patientCondition: string;
  score: number;
  timeRemaining: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'emergency',
    patientCondition: '急性胸痛',
    score: 0,
    timeRemaining: 180 // 3分钟
  });

  const handleAction = (action: string) => {
    // 处理游戏中的各种动作
    console.log('Action:', action);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          急诊室模拟游戏
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-lg font-semibold">病人状况：</span>
              <span className="ml-2 text-red-600">{gameState.patientCondition}</span>
            </div>
            <div>
              <span className="text-lg font-semibold">剩余时间：</span>
              <span className="ml-2 text-blue-600">{gameState.timeRemaining}秒</span>
            </div>
            <div>
              <span className="text-lg font-semibold">得分：</span>
              <span className="ml-2 text-green-600">{gameState.score}</span>
            </div>
          </div>

          <GameScene onAction={handleAction} />

          <div className="mt-6 text-center text-gray-600">
            <p>使用方向键移动医生，接近病人或设备时按空格键进行互动</p>
            <p>仔细观察病人症状，选择合适的治疗方案</p>
          </div>
        </div>
      </div>
    </main>
  );
} 