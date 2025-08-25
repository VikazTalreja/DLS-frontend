import { ensureUploadsDir } from './db';
import path from 'path';
import fs from 'fs';

export async function saveFileFromBlob(blob, filenameHint = 'upload.bin') {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploads = ensureUploadsDir();
  const safe = filenameHint.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const name = `${Date.now()}_${Math.random().toString(36).slice(2,8)}_${safe}`;
  const dest = path.join(uploads, name);
  fs.writeFileSync(dest, buffer);
  return `/uploads/${name}`;
}
