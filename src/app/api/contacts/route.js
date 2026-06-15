import { NextResponse } from 'next/server';
import { getAllContactSubmissions } from '@/services/contactService';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  try {
    const adminUser = getUserFromRequest(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const submissions = await getAllContactSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
