import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { referralProgressForUser } from '@/lib/db';

export async function GET(req) {
  const user = requireUser(req.headers);
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const data = referralProgressForUser(user.id);
  return NextResponse.json(data);
}
