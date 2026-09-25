import React, { useRef, useEffect } from "react";

interface Canvas3DSceneProps {
  className?: string;
}

export default function Canvas3DScene({ className = "" }: Canvas3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // 3D Nodes Matrix / Lattice
    // Vertices of a multi-ring dodecahedron / hyper-cube structure
    const nodes: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 135 + (i % 3) * 22;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      nodes.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let rotX = 0.2;
    let rotY = 0.3;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = nx * 1.5;
      mouseY = ny * 1.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotY += 0.005 + (mouseX * 0.03 - rotY * 0.02);
      rotX += 0.003 + (mouseY * 0.03 - rotX * 0.02);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 320;

      // Projected points
      const projected = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.ox * cosY - node.oz * sinY;
        let z1 = node.oz * cosY + node.ox * sinY;

        // Rotate around X
        let y1 = node.oy * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.oy * sinX;

        // Perspective division
        const distance = fov + z2;
        const scale = fov / Math.max(distance, 40);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        return { px, py, scale, z: z2 };
      });

      // Draw Connections (3D graph edges)
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = Math.max(0, (1 - dist / 85) * 0.28);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const radius = Math.max(1.8, p.scale * 2.5);
        const alpha = Math.min(1, Math.max(0.2, (p.z + 180) / 360));

        // Glow
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, radius * 2.5);
        grad.addColorStop(0, `rgba(52, 211, 153, ${alpha * 0.9})`);
        grad.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(209, 250, 229, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className={`pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
