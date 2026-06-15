import prisma from '../lib/prisma';

export async function getStats() {
  try {
    const dbStats = await prisma.stat.findMany();
    if (dbStats && dbStats.length > 0) {
      return dbStats;
    }
  } catch (error) {
    console.error('Error fetching stats from database:', error.message);
  }
  
  return [
    { key: 'projects', label: 'Projects Completed', value: 150, suffix: '+' },
    { key: 'clients', label: 'Clients Worldwide', value: 50, suffix: '+' },
    { key: 'experience', label: 'Years Experience', value: 5, suffix: '' },
  ];
}
