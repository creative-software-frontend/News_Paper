export async function getNews(category) {
  const res = await fetch(`http://localhost:5000/news?category=${category}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}
