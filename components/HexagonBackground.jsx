import React, { useEffect, useRef, useState } from 'react';

const HexagonBackground = ({ isVisible = true }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef(null);
  const lastTimeRef = useRef(0);

  const colorPalette = [
    'rgba(15, 15, 15, 0.65)',
    'rgba(255, 112, 41, 0.55)',
    'rgba(255, 164, 98, 0.45)',
    'rgba(120, 120, 120, 0.4)',
    'rgba(80, 78, 78, 0.55)',
    'rgba(255, 250, 255, 0.55)',
  ];

  // Initialize state
  useEffect(() => {
    stateRef.current = {
      nodes: [],
      connections: [],
      hexRadius: 100,
      pointer: {
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        isActive: false,
      },
      wave: {
        frequency: 0.01,
        speed: 0.003,
        decay: 240,
        strength: 16,
        radius: 100,
      },
    };
  }, []);

  const buildGrid = () => {
    if (!stateRef.current) return;

    const state = stateRef.current;
    const { hexRadius } = state;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const horizontalSpacing = Math.sqrt(2) * hexRadius;
    const verticalSpacing = 1.0 * hexRadius;

    state.nodes = [];
    state.connections = [];

    let rowIndex = 0;
    const grid = [];

    for (
      let y = -hexRadius;
      y < height + hexRadius;
      y += verticalSpacing,
      rowIndex++
    ) {
      const row = [];
      const offset = ((rowIndex % 2) * horizontalSpacing) / 2;
      let colIndex = 0;

      for (
        let x = -horizontalSpacing;
        x < width + horizontalSpacing;
        x += horizontalSpacing,
        colIndex++
      ) {
        const node = {
          baseX: x + offset,
          baseY: y,
          x: x + offset,
          y: y,
          row: rowIndex,
          col: colIndex,
          driftRadius: 4 + Math.random() * 4,
          driftAngle: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.4,
          hexScale: 0.4 + Math.random() * 0.9,
          hexColor:
            colorPalette[Math.floor(Math.random() * colorPalette.length)],
        };

        row.push(node);
        state.nodes.push(node);
      }

      grid.push(row);
    }

    // Build connections
    for (const row of grid) {
      for (const node of row) {
        const { row: r, col: c } = node;
        const east = grid[r]?.[c + 1];
        const southRow = grid[r + 1];
        const isOdd = r % 2 === 1;

        const southEast = isOdd ? southRow?.[c + 1] : southRow?.[c];
        const southWest = isOdd ? southRow?.[c] : southRow?.[c - 1];

        if (east) state.connections.push([node, east]);
        if (southEast) state.connections.push([node, southEast]);
        if (southWest) state.connections.push([node, southWest]);
      }
    }
  };

  const drawHexagon = (ctx, x, y, radius) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = ((Math.PI * 2) / 6) * i + Math.PI / 6;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  const animate = (time) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    if (!state) return;

    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.translate(0.5, 0.5);

    const waveTime = time;
    state.nodes.forEach((node) => {
      node.driftAngle += (node.speed * delta) / 10000;
      const baseX =
        node.baseX + Math.cos(node.driftAngle) * node.driftRadius;
      const baseY =
        node.baseY + Math.sin(node.driftAngle) * node.driftRadius;

      const dx = baseX - state.pointer.x;
      const dy = baseY - state.pointer.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

      const { frequency, speed, decay, strength } = state.wave;
      const wave =
        Math.sin(dist * frequency - waveTime * speed) *
        Math.exp(-dist / decay) *
        (state.pointer.isActive ? 1 : 0.5);

      node.x = baseX + (dx / dist) * wave * strength;
      node.y = baseY + (dy / dist) * wave * strength;
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(90, 90, 90, 0.2)';
    ctx.lineWidth = 1;
    state.connections.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Draw hexagons
    ctx.lineWidth = 1.2;
    state.nodes.forEach((node) => {
      ctx.strokeStyle = node.hexColor;
      drawHexagon(ctx, node.x, node.y, state.hexRadius * 0.3 * node.hexScale);
      ctx.stroke();
    });

    ctx.restore();
    animationRef.current = requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  };

  const updatePointer = (event) => {
    if (stateRef.current) {
      stateRef.current.pointer.x = event.clientX;
      stateRef.current.pointer.y = event.clientY;
      stateRef.current.pointer.isActive = true;
    }
  };

  const handleLeave = () => {
    if (stateRef.current) {
      stateRef.current.pointer.isActive = false;
      stateRef.current.pointer.x = window.innerWidth / 2;
      stateRef.current.pointer.y = window.innerHeight / 2;
    }
  };

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', updatePointer);
    window.addEventListener('pointerdown', updatePointer);
    window.addEventListener('pointerup', handleLeave);
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', updatePointer);
      window.removeEventListener('pointerup', handleLeave);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`hexagon-background ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: 'transparent',
        zIndex: 1,
        opacity: isVisible ? 1 : 0.2,
        transition: 'opacity 1.5s ease-in-out',
      }}
    />
  );
};

export default HexagonBackground;
