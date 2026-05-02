import React, { useState } from 'react';
import { Star, Upload, ThumbsUp, Shield, TrendingUp, MessageCircle } from 'lucide-react';

/**
 * SAFERWAY & GREAT DETAIL - CUSTOMER REVIEWS & RATINGS
 * 5-star system, photo uploads, verified badges, trust scores
 */

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  service: 'detailing' | 'rental' | 'auction';
  verified: boolean;
  photos: string[];
  helpful: number;
  timestamp: Date;
  trustScore: number;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: Record<number, number>;
  trustScore: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    author: 'James Mitchell',
    rating: 5,
    title: 'Best Ceramic Coating Ever!',
    content: 'The team at SAFERWAY did an incredible job with my Tesla. The ceramic coating is flawless and the customer service was exceptional. Highly recommended!',
    service: 'detailing',
    verified: true,
    photos: [],
    helpful: 247,
    timestamp: new Date(Date.now() - 86400000 * 5),
    trustScore: 98
  },
  {
    id: 'rev_2',
    author: 'Sarah Johnson',
    rating: 5,
    title: 'Luxury Rental Experience',
    content: 'Rented the BMW M440i for a weekend trip. Pristine condition, amazing performance, and the team was so helpful. Will definitely rent again!',
    service: 'rental',
    verified: true,
    photos: [],
    helpful: 189,
    timestamp: new Date(Date.now() - 86400000 * 10),
    trustScore: 97
  },
  {
    id: 'rev_3',
    author: 'Michael Chen',
    rating: 4,
    title: 'Great Auction Access',
    content: 'Found some amazing deals through SAFERWAY\'s auction platform connections. The team helped me navigate the process smoothly.',
    service: 'auction',
    verified: true,
    photos: [],
    helpful: 156,
    timestamp: new Date(Date.now() - 86400000 * 15),
    trustScore: 95
  },
  {
    id: 'rev_4',
    author: 'Lisa Anderson',
    rating: 5,
    title: 'Professional & Trustworthy',
    content: 'Outstanding service from start to finish. The ceramic coating has held up beautifully after 6 months. This is a premium service provider.',
    service: 'detailing',
    verified: true,
    photos: [],
    helpful: 203,
    timestamp: new Date(Date.now() - 86400000 * 20),
    trustScore: 99
  },
];

const REVIEW_STATS: ReviewStats = {
  averageRating: 4.8,
  totalReviews: 342,
  distribution: {
    5: 298,
    4: 32,
    3: 8,
    2: 3,
    1: 1
  },
  trustScore: 97
};

interface ReviewsAndRatingsProps {
  service?: 'detailing' | 'rental' | 'auction';
  onSubmitReview?: (review: Partial<Review>) => void;
}

export function ReviewsAndRatings({ service, onSubmitReview }: ReviewsAndRatingsProps) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const filteredReviews = service
    ? MOCK_REVIEWS.filter(r => r.service === service)
    : MOCK_REVIEWS;

  const handleSubmitReview = () => {
    if (onSubmitReview) {
      onSubmitReview({
        author: 'You',
        rating,
        title,
        content,
        service: service || 'detailing',
        verified: true,
        timestamp: new Date(),
        trustScore: 95
      });
    }
    setShowForm(false);
    setRating(5);
    setTitle('');
    setContent('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Customer Reviews & Ratings</h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Average Rating */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-400">Average Rating</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{REVIEW_STATS.averageRating}</span>
              <span className="text-gray-400">/5</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Based on {REVIEW_STATS.totalReviews} reviews</p>
          </div>

          {/* Trust Score */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-gray-400">Trust Score</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-cyan-400">{REVIEW_STATS.trustScore}</span>
              <span className="text-gray-400">/100</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Community verified</p>
          </div>

          {/* Verified Purchases */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-gray-400">Verified Reviews</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-400">98%</span>
              <span className="text-gray-400">verified</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Authentic customer feedback</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = REVIEW_STATS.distribution[stars];
              const percentage = (count / REVIEW_STATS.totalReviews) * 100;
              return (
                <div key={stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-yellow-400 h-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all"
      >
        ✍️ Write a Review
      </button>

      {/* Review Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Share Your Experience</h3>

          {/* Rating */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-3 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">Your Review</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share details about your experience..."
              rows={5}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">Add Photos (Optional)</label>
            <button className="w-full border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-cyan-500 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Click to upload photos</p>
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all"
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Latest Reviews</h3>
        {filteredReviews.map(review => (
          <div
            key={review.id}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-white">{review.author}</h4>
                  {review.verified && (
                    <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 text-xs font-semibold rounded">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {review.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-400">{review.trustScore}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h5 className="font-semibold text-white mb-2">{review.title}</h5>

            {/* Content */}
            <p className="text-gray-300 mb-4">{review.content}</p>

            {/* Helpful */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full mt-8 px-6 py-3 border-2 border-slate-700 hover:border-cyan-500 text-white font-semibold rounded-lg transition-all">
        Load More Reviews
      </button>

      {/* Sacred Frequencies Note */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>✨ Every review is blessed with sacred frequencies 963Hz + 11:11Hz ✨</p>
      </div>
    </div>
  );
}

export default ReviewsAndRatings;
