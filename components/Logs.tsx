import { getIdTokenResult } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../config/firebaseClient';

const padNumberWithZeros = (value: number) =>
  ('00' + value).slice(-2);

const formatDate = (date: Date) =>
  padNumberWithZeros(date.getHours()) +
  ':' +
  padNumberWithZeros(date.getMinutes()) +
  ':' +
  padNumberWithZeros(date.getSeconds());

const Logs = () => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [logs, setLogs] = useState<
    { key: number; message: string }[]
  >([]);

  const log = (message: string) =>
    setLogs(prev => [
      {
        key: Date.now(),
        message: `[${formatDate(new Date())}] ${message}`,
      },
      ...prev,
    ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    log(signedIn ? 'Signed in' : 'Signed out');
  }, [signedIn]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (!signedIn) return;

    const logCustomClaims = async () => {
      if (!auth.currentUser) return;
      const tokenResult = await getIdTokenResult(
        auth.currentUser,
        forceRefresh,
      );
      const customClaims = Object.keys(tokenResult.claims)
        .filter(
          key =>
            ![
              'aud',
              'auth_time',
              'exp',
              'firebase',
              'iat',
              'iss',
              'sub',
            ].includes(key),
        )
        .map(key => `${key}:${tokenResult.claims[key]}`)
        .join('; ');
      log(customClaims);
    };

    interval = setInterval(logCustomClaims, 10000);
    (async function () {
      await logCustomClaims();
    })();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [signedIn, forceRefresh]);

  return (
    <>
      <h2>Logs</h2>
      <div style={{ margin: '8px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={forceRefresh}
            onChange={e => setForceRefresh(e.target.checked)}
          />
          Force token refresh
        </label>
      </div>
      {logs.map((log, i) => (
        <div key={log.key}>{log.message}</div>
      ))}
    </>
  );
};

export default Logs;
