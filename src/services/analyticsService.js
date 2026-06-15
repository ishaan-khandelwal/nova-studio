import prisma from '../lib/prisma';

const localLogs = [];

export async function logEvent(data) {
  try {
    const event = await prisma.analyticsEvent.create({
      data: {
        eventType: data.eventType,
        elementId: data.elementId,
        url: data.url,
        ip: data.ip,
        userAgent: data.userAgent,
      },
    });
    return event;
  } catch (error) {
    console.error('Failed to log event to PostgreSQL:', error.message);
  }
  
  const fallbackEvent = {
    id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...data,
    timestamp: new Date(),
  };
  localLogs.push(fallbackEvent);
  return fallbackEvent;
}

export async function getEvents() {
  try {
    return await prisma.analyticsEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  } catch (error) {
    console.error('Failed to fetch events from PostgreSQL:', error.message);
  }
  return localLogs.slice().reverse();
}
