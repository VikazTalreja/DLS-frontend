import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getBookingById, updateBookingStatus } from '@/lib/db';

export async function POST(req, { params }) {
  const isAdmin = requireAdmin(req.headers);
  if (!isAdmin) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const id = params?.id;
  const b = getBookingById(id);
  if (!b) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  updateBookingStatus(id, 'confirmed');
  return NextResponse.json({ ok: true });
}
