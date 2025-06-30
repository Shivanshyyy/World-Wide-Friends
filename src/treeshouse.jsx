import React, { useState, useEffect } from 'react';

export default function Treehouse() {
  const [memberCount, setMemberCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 3000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = currentTime - startTime;
      const increment = Math.min(Math.floor((progress / duration) * 200), 200);

      if (start < increment) {
        start = increment;
        setMemberCount(start);
        requestAnimationFrame(animate);
      } else {
        setMemberCount(200);
        setIsCounting(true);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const mods = [
    { name: 'Aisa', role: 'Admin' },
    { name: 'Sora', role: 'Moderator' },
    { name: 'Hamish', role: 'Moderator' },
    { name: 'Shivansh', role: 'Moderator' },
    { name: 'Benji', role: 'Moderator' },
    { name: 'Andy', role: 'Moderator' }
  ];

  return (
    <div style={styles.page}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.backgroundVideo}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div style={styles.overlay}></div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>WWF</div>
        <a href="https://discord.gg/kWkTy8hu" style={styles.joinButton}>Join Discord</a>
      </header>

      {/* Content */}
      <main style={styles.main}>
        <h1 style={styles.title}>WORLD WIDE FRIENDS</h1>
        <p style={styles.subtitle}>
          A vibrant community where people from all over the world connect, share ideas, and build lasting friendships.
        </p>

        <div style={styles.counterSection}>
          <div style={styles.counter}>{memberCount}{isCounting && '+'}</div>
          <div style={styles.counterLabel}>Active Members</div>
        </div>

        <section style={styles.teamSection}>
          <h2 style={styles.sectionTitle}>Our Team</h2>
          <div style={styles.grid}>
            {mods.map((mod, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.modName}>{mod.name}</div>
                <div style={styles.modRole}>{mod.role}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} World Wide Friends • Made with ❤️ for global connections
      </footer>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    overflowY: 'auto',
    color: 'white',
    fontFamily: 'sans-serif',
    backgroundColor: '#000'
  },
  backgroundVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    zIndex: 0
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5), black)',
    zIndex: 1
  },
  header: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#6366f1'
  },
  joinButton: {
    padding: '8px 16px',
    borderRadius: '909px',
    backgroundColor: '#6366f1',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  main: {
    zIndex: 2,
    position: 'relative',
    paddingTop: '100px',
    paddingBottom: '80px',
    paddingLeft: '24px',
    paddingRight: '24px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1rem',
    maxWidth: '600px',
    margin: '0 auto 32px',
    opacity: 0.85
  },
  counterSection: {
    marginBottom: '48px'
  },
  counter: {
    fontSize: '2.5rem',
    fontWeight: 'bold'
  },
  counterLabel: {
    marginTop: '4px',
    fontSize: '0.75rem',
    opacity: 0.7
  },
  teamSection: {
    marginTop: '32px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '20px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center'
  },
  modName: {
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  modRole: {
    fontSize: '0.85rem',
    color: '#6366f1',
    marginTop: '4px'
  },
  footer: {
    zIndex: 2,
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.85rem',
    opacity: 0.6
  }
};
