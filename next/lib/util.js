export function randomDigits(n = 6) {
  let s = '';
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export function makeId(prefix = 'bk') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
}

export function makeReferralCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = '23456789';
  let part = '';
  for (let i = 0; i < 4; i++) part += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 2; i++) part += digits[Math.floor(Math.random() * digits.length)];
  return `DLS-${part}`;
}
