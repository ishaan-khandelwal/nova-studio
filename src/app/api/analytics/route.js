import { NextResponse } from 'next/server';
import { logEvent } from '@/services/analyticsService';

export async function POST(req) {
  try {
    const body = await req.json();
    const { eventType, elementId, url } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const event = await logEvent({
      eventType,
      elementId,
      url,
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
