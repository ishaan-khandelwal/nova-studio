export function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return null;
    }

    const authValue = authHeader.split(' ')[1];
    const [username, password] = atob(authValue).split(':');
    
    const defaultUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === defaultUser && password === defaultPass) {
      return { username: defaultUser, role: 'admin' };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}
