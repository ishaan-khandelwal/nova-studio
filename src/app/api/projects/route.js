import { NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/services/projectService';
import { getUserFromRequest } from '@/lib/auth';
import { validateProjectForm } from '@/lib/validations';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const adminUser = getUserFromRequest(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const body = await req.json();
    const { isValid, errors } = validateProjectForm(body);

    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newProject = await createProject(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
