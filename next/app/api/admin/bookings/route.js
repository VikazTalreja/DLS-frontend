import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { listAdminBookings } from '@/lib/db';

export async function GET(req) {
  const isAdmin = requireAdmin(req.headers);
  if (!isAdmin) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const items = listAdminBookings(status);
  return NextResponse.json(items);
}
