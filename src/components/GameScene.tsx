'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  type: 'doctor' | 'patient' | 'nurse';
  state: 'idle' | 'walking' | 'treating' | 'talking';
}

interface GameSceneProps {
  onAction: (action: string) => void;
}

const GameScene: React.FC<GameSceneProps> = ({ onAction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [doctor, setDoctor] = useState<Character>({
    x: 100,
    y: 300,
    width: 64,
    height: 64,
    image: new Image(),
    type: 'doctor',
    state: 'idle'
  });

  const [patient, setPatient] = useState<Character>({
    x: 400,
    y: 300,
    width: 64,
    height: 64,
    image: new Image(),
    type: 'patient',
    state: 'idle'
  });

  // 加载角色图片
  useEffect(() => {
    doctor.image.src = '/characters/doctor.png';
    patient.image.src = '/characters/patient.png';
  }, []);

  // 游戏主循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制背景
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制急诊室设备
      drawEquipment(ctx);

      // 绘制角色
      drawCharacter(ctx, doctor);
      drawCharacter(ctx, patient);

      // 继续下一帧
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [doctor, patient]);

  // 绘制医疗设备
  const drawEquipment = (ctx: CanvasRenderingContext2D) => {
    // 心电图机
    ctx.fillStyle = '#4a90e2';
    ctx.fillRect(600, 200, 80, 60);
    ctx.fillStyle = '#fff';
    ctx.fillText('心电图机', 610, 235);

    // 呼吸机
    ctx.fillStyle = '#50c878';
    ctx.fillRect(600, 300, 80, 60);
    ctx.fillText('呼吸机', 615, 335);

    // 输液架
    ctx.fillStyle = '#808080';
    ctx.fillRect(200, 200, 20, 100);
    ctx.fillStyle = '#fff';
    ctx.fillText('输液架', 180, 250);
  };

  // 绘制角色
  const drawCharacter = (ctx: CanvasRenderingContext2D, character: Character) => {
    if (character.image.complete) {
      ctx.drawImage(
        character.image,
        character.x,
        character.y,
        character.width,
        character.height
      );
    }
  };

  // 处理键盘输入
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 5;
      setDoctor(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newState = prev.state;

        switch (e.key) {
          case 'ArrowLeft':
            newX = Math.max(0, prev.x - speed);
            newState = 'walking';
            break;
          case 'ArrowRight':
            newX = Math.min(800 - prev.width, prev.x + speed);
            newState = 'walking';
            break;
          case 'ArrowUp':
            newY = Math.max(0, prev.y - speed);
            newState = 'walking';
            break;
          case 'ArrowDown':
            newY = Math.min(600 - prev.height, prev.y + speed);
            newState = 'walking';
            break;
        }

        return { ...prev, x: newX, y: newY, state: newState };
      });
    };

    const handleKeyUp = () => {
      setDoctor(prev => ({ ...prev, state: 'idle' }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 rounded-lg"
      />
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">操作说明：</h3>
        <p>↑↓←→ 移动医生</p>
        <p>空格键 与病人互动</p>
      </div>
    </div>
  );
};

export default GameScene; 