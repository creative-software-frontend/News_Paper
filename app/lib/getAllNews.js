export async function getAllNews() {
  const res = await fetch(`http://localhost:5000/all-news`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}
