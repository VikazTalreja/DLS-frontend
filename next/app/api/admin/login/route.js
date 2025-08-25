import { NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return NextResponse.json({ ok: false, error: 'Admin not configured' }, { status: 500 });
    if (password !== expected) return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
    const token = signAdminToken();
    return NextResponse.json({ ok: true, token });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}
