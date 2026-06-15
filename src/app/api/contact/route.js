import { NextResponse } from 'next/server';
import { createContactSubmission } from '@/services/contactService';
import { validateContactForm } from '@/lib/validations';

export async function POST(req) {
  try {
    const body = await req.json();
    const { isValid, errors } = validateContactForm(body);

    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newSubmission = await createContactSubmission(body);
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
