import admin from 'firebase-admin';
import serviceAccount from '../serviceAccount.json';

if (!admin.apps.length)
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccount as admin.ServiceAccount,
      ),
    });
  } catch (error) {
    console.log(
      'Firebase admin initialization error',
      error instanceof Error ? error.stack : error,
    );
  }

const auth = admin.auth();

export { auth };
