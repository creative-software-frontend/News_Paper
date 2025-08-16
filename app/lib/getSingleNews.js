export async function getSingleNews(id) {
  const res = await fetch(`http://localhost:5000/single-news/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}
