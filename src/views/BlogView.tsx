import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Share2,
  Sparkles
} from 'lucide-react';
import { BlogPost, Language } from '../types';
import { BLOG_POSTS } from '../data/blogsData';

interface BlogViewProps {
  currentLanguage: Language;
}

export const BlogView: React.FC<BlogViewProps> = ({ currentLanguage }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [trendingIndex, setTrendingIndex] = useState<number>(0);

  const trendingPosts = BLOG_POSTS.slice(0, 3);
  const currentTrending = trendingPosts[trendingIndex] || trendingPosts[0] || BLOG_POSTS[0];

  return (
    <div className="bg-[#FBF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1A2F] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>DISPATCHES & FIELD CHRONICLES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#0F1A2F]">
            The Caravan Gazette
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-serif">
            Scholarly essays, naturalist field notes, and insider cultural guides across Bengal, Darjeeling, and the Eastern Himalayas.
          </p>
        </div>

        {/* Trending Article Carousel */}
        <div className="bg-[#0F1A2F] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] bg-black">
              <img
                src={currentTrending.image}
                alt={currentTrending.title}
                className="w-full h-full object-cover animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2F] via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#C45C4A] text-white">
                  Trending Dispatch
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#D4AF37] font-mono mb-2">
                  <span>{currentTrending.category.toUpperCase()}</span>
                  <span>•</span>
                  <span>{currentTrending.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white leading-snug">
                  {currentTrending.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed font-serif">
                  {currentTrending.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTrendingIndex((prev) => (prev === 0 ? trendingPosts.length - 1 : prev - 1))}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] flex items-center justify-center transition-colors text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTrendingIndex((prev) => (prev + 1) % trendingPosts.length)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F1A2F] flex items-center justify-center transition-colors text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedPost(currentTrending)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C45C4A] text-[#0F1A2F] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all"
                >
                  Read Full Chronicle
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* All Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2DBD0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-[#0F1A2F]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#0F1A2F]/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C45C4A]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-editorial text-[#0F1A2F] group-hover:text-[#C45C4A] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-serif">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E2DBD0] mt-4 pt-4 text-xs font-bold text-[#0F1A2F]">
                <span>By {post.author}</span>
                <span className="flex items-center gap-1 text-[#C45C4A] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reading Lightbox Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1A2F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E2DBD0] overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-[#0F1A2F] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30 flex-shrink-0">
              <span className="text-xs font-mono text-[#D4AF37] uppercase">
                {selectedPost.category} • {selectedPost.readTime}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#0F1A2F]">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 pb-4 border-b border-gray-200">
                  <span>By <strong className="text-[#0F1A2F]">{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>Published on {selectedPost.date}</span>
                </div>
              </div>

              <div className="space-y-4 text-gray-800 text-sm sm:text-base font-serif leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-[#FBF8F3] border border-[#E2DBD0] text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
