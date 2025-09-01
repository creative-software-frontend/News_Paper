export async function getSearchNews(value) {
  const res = await fetch(`http://localhost:5000/search-news?search=${value}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}
