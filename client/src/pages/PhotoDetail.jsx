import { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';

function PhotoDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/api/photos/${id}`).then((res) => {
        if (!res.ok) throw new Error('Photo not found');
        return res.json();
      }),
      fetch(`/api/photos/${id}/comments`).then((res) => res.json()),
    ])
      .then(([photoData, commentsData]) => {
        setPhoto(photoData);
        setComments(commentsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/photos/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, comment: newComment }),
      });

      if (!res.ok) throw new Error('Failed to add comment');

      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm('Delete this photo?')) return;

    try {
      const res = await fetch('/api/photos/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
      }

      navigate('/gallery');
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!photo) return null;

  return (
    <main className="photo-detail">
      <h2>{photo.title}</h2>
    {user && photo.userId === user._id && (
        <button onClick={handleDelete} style={{ background: '#b00020', marginBottom: '12px' }}>
          Delete photo
        </button>
      )}
      {photo.description && <p>{photo.description}</p>}
      <p className="meta">{new Date(photo.dateTime).toLocaleString()}</p>

      <section className="comments">
        <h3>Comments</h3>
        {comments.length === 0 && <p className="status">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <p>{c.comment}</p>
            <small>{new Date(c.dateTime).toLocaleString()}</small>
          </div>
        ))}
      </section>

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="status">Please login to comment.</p>
      )}
    </main>
  );
}

export default PhotoDetail;