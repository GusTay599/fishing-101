// Forum Page - Community discussion board
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_BASE } from '../config/api';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  post_count: number;
}

interface ForumPost {
  id: string;
  user_id: string;
  category: string;
  title: string;
  body: string;
  pinned: number;
  locked: number;
  warning: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  author_name: string;
  comment_count: number;
  like_count: number;
}

interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
  author_name: string;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ForumPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // View state: 'list' or 'post'
  const [viewPostId, setViewPostId] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [liked, setLiked] = useState(false);

  // New post form
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Comment form
  const [commentBody, setCommentBody] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/forum/categories`);
      const data = await res.json();
      if (data.success) setCategories(data.data.categories);
    } catch (e) { console.error(e); }
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.set('category', selectedCategory);
      if (search) params.set('search', search);
      params.set('page', String(page));
      params.set('limit', '15');

      const res = await fetch(`${API_BASE}/forum/posts?${params}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data.data);
        setTotalPages(data.data.total_pages);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [selectedCategory, search, page]);

  const fetchPost = useCallback(async (postId: string) => {
    try {
      const params = new URLSearchParams();
      if (user) params.set('userId', user.id);
      const res = await fetch(`${API_BASE}/forum/posts/${postId}?${params}`);
      const data = await res.json();
      if (data.success) {
        setCurrentPost(data.data.post);
        setComments(data.data.comments);
        setLiked(data.data.liked);
      }
    } catch (e) { console.error(e); }
  }, [user]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { if (viewPostId) fetchPost(viewPostId); }, [viewPostId, fetchPost]);

  const handleCreatePost = async () => {
    if (!user || !newPostTitle.trim() || !newPostBody.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/forum/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          category: newPostCategory,
          title: newPostTitle.trim(),
          body: newPostBody.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewPost(false);
        setNewPostTitle('');
        setNewPostBody('');
        fetchPosts();
        fetchCategories();
        // Open the new post
        setViewPostId(data.data.post.id);
      } else {
        alert(data.error || 'Failed to create post');
      }
    } catch (e) { console.error(e); }
    setSubmitting(false);
  };

  const handleAddComment = async () => {
    if (!user || !viewPostId || !commentBody.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`${API_BASE}/forum/posts/${viewPostId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, body: commentBody.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(data.data.comments);
        setCommentBody('');
        fetchPosts(); // refresh comment count
      } else {
        alert(data.error || 'Failed to add comment');
      }
    } catch (e) { console.error(e); }
    setSubmittingComment(false);
  };

  const handleDeletePost = async (postId: string) => {
    if (!user || !confirm('Delete this post?')) return;
    try {
      await fetch(`${API_BASE}/forum/posts/${postId}?userId=${user.id}`, { method: 'DELETE' });
      setViewPostId(null);
      setCurrentPost(null);
      fetchPosts();
      fetchCategories();
    } catch (e) { console.error(e); }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user || !confirm('Delete this comment?')) return;
    try {
      const res = await fetch(`${API_BASE}/forum/comments/${commentId}?userId=${user.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success && viewPostId) fetchPost(viewPostId);
    } catch (e) { console.error(e); }
  };

  const handleLike = async (postId?: string, commentId?: string) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_BASE}/forum/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, postId, commentId }),
      });
      const data = await res.json();
      if (data.success) {
        if (postId) {
          setLiked(data.data.liked);
          if (currentPost) {
            setCurrentPost({
              ...currentPost,
              like_count: currentPost.like_count + (data.data.liked ? 1 : -1),
            });
          }
        }
      }
    } catch (e) { console.error(e); }
  };

  // Admin handlers
  const handleWarn = async (postId: string) => {
    if (!user || user.role !== 'admin' && user.role !== 'owner') return;
    const warning = prompt('Enter warning message (leave empty to remove warning):');
    if (warning === null) return;
    try {
      await fetch(`${API_BASE}/forum/posts/${postId}/warn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, warning: warning || null }),
      });
      if (currentPost && currentPost.id === postId) {
        setCurrentPost({ ...currentPost, warning: warning || null });
      }
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const handlePin = async (postId: string, pinned: boolean) => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) return;
    try {
      await fetch(`${API_BASE}/forum/posts/${postId}/pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, pinned }),
      });
      if (currentPost && currentPost.id === postId) {
        setCurrentPost({ ...currentPost, pinned: pinned ? 1 : 0 });
      }
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const handleLock = async (postId: string, locked: boolean) => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) return;
    try {
      await fetch(`${API_BASE}/forum/posts/${postId}/lock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, locked }),
      });
      if (currentPost && currentPost.id === postId) {
        setCurrentPost({ ...currentPost, locked: locked ? 1 : 0 });
      }
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'owner';

  const getCategoryInfo = (catId: string) => categories.find(c => c.id === catId);

  // --- Post detail view ---
  if (viewPostId && currentPost) {
    const cat = getCategoryInfo(currentPost.category);
    return (
      <div className="page-content-inner">
        <button
          onClick={() => { setViewPostId(null); setCurrentPost(null); }}
          className="btn btn-ghost mb-4 text-sm"
        >
          ← Back to Forum
        </button>

        <div className="bg-bg-card rounded-xl shadow border border-border overflow-hidden">
          {/* Warning banner */}
          {currentPost.warning && (
            <div className="bg-warning border-b border-warning px-6 py-3 flex items-center gap-2" style={{ backgroundColor: '#fef3c7', borderColor: '#fde68a' }}>
              <span className="text-lg">⚠️</span>
              <span className="text-sm font-medium" style={{ color: '#92400e' }}>{currentPost.warning}</span>
            </div>
          )}

          {/* Post header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {cat && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: cat.color }}>
                    {cat.icon} {cat.name}
                  </span>
                )}
                {currentPost.pinned ? (
                  <span className="text-xs font-medium text-accent">📌 Pinned</span>
                ) : null}
                {currentPost.locked ? (
                  <span className="text-xs font-medium text-text-muted">🔒 Locked</span>
                ) : null}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Admin controls */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleWarn(currentPost.id)}
                      className="text-xs text-warning hover:underline"
                      title={currentPost.warning ? 'Edit/remove warning' : 'Add warning'}
                    >
                      {currentPost.warning ? '⚠️ Edit Warning' : '⚠️ Warn'}
                    </button>
                    <button
                      onClick={() => handlePin(currentPost.id, !currentPost.pinned)}
                      className="text-xs text-accent hover:underline"
                    >
                      {currentPost.pinned ? '📌 Unpin' : '📌 Pin'}
                    </button>
                    <button
                      onClick={() => handleLock(currentPost.id, !currentPost.locked)}
                      className="text-xs text-text-muted hover:underline"
                    >
                      {currentPost.locked ? '🔓 Unlock' : '🔒 Lock'}
                    </button>
                  </>
                )}
                {/* Owner or admin delete */}
                {(user && (user.id === currentPost.user_id || isAdmin)) && (
                  <button
                    onClick={() => handleDeletePost(currentPost.id)}
                    className="text-xs text-danger hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text mb-3">{currentPost.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="font-medium text-text">{currentPost.author_name}</span>
              <span>{timeAgo(currentPost.created_at)}</span>
              <span>{currentPost.views} views</span>
              <span>{currentPost.comment_count} replies</span>
            </div>
          </div>

          {/* Post body */}
          <div className="p-6">
            <div className="text-text whitespace-pre-wrap leading-relaxed">{currentPost.body}</div>

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-4">
              <button
                onClick={() => handleLike(currentPost.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  liked ? 'bg-primary-light text-primary' : 'bg-bg hover:bg-bg-hover text-text-secondary'
                } border border-border`}
              >
                {liked ? '❤️' : '🤍'} {currentPost.like_count}
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-text mb-4">{comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}</h3>

          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="bg-bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-text text-sm">{comment.author_name}</span>
                    <span className="text-xs text-text-muted">{timeAgo(comment.created_at)}</span>
                  </div>
                  {user && user.id === comment.user_id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs text-danger hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-text text-sm whitespace-pre-wrap">{comment.body}</p>
              </div>
            ))}
          </div>

          {/* Add comment */}
          {user ? (
            <div className="mt-6 bg-bg-card rounded-lg border border-border p-4">
              <h4 className="text-sm font-semibold text-text mb-3">Add a Reply</h4>
              <textarea
                value={commentBody}
                onChange={e => setCommentBody(e.target.value)}
                className="input textarea w-full"
                rows={3}
                placeholder="Share your thoughts..."
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleAddComment}
                  disabled={!commentBody.trim() || submittingComment}
                  className="btn btn-primary btn-sm"
                >
                  {submittingComment ? 'Posting...' : 'Post Reply'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-bg-card rounded-lg border border-border p-6 text-center">
              <p className="text-text-secondary mb-3">Sign in to join the conversation</p>
              <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- List view ---
  return (
    <div className="page-content-inner">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Community Forum</h1>
          <p className="text-text-secondary">Ask questions, share experiences, and connect with fellow anglers</p>
        </div>
        {user ? (
          <button onClick={() => setShowNewPost(!showNewPost)} className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Post
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">Sign In to Post</Link>
        )}
      </div>

      {/* New post form */}
      {showNewPost && user && (
        <div className="bg-bg-card rounded-xl shadow border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-text mb-4">Create a New Post</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Category</label>
              <select
                value={newPostCategory}
                onChange={e => setNewPostCategory(e.target.value)}
                className="input select"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={newPostTitle}
                onChange={e => setNewPostTitle(e.target.value)}
                className="input"
                placeholder="What's your question or topic?"
                maxLength={200}
              />
              <p className="text-xs text-text-muted mt-1">{newPostTitle.length}/200</p>
            </div>
            <div>
              <label className="label">Body</label>
              <textarea
                value={newPostBody}
                onChange={e => setNewPostBody(e.target.value)}
                className="input textarea"
                rows={6}
                placeholder="Describe your question, share your experience, or start a discussion..."
                maxLength={10000}
              />
              <p className="text-xs text-text-muted mt-1">{newPostBody.length}/10000</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowNewPost(false)} className="btn btn-ghost">Cancel</button>
              <button
                onClick={handleCreatePost}
                disabled={!newPostTitle.trim() || !newPostBody.trim() || submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Posting...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => { setSelectedCategory(null); setPage(1); }}
          className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            selectedCategory === null
              ? 'bg-primary text-white border-primary'
              : 'bg-bg-card text-text-secondary hover:text-text border-border hover:border-primary/30'
          }`}
        >
          All Topics
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              selectedCategory === cat.id
                ? 'text-white border-transparent'
                : 'bg-bg-card text-text-secondary hover:text-text border-border'
            }`}
            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
          >
            {cat.icon} {cat.name}
            <span className="ml-1.5 text-xs opacity-75">({cat.post_count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input w-full"
          placeholder="Search posts..."
        />
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="text-center py-12 text-text-secondary">
          <div className="spinner-lg mx-auto mb-3" />
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-lg mb-2">No posts yet</p>
          <p className="text-sm">Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => {
            const cat = getCategoryInfo(post.category);
            return (
              <button
                key={post.id}
                onClick={() => setViewPostId(post.id)}
                className="w-full text-left bg-bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all hover:border-primary/30 group"
              >
                <div className="flex items-start gap-4">
                  {/* Like count */}
                  <div className="flex-shrink-0 text-center min-w-[40px]">
                    <div className="text-lg font-bold text-text">{post.like_count}</div>
                    <div className="text-xs text-text-muted">♥</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {cat && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: cat.color }}>
                          {cat.icon} {cat.name}
                        </span>
                      )}
                      {post.pinned ? <span className="text-xs text-accent">📌</span> : null}
                      {post.locked ? <span className="text-xs text-text-muted">🔒</span> : null}
                      {post.warning ? <span className="text-xs text-warning" title={post.warning}>⚠️</span> : null}
                    </div>
                    <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-1 mb-2">{post.body}</p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="font-medium text-text-secondary">{post.author_name}</span>
                      <span>{timeAgo(post.created_at)}</span>
                      <span>{post.views} views</span>
                      <span>{post.comment_count} {post.comment_count === 1 ? 'reply' : 'replies'}</span>
                    </div>
                  </div>

                  {/* Comment count badge */}
                  <div className="flex-shrink-0 bg-primary-light text-primary rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                    {post.comment_count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-ghost btn-sm"
          >
            ← Previous
          </button>
          <span className="text-sm text-text-secondary">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-ghost btn-sm"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
