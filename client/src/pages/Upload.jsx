import UploadForm from '../components/UploadForm';

function Upload({ user }) {
  if (!user) return <p className="status">Please login first.</p>;

  return (
    <main>
      <UploadForm user={user} />
    </main>
  );
}

export default Upload;