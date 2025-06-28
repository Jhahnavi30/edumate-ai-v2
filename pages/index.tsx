import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EduMate</h1>
      <p className={styles.subtitle}>Your Personalized AI Learning Companion</p>

      <div className={styles.buttonRow}>
        <Link href="/tutor"><button className={styles.button}>💬 AI Chat Tutor</button></Link>
        <Link href="/summarize"><button className={styles.button}>📝 Notes Summarizer</button></Link>
        <Link href="/quiz"><button className={styles.button}>❓ Quiz Generator</button></Link>
      </div>
    </div>
  );
}
