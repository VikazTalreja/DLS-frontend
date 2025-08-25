import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { saveFileFromBlob } from '@/lib/storage';
import { createBooking } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req) {
  const user = requireUser(req.headers);
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const form = await req.formData();
    const productId = form.get('productId') || '';
    const category = form.get('category') || '';
    const mrp = Number(form.get('mrp') || 0);
    const bookingAmount = Number(form.get('bookingAmount') || 0);
    const balance = Number(form.get('balance') || 0);
    const transactionId = form.get('transactionId') || '';
    const referrerCode = form.get('referrerCode') || '';
    const file = form.get('paymentProof');

    let paymentProofUrl = '';
    if (file && typeof file === 'object' && 'arrayBuffer' in file) {
      paymentProofUrl = await saveFileFromBlob(file, file.name || 'payment-proof.bin');
    }

    const id = `DLS-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    createBooking({
      id,
      userId: user.id,
      productId,
      category,
      mrp,
      bookingAmount,
      balance,
      transactionId,
      paymentProofUrl,
      referralCodeUsed: referrerCode || null,
      status: 'pending',
    });

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Failed to create booking' }, { status: 500 });
  }
}
