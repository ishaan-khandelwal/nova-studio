import prisma from '../lib/prisma';

export async function createContactSubmission(data) {
  try {
    return await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
  } catch (error) {
    console.error('Error saving contact submission to database:', error.message);
    throw new Error('Database connection failed. Contact inquiry could not be saved.');
  }
}

export async function getAllContactSubmissions() {
  try {
    return await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching contact submissions from database:', error.message);
    return [];
  }
}
