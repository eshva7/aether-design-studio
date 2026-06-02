import { useEffect, useRef, useState } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // High DPI setup
    const resizeCanvas = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Mouse Tracking with smooth interpolation (lerping)
    const mouse = { x: 0, y: 0 };
    const lerpedMouse = { x: 0, y: 0 };
    const hoverIntensity = { current: 0, target: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      hoverIntensity.target = 1.0;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      hoverIntensity.target = 0.0;
    };

    // Attach listeners on the container so we catch hover and mousemove correctly
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    // Animation loop
    const render = () => {
      // Lerp mouse coordinates and hover aura intensity
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.08;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.08;
      hoverIntensity.current += (hoverIntensity.target - hoverIntensity.current) * 0.1;

      // 1. Draw premium light gray editorial background
      ctx.fillStyle = '#EDEDED'; // A subtle elegant light grey
      ctx.fillRect(0, 0, width, height);

      // 2. Clear values
      const minorGap = 12; // High-density grid lines
      const majorGap = 60; // Larger blueprint lines

      // Draw high density minor grid (soft gray)
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.035)'; // Very faint
      ctx.lineWidth = 0.5;
      
      ctx.beginPath();
      // Vertical minor lines
      for (let x = 0; x < width; x += minorGap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal minor lines
      for (let y = 0; y < height; y += minorGap) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw major grid lines (slightly more defined)
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.075)';
      ctx.lineWidth = 0.8;
      
      ctx.beginPath();
      // Vertical major lines
      for (let x = 0; x < width; x += majorGap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal major lines
      for (let y = 0; y < height; y += majorGap) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Render glowing white spotlight/hover effect
      if (hoverIntensity.current > 0.01) {
        const radius = 160; // Aura size
        const gradient = ctx.createRadialGradient(
          lerpedMouse.x, 
          lerpedMouse.y, 
          0, 
          lerpedMouse.x, 
          lerpedMouse.y, 
          radius
        );

        // Solid pure white in center merging to transparent at the edges
        const alphaCenter = 0.85 * hoverIntensity.current;
        const alphaMid = 0.3 * hoverIntensity.current;
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alphaCenter})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alphaMid})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        
        // Use default composition to overlay white on top of the gray elements
        ctx.beginPath();
        ctx.arc(lerpedMouse.x, lerpedMouse.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // 4. Highlight lines in closest proximity to mouse with crisp white color
        // This makes the active lines directly under the mouse feel super tactile!
        ctx.save();
        ctx.beginPath();
        ctx.arc(lerpedMouse.x, lerpedMouse.y, radius, 0, Math.PI * 2);
        ctx.clip(); // Mask rendering of the bright white grid strictly inside the hover radius

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * hoverIntensity.current})`;
        ctx.lineWidth = 1.0;

        // Draw local minor grids in white
        ctx.beginPath();
        const startX = Math.floor((lerpedMouse.x - radius) / minorGap) * minorGap;
        const endX = Math.ceil((lerpedMouse.x + radius) / minorGap) * minorGap;
        const startY = Math.floor((lerpedMouse.y - radius) / minorGap) * minorGap;
        const endY = Math.ceil((lerpedMouse.y + radius) / minorGap) * minorGap;

        for (let x = startX; x <= endX; x += minorGap) {
          ctx.moveTo(x, lerpedMouse.y - radius);
          ctx.lineTo(x, lerpedMouse.y + radius);
        }
        for (let y = startY; y <= endY; y += minorGap) {
          ctx.moveTo(lerpedMouse.x - radius, y);
          ctx.lineTo(lerpedMouse.x + radius, y);
        }
        ctx.stroke();

        // Draw local major grids in stronger white
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * hoverIntensity.current})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const majorStartX = Math.floor((lerpedMouse.x - radius) / majorGap) * majorGap;
        const majorEndX = Math.ceil((lerpedMouse.x + radius) / majorGap) * majorGap;
        const majorStartY = Math.floor((lerpedMouse.y - radius) / majorGap) * majorGap;
        const majorEndY = Math.ceil((lerpedMouse.y + radius) / majorGap) * majorGap;

        for (let x = majorStartX; x <= majorEndX; x += majorGap) {
          ctx.moveTo(x, lerpedMouse.y - radius);
          ctx.lineTo(x, lerpedMouse.y + radius);
        }
        for (let y = majorStartY; y <= majorEndY; y += majorGap) {
          ctx.moveTo(lerpedMouse.x - radius, y);
          ctx.lineTo(lerpedMouse.x + radius, y);
        }
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-500 ease-in-out"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-100 pointer-events-none"
      />
    </div>
  );
}
