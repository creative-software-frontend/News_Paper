import { getUser } from '../utils/auth';

export async function getUserInfo() {
  const user = getUser();
  const email = user?.email;

  const res = await fetch(
    `http://localhost:5000/user/${encodeURIComponent(email)}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}
