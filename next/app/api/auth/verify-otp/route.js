import { NextResponse } from 'next/server';
import { upsertUserByEmail, verifyOTP, setUserReferralCode } from '@/lib/db';
import { signUserToken } from '@/lib/auth';

function makeReferral() {
  return 'DLS-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ ok: false, error: 'Missing email/code' }, { status: 400 });
    const ok = verifyOTP(email, code);
    if (!ok) return NextResponse.json({ ok: false, error: 'Invalid or expired OTP' }, { status: 401 });

    const user = upsertUserByEmail(email);
    if (!user.referralCode) {
      setUserReferralCode(user.id, makeReferral());
    }
    const refreshed = upsertUserByEmail(email);
    const token = signUserToken(refreshed);
    return NextResponse.json({ ok: true, token, user: { id: refreshed.id, email: refreshed.email, referralCode: refreshed.referralCode } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
