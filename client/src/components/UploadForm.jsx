import { useState } from 'react';

function UploadForm({ user }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please choose an image');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', user._id);

    try {
      const res = await fetch('/api/photos', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      window.location.reload();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h3>Upload a photo</h3>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      {message && <p className="status error">{message}</p>}
    </form>
  );
}

export default UploadForm;