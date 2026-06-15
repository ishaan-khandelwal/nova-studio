import { NextResponse } from 'next/server';
import { deleteProject } from '@/services/projectService';
import { getUserFromRequest } from '@/lib/auth';

export async function DELETE(req, { params }) {
  try {
    const adminUser = getUserFromRequest(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await deleteProject(id);
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
