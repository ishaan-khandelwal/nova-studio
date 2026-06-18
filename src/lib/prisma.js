import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';
import fs from 'fs';

let prisma;

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Resolve relative SQLite paths against cwd, but keep absolute paths as-is.
function resolveDbUrl(url) {
  if (!url.startsWith('file:')) return url; // libsql:// or other remote URLs
  const filePart = url.slice(5); // strip 'file:'
  if (path.isAbsolute(filePart)) return url; // already absolute, e.g. file:/tmp/dev.db
  return `file:${path.resolve(process.cwd(), filePart)}`;
}

let resolvedUrl = resolveDbUrl(dbUrl);

// Vercel serverless functions run on a read-only filesystem except /tmp.
// If we are on Vercel and using a file database, copy the template database to /tmp
// and connect to that writeable copy.
if (process.env.VERCEL === '1' && resolvedUrl.startsWith('file:')) {
  const tmpDbPath = '/tmp/dev.db';
  const newUrl = `file:${tmpDbPath}`;
  
  if (!fs.existsSync(tmpDbPath)) {
    try {
      const srcPath = path.resolve(resolvedUrl.slice(5));
      if (fs.existsSync(srcPath)) {
        console.log(`Vercel environment detected. Copying read-only database from ${srcPath} to ${tmpDbPath}`);
        fs.copyFileSync(srcPath, tmpDbPath);
        console.log('Database successfully copied to writeable location.');
      } else {
        console.warn(`Source database not found at ${srcPath}. An empty database will be created.`);
      }
    } catch (err) {
      console.error('Failed to copy database to /tmp/dev.db:', err);
    }
  }
  resolvedUrl = newUrl;
}

const adapterOptions = { url: resolvedUrl };
if (process.env.TURSO_AUTH_TOKEN) {
  adapterOptions.authToken = process.env.TURSO_AUTH_TOKEN;
}

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaLibSql(adapterOptions);
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    const adapter = new PrismaLibSql(adapterOptions);
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
