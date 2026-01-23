export function getDailyTIL(entries) {
  if (!entries || entries.length === 0) return null;

  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const pseudoRandom = (seed) => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const randomIndex = Math.floor(pseudoRandom(seed) * entries.length);

  return entries[randomIndex];
}
