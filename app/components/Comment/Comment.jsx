'use client';
import { getUserInfo } from '@/app/lib/getUserInfo';
import { formatDistanceToNowStrict } from 'date-fns';
import { bn } from 'date-fns/locale';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Comment = ({ singleNews }) => {
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const newsId = singleNews?.id;

  // 1️⃣ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user info');
      }
    };
    fetchUser();
  }, []);

  // 2️⃣ Fetch comments
  const fetchComments = async () => {
    if (!newsId) return;
    try {
      const res = await fetch(`http://localhost:5000/comments/${newsId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
      toast.error('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  // 3️⃣ Post comment
  const handlePost = async () => {
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    const commentData = {
      news_id: newsId,
      comment,
      email: user?.email,
      name: user?.name,
      image: user?.image,
      role: user?.role,
    };

    try {
      const res = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Comment posted successfully');
        setComment(''); // clear textarea
        fetchComments(); // ✅ Refetch comments for real-time effect
      } else {
        toast.error(data.message || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    }
  };

  return (
    <div className="mt-8 bg-white border border-gray-100 p-6 md:p-8">
      <h3 className="font-bold text-xl mb-6 text-gray-900">
        Comments ({comments?.length || 0})
      </h3>

      <div className="space-y-6">
        {/* Existing comments */}
        {comments?.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_ROOT_URL}${item.image}`}
                alt={item.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNowStrict(new Date(item?.created_at), {
                      locale: bn,
                      addSuffix: true,
                      roundingMethod: 'floor',
                    })}
                  </span>
                </div>
                <p className="text-gray-700">{item.comment}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Add new comment */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-4">Add a comment</h4>
          <textarea
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Share your thoughts..."
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Maximum 500 characters</div>
            <button
              type="button"
              onClick={handlePost}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
