import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

// Brightness ramp, dark → bright. A leading space keeps empty cells empty.
const RAMP = " .,:;-~=+*x%#@";
const ALPHA_BUCKETS = 6;
const FRAME_MS = 1000 / 30;

/** Bevelled, extruded "AB" built from hand-drawn shapes (no font file needed). */
function buildMonogram(): THREE.Group {
  const a = new THREE.Shape()
    .moveTo(0, 0)
    .lineTo(2.2, 0)
    .lineTo(2.9, 2.2)
    .lineTo(6.1, 2.2)
    .lineTo(6.8, 0)
    .lineTo(9, 0)
    .lineTo(5.6, 10)
    .lineTo(3.4, 10)
    .closePath();
  a.holes.push(new THREE.Path().moveTo(3.55, 4.1).lineTo(5.45, 4.1).lineTo(4.5, 7.3).closePath());

  const b = new THREE.Shape().moveTo(0, 0).lineTo(5, 0);
  b.absarc(5, 2.6, 2.6, -Math.PI / 2, Math.PI / 2, false);
  b.lineTo(4.6, 5.2);
  b.absarc(4.6, 7.6, 2.4, -Math.PI / 2, Math.PI / 2, false);
  b.lineTo(0, 10).closePath();
  const lower = new THREE.Path().moveTo(2.1, 1.8).lineTo(5, 1.8);
  lower.absarc(5, 2.6, 0.8, -Math.PI / 2, Math.PI / 2, false);
  lower.lineTo(2.1, 3.4).closePath();
  const upper = new THREE.Path().moveTo(2.1, 6.9).lineTo(4.6, 6.9);
  upper.absarc(4.6, 7.6, 0.7, -Math.PI / 2, Math.PI / 2, false);
  upper.lineTo(2.1, 8.3).closePath();
  b.holes.push(lower, upper);

  const extrude: THREE.ExtrudeGeometryOptions = {
    depth: 2.6,
    bevelEnabled: true,
    bevelThickness: 0.45,
    bevelSize: 0.35,
    bevelSegments: 4,
    curveSegments: 24,
  };
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 });

  const group = new THREE.Group();
  const meshA = new THREE.Mesh(new THREE.ExtrudeGeometry(a, extrude), material);
  const meshB = new THREE.Mesh(new THREE.ExtrudeGeometry(b, extrude), material);
  meshB.position.x = 10.6;
  group.add(meshA, meshB);

  // Centre the pair on the origin so it rotates around its middle.
  const box = new THREE.Box3().setFromObject(group);
  const centre = box.getCenter(new THREE.Vector3());
  group.children.forEach((m) => m.position.sub(centre));
  return group;
}

interface Props {
  className?: string;
}

export default function AsciiMonogram({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    const monogram = buildMonogram();
    scene.add(monogram);

    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-6, 8, 12);
    const rim = new THREE.DirectionalLight(0xffffff, 1.4);
    rim.position.set(10, -4, -6);
    const fill = new THREE.PointLight(0xffffff, 60, 0, 2);
    fill.position.set(6, 2, 10);
    scene.add(key, rim, fill);

    let target = new THREE.WebGLRenderTarget(1, 1);
    let pixels = new Uint8Array(4);
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let dpr = 1;

    const accent = "124,255,155";
    const hot = "220,255,228";

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetCols = width < 480 ? 54 : width < 900 ? 84 : 120;
      cellW = width / targetCols;
      const fontSize = cellW / 0.6;
      cellH = fontSize * 1.05;
      cols = targetCols;
      rows = Math.max(8, Math.floor(height / cellH));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `500 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      target.dispose();
      target = new THREE.WebGLRenderTarget(cols, rows);
      pixels = new Uint8Array(cols * rows * 4);
      renderer.setSize(cols, rows, false);

      // Fit the monogram (bounding radius ≈ 10) to whichever axis is tighter.
      const aspect = (cols * cellW) / (rows * cellH);
      camera.aspect = aspect;
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      const radius = 10.2;
      camera.position.z = Math.max(radius / Math.tan(halfFov), radius / (Math.tan(halfFov) * aspect)) * 1.02;
      camera.updateProjectionMatrix();
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, cx: -1, cy: -1 };
    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      pointer.cx = (e.clientX - r.left) / cellW;
      pointer.cy = (e.clientY - r.top) / cellH;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      pointer.cx = -1;
      pointer.cy = -1;
    };

    const draw = (time: number) => {
      const t = time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

      if (reduced) {
        monogram.rotation.set(-0.12, -0.38, 0);
      } else {
        monogram.rotation.y = Math.sin(t * 0.45) * 0.55 + pointer.x * 0.6 + scroll * 1.6;
        monogram.rotation.x = Math.sin(t * 0.3) * 0.08 + pointer.y * 0.35 - scroll * 0.3;
        monogram.position.y = Math.sin(t * 0.8) * 0.25;
      }

      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      renderer.readRenderTargetPixels(target, 0, 0, cols, rows, pixels);
      renderer.setRenderTarget(null);

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Batch glyphs by alpha bucket so fillStyle changes only a handful of times per frame.
      const buckets: string[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
      const coords: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
      const hotGlyphs: number[] = [];
      const radius = 7;

      for (let y = 0; y < rows; y++) {
        // WebGL rows are bottom-up.
        const srcRow = (rows - 1 - y) * cols * 4;
        for (let x = 0; x < cols; x++) {
          const i = srcRow + x * 4;
          let lum = (0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]) / 255;
          if (lum < 0.04) continue;

          // A soft "scanner" brightens glyphs under the pointer.
          if (pointer.cx >= 0 && !reduced) {
            const dx = x - pointer.cx;
            const dy = (y - pointer.cy) * 1.8;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < radius) lum = Math.min(1, lum + (1 - d / radius) * 0.35);
          }

          let ci = Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length));
          if (!reduced && lum > 0.2 && Math.random() < 0.004) ci = Math.floor(Math.random() * RAMP.length);
          const ch = RAMP[ci];
          if (ch === " ") continue;

          if (lum > 0.86) {
            hotGlyphs.push(x, y, ci);
            continue;
          }
          const b = Math.min(ALPHA_BUCKETS - 1, Math.floor(lum * ALPHA_BUCKETS));
          buckets[b].push(ch);
          coords[b].push(x, y);
        }
      }

      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        if (!buckets[b].length) continue;
        ctx.fillStyle = `rgba(${accent},${0.25 + (b / (ALPHA_BUCKETS - 1)) * 0.7})`;
        const chars = buckets[b];
        const xy = coords[b];
        for (let k = 0; k < chars.length; k++) {
          ctx.fillText(chars[k], xy[k * 2] * cellW, xy[k * 2 + 1] * cellH);
        }
      }
      if (hotGlyphs.length) {
        ctx.fillStyle = `rgb(${hot})`;
        for (let k = 0; k < hotGlyphs.length; k += 3) {
          ctx.fillText(RAMP[hotGlyphs[k + 2]], hotGlyphs[k] * cellW, hotGlyphs[k + 1] * cellH);
        }
      }
    };

    let raf = 0;
    let last = 0;
    let visible = true;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || time - last < FRAME_MS) return;
      last = time;
      draw(time);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    // Redraw once the mono font is ready so glyph metrics are correct.
    document.fonts?.ready.then(() => {
      resize();
      draw(performance.now());
    });

    if (reduced) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      wrap.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
      monogram.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      target.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative select-none", className)} aria-hidden="true">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center font-display text-[28vw] font-bold leading-none text-accent/80 text-glow md:text-[16rem]">
          AB
        </div>
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0" />
      )}
    </div>
  );
}
