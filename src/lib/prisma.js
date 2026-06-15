import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

let prisma;

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const resolvedUrl = dbUrl.startsWith('file:') 
  ? `file:${path.resolve(process.cwd(), dbUrl.replace('file:', ''))}`
  : dbUrl;

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaLibSql({ url: resolvedUrl });
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    const adapter = new PrismaLibSql({ url: resolvedUrl });
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

export default prisma;
