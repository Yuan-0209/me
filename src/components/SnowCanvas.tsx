import {useEffect, useRef} from 'react';
import type {AtmosphereMood, SnowIntensity} from '../data/christmasContent';

interface SnowCanvasProps {
  intensity: SnowIntensity;
  mood: AtmosphereMood;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftAmplitude: number;
  driftPhase: number;
  opacity: number;
  warmTint: boolean;
}

export function SnowCanvas({intensity, mood}: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseWindRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (intensity === 'off' || prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const flakeCount = intensity === 'blizzard' ? 125 : 58;
    const speedMultiplier = intensity === 'blizzard' ? 1.55 : 0.85;

    const flakes: Snowflake[] = Array.from({length: flakeCount}, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.9 + Math.random() * (intensity === 'blizzard' ? 2.6 : 2.1),
      speedY: (0.45 + Math.random() * 0.95) * speedMultiplier,
      driftAmplitude: 0.25 + Math.random() * 0.55,
      driftPhase: Math.random() * Math.PI * 2,
      opacity: 0.16 + Math.random() * 0.45,
      warmTint: index % 5 === 0,
    }));

    const handleMouseMove = (event: MouseEvent) => {
      const normalized = (event.clientX / Math.max(width, 1) - 0.5) * 2;
      mouseWindRef.current = normalized * 0.55;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, {passive: true});

    let tick = 0;
    const render = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.y += flake.speedY;
        flake.x +=
          Math.sin(tick + flake.driftPhase) * flake.driftAmplitude +
          mouseWindRef.current * (flake.radius * 0.35);

        if (flake.y > height + 8) {
          flake.y = -8;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 8) {
          flake.x = -8;
        } else if (flake.x < -8) {
          flake.x = width + 8;
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        if (flake.warmTint && mood === 'candlelight') {
          ctx.fillStyle = `rgba(244, 214, 152, ${flake.opacity * 0.85})`;
        } else if (mood === 'frostlight') {
          ctx.fillStyle = `rgba(226, 238, 250, ${flake.opacity})`;
        } else {
          ctx.fillStyle = `rgba(245, 241, 232, ${flake.opacity})`;
        }
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, mood]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
    />
  );
}
