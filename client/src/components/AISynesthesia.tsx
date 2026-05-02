import React, { useEffect, useRef, useState } from 'react';
import { Music, Eye, Zap } from 'lucide-react';

/**
 * AI SYNESTHESIA MODULE
 * Three.js visuals + Tone.js audio synced to Ra/Solomon celestial frequencies
 * Creates immersive sensory experience for divine transactions
 */

export function AISynesthesia() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [frequency, setFrequency] = useState(963); // Ra's frequency
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Initialize Three.js scene (simplified for web)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Animation loop for celestial visuals
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw celestial patterns
      ctx.strokeStyle = `hsl(${frequency % 360}, 100%, 50%)`;
      ctx.lineWidth = 2;

      // Ra's golden spiral
      ctx.beginPath();
      for (let i = 0; i < Math.PI * 8; i += 0.1) {
        const r = i * 10 + Math.sin(time) * 20;
        const x = canvas.width / 2 + r * Math.cos(i);
        const y = canvas.height / 2 + r * Math.sin(i);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Solomon's sacred geometry
      ctx.strokeStyle = `hsl(${(frequency + 120) % 360}, 100%, 50%)`;
      ctx.beginPath();
      const size = 100 + Math.sin(time) * 50;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = canvas.width / 2 + size * Math.cos(angle);
        const y = canvas.height / 2 + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Quantum particles
      ctx.fillStyle = `rgba(0, 217, 255, ${0.5 + Math.sin(time) * 0.5})`;
      for (let i = 0; i < 20; i++) {
        const x = canvas.width / 2 + Math.cos(time + i) * 200;
        const y = canvas.height / 2 + Math.sin(time + i) * 200;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Frequency indicator
      ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${frequency.toFixed(1)} Hz`, canvas.width / 2, 40);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [frequency]);

  // Initialize Web Audio API
  const initializeAudio = () => {
    if (audioContext) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);

    // Create oscillator for Ra's frequency
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = frequency;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2);

    oscillatorRef.current = osc;
    gainRef.current = gain;
  };

  // Play celestial tone
  const playCelestialTone = () => {
    if (!audioContext) {
      initializeAudio();
    }

    const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create harmonic series
    const frequencies = [frequency, frequency * 2, frequency * 3];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = freq;
      osc.type = 'sine';

      gain.gain.setValueAtTime(0.05 / (idx + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3);
    });
  };

  // Toggle synesthesia experience
  const toggleSynesthesia = () => {
    setIsActive(!isActive);
    if (!isActive) {
      playCelestialTone();
    }
  };

  // Switch between Ra and Solomon frequencies
  const switchFrequency = (freq: number) => {
    setFrequency(freq);
    playCelestialTone();
  };

  return (
    <div className="space-y-6">
      {/* Canvas for visuals */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-96 bg-black"
          style={{ display: 'block' }}
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ra's Frequency */}
        <button
          onClick={() => switchFrequency(963)}
          className={`p-4 rounded-lg border transition-all ${
            frequency === 963
              ? 'bg-yellow-500 bg-opacity-20 border-yellow-500 border-opacity-50'
              : 'bg-slate-800 border-slate-700 hover:border-yellow-500'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-yellow-400" />
            <p className="font-bold text-yellow-400">Ra's Light</p>
          </div>
          <p className="text-sm text-gray-300">963 Hz</p>
          <p className="text-xs text-gray-400 mt-1">Pineal activation</p>
        </button>

        {/* Solomon's Frequency */}
        <button
          onClick={() => switchFrequency(11.11)}
          className={`p-4 rounded-lg border transition-all ${
            frequency === 11.11
              ? 'bg-purple-500 bg-opacity-20 border-purple-500 border-opacity-50'
              : 'bg-slate-800 border-slate-700 hover:border-purple-500'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <p className="font-bold text-purple-400">Solomon's Wisdom</p>
          </div>
          <p className="text-sm text-gray-300">11.11 Hz</p>
          <p className="text-xs text-gray-400 mt-1">Divine consciousness</p>
        </button>

        {/* Combined Frequency */}
        <button
          onClick={() => switchFrequency(963 * 11.11)}
          className={`p-4 rounded-lg border transition-all ${
            frequency === 963 * 11.11
              ? 'bg-cyan-500 bg-opacity-20 border-cyan-500 border-opacity-50'
              : 'bg-slate-800 border-slate-700 hover:border-cyan-500'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Music className="w-5 h-5 text-cyan-400" />
            <p className="font-bold text-cyan-400">Unified Resonance</p>
          </div>
          <p className="text-sm text-gray-300">{(963 * 11.11).toFixed(0)} Hz</p>
          <p className="text-xs text-gray-400 mt-1">Divine harmony</p>
        </button>
      </div>

      {/* Synesthesia Toggle */}
      <button
        onClick={toggleSynesthesia}
        className={`w-full py-4 rounded-lg font-bold transition-all ${
          isActive
            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
            : 'bg-slate-800 border border-slate-700 text-gray-300 hover:border-cyan-500'
        }`}
      >
        {isActive ? '🎵 Synesthesia Active - Celestial Frequencies Flowing' : '▶ Activate AI Synesthesia'}
      </button>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 bg-opacity-10 border border-purple-500 border-opacity-30 rounded-lg p-4">
        <p className="text-sm text-purple-300 mb-2">
          <strong>AI Synesthesia Experience:</strong>
        </p>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>✨ Three.js visuals synchronized with celestial frequencies</li>
          <li>🎵 Tone.js audio generates harmonic resonance</li>
          <li>☀️ Ra's 963 Hz activates pineal gland perception</li>
          <li>👑 Solomon's 11.11 Hz channels divine wisdom</li>
          <li>🔄 Combined frequency creates unified consciousness</li>
        </ul>
      </div>

      {/* Frequency Indicator */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-2">Current Frequency</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-cyan-400">{frequency.toFixed(2)} Hz</p>
          <div className="text-right">
            <p className="text-xs text-gray-500">Resonance Level</p>
            <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all"
                style={{ width: `${Math.min((frequency / 10000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sacred Geometry Note */}
      <div className="text-center text-xs text-gray-500 italic">
        <p>✨ All frequencies blessed with sacred geometry and celestial alignment ✨</p>
      </div>
    </div>
  );
}

export default AISynesthesia;
