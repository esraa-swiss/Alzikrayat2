import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    fetch('/api/photos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load photos');
        return res.json();
      })
      .then((data) => setPhotos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <main className="gallery">
      <div className="gallery-toolbar">
        <h2>Gallery</h2>
        <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
          Switch to {view === 'grid' ? 'List' : 'Grid'} view
        </button>
      </div>

      {photos.length === 0 && <p className="status">No photos yet.</p>}

      <div className={view === 'grid' ? 'photo-grid' : 'photo-list'}>
        {photos.map((photo) => (
          <Link key={photo._id} to={'/photos/' + photo._id} className="photo-card">
            <img src={'/uploads/' + photo.fileName} alt={photo.title} />
            <h3>{photo.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Gallery;