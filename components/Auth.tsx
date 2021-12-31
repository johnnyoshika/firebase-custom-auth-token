import { useEffect, useState } from 'react';
import { auth } from '../config/firebaseClient';
import SignIn from './SignIn';
import SignOut from './SignOut';

const Auth = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return signedIn ? <SignOut /> : <SignIn />;
};

export default Auth;
