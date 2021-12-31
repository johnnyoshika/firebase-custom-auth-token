import type { NextPage } from 'next';
import Head from 'next/head';
import Auth from '../components/Auth';
import Logs from '../components/Logs';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Custom Auth Token</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Auth />
        </div>
        <div className={styles.card}>
          <Logs />
        </div>
      </div>
    </div>
  );
};

export default Home;
