import prisma from '../lib/prisma';

export async function getAllProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching projects from database:', error.message);
    return [
      {
        id: 'fallback-1',
        title: 'Zenith UI Design System',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        description: 'A comprehensive visual language and library built for scale.',
        createdAt: new Date(),
      },
      {
        id: 'fallback-2',
        title: 'Apex E-Commerce Engine',
        category: 'Front-End Development',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        description: 'A high-performance modern store developed with Next.js.',
        createdAt: new Date(),
      },
      {
        id: 'fallback-3',
        title: 'Nova Startup Brand Identity',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
        description: 'Complete brand strategies, logo designs, and asset packages.',
        createdAt: new Date(),
      },
    ];
  }
}

export async function createProject(data) {
  try {
    return await prisma.project.create({
      data: {
        title: data.title,
        category: data.category,
        image: data.image,
        description: data.description,
      },
    });
  } catch (error) {
    console.error('Error creating project in database:', error.message);
    throw new Error('Database connection failed. Could not add project.');
  }
}

export async function deleteProject(id) {
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting project from database:', error.message);
    throw new Error('Database connection failed. Could not delete project.');
  }
}
