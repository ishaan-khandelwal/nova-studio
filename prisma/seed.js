require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const resolvedUrl = dbUrl.startsWith('file:')
  ? `file:${path.resolve(process.cwd(), dbUrl.replace('file:', ''))}`
  : dbUrl;

const adapter = new PrismaLibSql({ url: resolvedUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seeding...');


  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
      },
    });
    console.log(`Admin user created: ${adminUsername}`);
  } else {
    console.log('Admin user already exists');
  }

  const stats = [
    { key: 'projects', label: 'Projects Completed', value: 150, suffix: '+' },
    { key: 'clients', label: 'Clients Worldwide', value: 50, suffix: '+' },
    { key: 'experience', label: 'Years Experience', value: 5, suffix: '' },
  ];

  for (const s of stats) {
    await prisma.stat.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log('Stats seeded');

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        title: 'Zenith UI Design System',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        description: 'A comprehensive visual language and library built for scale.',
      },
      {
        title: 'Apex E-Commerce Engine',
        category: 'Front-End Development',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        description: 'A high-performance modern store developed with Next.js.',
      },
      {
        title: 'Nova Startup Brand Identity',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
        description: 'Complete brand strategies, logo designs, and asset packages.',
      },
    ];

    for (const p of projects) {
      await prisma.project.create({ data: p });
    }
    console.log('Projects seeded');
  } else {
    console.log('Projects already exist');
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
