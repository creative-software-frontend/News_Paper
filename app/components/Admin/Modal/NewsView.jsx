'use client';

import React, { useEffect } from 'react';

const NewsModal = ({ isOpen, onClose, news }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = e => {
      if (e.keyCode === 27) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-white/30 bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-transform duration-300 scale-95 hover:scale-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">{news?.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Image */}
        {news?.image && (
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={
                news.image.startsWith('http')
                  ? news.image
                  : `${process.env.NEXT_PUBLIC_ROOT_URL}${news.image}`
              }
              alt={news?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[40vh]">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {news?.publish && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(news?.publish).toLocaleDateString('bn-BD', {
                  weekday: 'long', // রোববার
                  year: 'numeric', // ২০২৫
                  month: 'long', // আগস্ট
                  day: 'numeric', // ৩১
                })}
              </div>
            )}

            {news?.category && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                {news.category}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {news?.description}
            </p>
          </div>

          {/* Additional Info */}
          {(news?.author || news?.source) && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {news?.author && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    By {news.author}
                  </div>
                )}
                {news?.source && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Source: {news.source}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
