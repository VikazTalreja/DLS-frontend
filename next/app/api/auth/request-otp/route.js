import { NextResponse } from 'next/server';
import { saveOTP, upsertUserByEmail } from '@/lib/db';
import { sendOTPEmail } from '@/lib/mailer';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }
    // Ensure user exists (optional but nice)
    upsertUserByEmail(email);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    saveOTP(email, code, 600);
    await sendOTPEmail(email, code);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Failed to send OTP' }, { status: 500 });
  }
}
