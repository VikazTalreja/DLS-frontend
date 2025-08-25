import jwt from 'jsonwebtoken';
import { getUserById } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export function signUserToken(user) {
  return jwt.sign({ sub: user.id, typ: 'user' }, JWT_SECRET, { expiresIn: '30d' });
}

export function signAdminToken() {
  return jwt.sign({ sub: 'admin', typ: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
}

export function verifyToken(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export function getAuthHeaderToken(headers) {
  const h = headers.get('authorization') || headers.get('Authorization');
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

export function requireUser(headers) {
  const token = getAuthHeaderToken(headers);
  const payload = token ? verifyToken(token) : null;
  if (!payload || payload.typ !== 'user') return null;
  const user = getUserById(payload.sub);
  return user || null;
}

export function requireAdmin(headers) {
  const token = getAuthHeaderToken(headers);
  const payload = token ? verifyToken(token) : null;
  if (payload && payload.typ === 'admin') return true;
  // Allow user token if matches ADMIN_EMAIL
  if (payload && payload.typ === 'user') {
    const user = getUserById(payload.sub);
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    if (user?.email && adminEmail && user.email.toLowerCase() === adminEmail) return true;
  }
  return false;
}
