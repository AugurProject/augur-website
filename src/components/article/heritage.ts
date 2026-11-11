/** Seeded fallback for additional static fields. Original LCG seed 2020, 40px grid and edge falloff. */
export function makeHeritage(seed: number, width: number, height: number, density = 0.46) {
  let state = seed;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
  const columns = Math.ceil(width / 40),
    rows = Math.ceil(height / 40);
  return Array.from({ length: columns * rows }, (_, i) => {
    const x = 20 + (i % columns) * 40,
      y = 20 + Math.floor(i / columns) * 40;
    const edge = Math.max(
      Math.pow(Math.abs(y / height - 0.5) * 2, 4),
      Math.pow(Math.abs(x / width - 0.5) * 2, 12) * 0.5,
    );
    const present = random() < density,
      accent = random() < 0.24,
      strength = 0.5 + random() * 0.5;
    return {
      x,
      y,
      accent,
      opacity: +(edge * strength * (accent ? 0.85 : 0.42)).toFixed(3),
      present: present && edge > 0.12,
    };
  }).filter((s) => s.present);
}
