import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  referralCode TEXT UNIQUE
);
CREATE TABLE IF NOT EXISTS otps (
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expiresAt INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  userId INTEGER NOT NULL,
  productId TEXT,
  category TEXT,
  mrp INTEGER,
  bookingAmount INTEGER,
  balance INTEGER,
  transactionId TEXT,
  paymentProofUrl TEXT,
  referralCodeUsed TEXT,
  status TEXT NOT NULL,
  deliveryFree INTEGER DEFAULT 0,
  createdAt INTEGER NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id)
);
`);

export function upsertUserByEmail(email) {
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    db.prepare('INSERT INTO users (email) VALUES (?)').run(email);
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }
  return user;
}

export function setUserReferralCode(userId, referralCode) {
  db.prepare('UPDATE users SET referralCode = ? WHERE id = ?').run(referralCode, userId);
}

export function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function saveOTP(email, code, ttlSeconds = 600) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  db.prepare('DELETE FROM otps WHERE email = ?').run(email);
  db.prepare('INSERT INTO otps (email, code, expiresAt) VALUES (?, ?, ?)').run(email, code, expiresAt);
}

export function verifyOTP(email, code) {
  const row = db.prepare('SELECT * FROM otps WHERE email = ?').get(email);
  if (!row) return false;
  if (row.code !== code) return false;
  if (Date.now() > row.expiresAt) return false;
  db.prepare('DELETE FROM otps WHERE email = ?').run(email);
  return true;
}

export function createBooking({ id, userId, productId, category, mrp, bookingAmount, balance, transactionId, paymentProofUrl, referralCodeUsed, status }) {
  const createdAt = Date.now();
  db.prepare(`INSERT INTO bookings (id, userId, productId, category, mrp, bookingAmount, balance, transactionId, paymentProofUrl, referralCodeUsed, status, createdAt)
              VALUES (@id, @userId, @productId, @category, @mrp, @bookingAmount, @balance, @transactionId, @paymentProofUrl, @referralCodeUsed, @status, @createdAt)`).run({ id, userId, productId, category, mrp, bookingAmount, balance, transactionId, paymentProofUrl, referralCodeUsed, status, createdAt });
}

export function listAdminBookings(status) {
  const base = `SELECT b.*, u.email, u.name, u.phone, u.referralCode FROM bookings b JOIN users u ON b.userId = u.id`;
  if (status) return db.prepare(base + ' WHERE b.status = ? ORDER BY createdAt DESC').all(status);
  return db.prepare(base + ' ORDER BY createdAt DESC').all();
}

export function getBookingById(id) {
  return db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
}

export function updateBookingStatus(id, status) {
  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
}

export function markDelivered(id) {
  db.prepare('UPDATE bookings SET status = ?, deliveryFree = 1 WHERE id = ?').run('delivered', id);
}

export function referralProgressForUser(userId) {
  const user = getUserById(userId);
  if (!user?.referralCode) return { successful: 0, goal: 3, minBooking: 10000 };
  // Count confirmed bookings that used this user referral code
  const row = db.prepare('SELECT COUNT(1) as cnt FROM bookings WHERE referralCodeUsed = ? AND status = ?').get(user.referralCode, 'confirmed');
  return { successful: row?.cnt || 0, goal: 3, minBooking: 10000 };
}

export function eligibilityForUser(userId) {
  const prog = referralProgressForUser(userId);
  return { eligible: (prog.successful >= prog.goal), ...prog };
}

export function ensureUploadsDir() {
  const dir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}
