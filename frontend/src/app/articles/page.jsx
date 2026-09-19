'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Sparkles,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchArticles, fetchArticleCategories } from '../../lib/api';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [artRes, catRes] = await Promise.all([
        fetchArticles(),
        fetchArticleCategories()
      ]);
      setArticles(artRes.data || []);
      setCategories(catRes.data || ['All']);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || art.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-sky-700 to-indigo-800 text-white p-8 md:p-12 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-teal-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doctor-Verified Medical Knowledgebase</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Health Articles & Preventative Guides
            </h1>
            <p className="text-teal-100 text-sm md:text-base leading-relaxed">
              Read authoritative health guides written and reviewed by leading physicians in Bangladesh. Practical advice on Dengue management, diabetes nutrition, hypertension, and family wellness.
            </p>

            {/* Search Input */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by topic (e.g. Dengue, Diabetes, Heart attack)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800/50 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No medical articles found</h3>
            <p className="text-sm text-slate-500 mt-1">Try searching for other topics or reset the category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{art.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{art.publishedDate}</span>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                      {art.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {art.summary}
                    </p>

                    {/* Author Badge */}
                    <div className="flex items-center space-x-2 pt-2 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{art.author}</span>
                      <span className="text-slate-400">({art.authorTitle})</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Medically Reviewed</span>
                  <button
                    onClick={() => setActiveArticle(art)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Article Reader Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8 space-y-6 relative"
              >
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-3">
                  <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-full">
                    {activeArticle.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 font-semibold">
                      <User className="w-4 h-4 text-teal-600" />
                      <span>{activeArticle.author} ({activeArticle.authorTitle})</span>
                    </span>
                    <span>•</span>
                    <span>{activeArticle.publishedDate}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                {/* Key Takeaways Box */}
                {activeArticle.keyTakeaways && (
                  <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-2.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                      Key Clinical Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-teal-950 dark:text-teal-100">
                      {activeArticle.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Main Text */}
                <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeArticle.content}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>Reviewed for medical precision.</span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl"
                  >
                    Close Guide
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
