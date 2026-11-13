import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="home">
      <section className="banner">
        <h1>Welcome to Alzikrayat</h1>
        <p>Share your photos and stories with the community.</p>
        <div className="home-actions">
          <Link to="/gallery">Browse Gallery</Link>
          <Link to="/login">Login / Register</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;