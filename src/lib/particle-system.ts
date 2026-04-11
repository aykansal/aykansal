export interface Shockwave {
  x: number;
  y: number;
  start: number;
}

export interface DotSystem {
  count: number;
  baseX: Float32Array;
  baseY: Float32Array;
  dx: Float32Array;
  dy: Float32Array;
  size: number;
}

const SHOCKWAVE_SPEED = 225;
const SHOCKWAVE_WIDTH = 37;
const SHOCKWAVE_STRENGTH = 20;
const SHOCKWAVE_DURATION = 675;
const MOUSE_RADIUS = 100;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_FORCE_PEAK = 40;
const EASING = 0.12;
const SNAP_THRESHOLD = 0.01;

export function createDotSystem(
  points: Float32Array,
  scaleFactor: number,
  dotScale: number,
  offsetX: number,
  offsetY: number
): DotSystem {
  const count = points.length / 2;
  const baseX = new Float32Array(count);
  const baseY = new Float32Array(count);
  const dx = new Float32Array(count);
  const dy = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    baseX[i] = offsetX + points[i * 2] * scaleFactor;
    baseY[i] = offsetY + points[i * 2 + 1] * scaleFactor;
  }

  return { count, baseX, baseY, dx, dy, size: scaleFactor * dotScale };
}

export function updateDots(
  sys: DotSystem,
  mouseX: number,
  mouseY: number,
  mouseActive: boolean,
  shockwaves: Shockwave[],
  now: number
): boolean {
  const { count, baseX, baseY, dx, dy } = sys;

  let numActive = shockwaves.length;
  for (let k = shockwaves.length - 1; k >= 0; k--) {
    if (now - shockwaves[k].start >= SHOCKWAVE_DURATION) {
      shockwaves.splice(k, 1);
      numActive--;
    }
  }

  const shockMultiplier = numActive > 0 ? 1 + 0.5 * (numActive - 1) : 0;
  let hasMotion = false;

  for (let i = 0; i < count; i++) {
    let targetFx = 0;
    let targetFy = 0;

    if (mouseActive) {
      const vx = (baseX[i] + dx[i]) - mouseX;
      const vy = (baseY[i] + dy[i]) - mouseY;
      const dist2 = vx * vx + vy * vy;

      if (dist2 > 0.1 && dist2 < MOUSE_RADIUS_SQ) {
        const dist = Math.sqrt(dist2);
        const falloff = 1 - dist / MOUSE_RADIUS;
        const force = falloff * falloff * falloff * MOUSE_FORCE_PEAK;
        targetFx += (vx / dist) * force;
        targetFy += (vy / dist) * force;
      }
    }

    for (let k = 0; k < shockwaves.length; k++) {
      const sw = shockwaves[k];
      const elapsed = now - sw.start;
      const radius = (elapsed / 1000) * SHOCKWAVE_SPEED;
      const life = 1 - elapsed / SHOCKWAVE_DURATION;

      const sx = baseX[i] - sw.x;
      const sy = baseY[i] - sw.y;
      const dist = Math.sqrt(sx * sx + sy * sy);

      if (dist >= 0.1) {
        const band = Math.abs(dist - radius);
        if (band < SHOCKWAVE_WIDTH) {
          const waveForce =
            (1 - band / SHOCKWAVE_WIDTH) *
            life *
            SHOCKWAVE_STRENGTH *
            shockMultiplier;
          targetFx += (sx / dist) * waveForce;
          targetFy += (sy / dist) * waveForce;
        }
      }
    }

    dx[i] += (targetFx - dx[i]) * EASING;
    dy[i] += (targetFy - dy[i]) * EASING;

    if (Math.abs(dx[i]) < SNAP_THRESHOLD) dx[i] = 0;
    if (Math.abs(dy[i]) < SNAP_THRESHOLD) dy[i] = 0;

    if (dx[i] !== 0 || dy[i] !== 0) hasMotion = true;
  }

  return hasMotion || shockwaves.length > 0 || mouseActive;
}

/* ─── Cached ImageData for zero-alloc rendering ─── */
let _imgData: ImageData | null = null;
let _imgW = 0;
let _imgH = 0;

export function renderDots(
  ctx: CanvasRenderingContext2D,
  sys: DotSystem,
  invert: boolean,
  canvasW: number,
  canvasH: number,
  dpr: number,
  dotColor?: { r: number; g: number; b: number }
): void {
  const w = Math.round(canvasW * dpr);
  const h = Math.round(canvasH * dpr);
  if (w <= 0 || h <= 0) return;

  // Reuse ImageData buffer when dimensions match
  if (!_imgData || _imgW !== w || _imgH !== h) {
    _imgData = ctx.createImageData(w, h);
    _imgW = w;
    _imgH = h;
  }

  const buf32 = new Uint32Array(_imgData.data.buffer);
  buf32.fill(0);

  const r = dotColor ? dotColor.r : invert ? 0 : 138;
  const g = dotColor ? dotColor.g : invert ? 0 : 143;
  const b = dotColor ? dotColor.b : invert ? 0 : 152;

  // Pre-compose ABGR pixel (little-endian)
  const pixel = (255 << 24) | (b << 16) | (g << 8) | r;

  const size = sys.size * dpr;
  const pad = 0.25 * dpr;
  const totalSize = size + 0.5 * dpr;

  for (let i = 0; i < sys.count; i++) {
    const rx = (sys.baseX[i] + sys.dx[i]) * dpr - pad;
    const ry = (sys.baseY[i] + sys.dy[i]) * dpr - pad;

    const x0 = Math.max(0, rx | 0);
    const y0 = Math.max(0, ry | 0);
    const x1 = Math.min(w - 1, (rx + totalSize) | 0);
    const y1 = Math.min(h - 1, (ry + totalSize) | 0);

    for (let py = y0; py <= y1; py++) {
      const rowOff = py * w;
      buf32.fill(pixel, rowOff + x0, rowOff + x1 + 1);
    }
  }

  ctx.putImageData(_imgData, 0, 0);
}
