export async function getHeadline() {
  const res = await fetch(`http://localhost:5000/get-headline`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}
