import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Your Note-Taking Dashboard</h1>
        <p>Keep your thoughts organized and easily accessible!</p>
      </header>

      <section style={styles.imageSection}>
        <img src={img1} alt="Notebook" style={styles.image} />
        <img src={img2} alt="Pen and Paper" style={styles.image} />
      </section>

      <section style={styles.authButtons}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/signup" style={styles.button}>Sign Up</Link>
      </section>

      <footer style={styles.footer}>
        <p>Start capturing your ideas and thoughts today!</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  image: {
    width: '200px',
    margin: '0 10px',
  },
  authButtons: {
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    fontSize: '16px',
    textDecoration: 'none',
    color: '#fff',
    background: '#007BFF',
    borderRadius: '5px',
  },
  footer: {
    marginTop: '20px',
  },
};

export default Dashboard;
