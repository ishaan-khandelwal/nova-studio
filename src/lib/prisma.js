import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

let prisma;

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Resolve relative SQLite paths against cwd, but keep absolute paths as-is.
function resolveDbUrl(url) {
  if (!url.startsWith('file:')) return url; // libsql:// or other remote URLs
  const filePart = url.slice(5); // strip 'file:'
  if (path.isAbsolute(filePart)) return url; // already absolute, e.g. file:/tmp/dev.db
  return `file:${path.resolve(process.cwd(), filePart)}`;
}

const resolvedUrl = resolveDbUrl(dbUrl);

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
