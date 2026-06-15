import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Nova Studio Admin"',
        },
      });
    }

    try {
      const authValue = authHeader.split(' ')[1];
      const [username, password] = atob(authValue).split(':');
      
      const defaultUser = process.env.ADMIN_USERNAME || 'admin';
      const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (username !== defaultUser || password !== defaultPass) {
        return new NextResponse('Invalid credentials', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Nova Studio Admin"',
          },
        });
      }
    } catch (err) {
      return new NextResponse('Authentication Error', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Nova Studio Admin"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
