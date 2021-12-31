import axios from 'axios';
import { signInWithCustomToken } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config/firebaseClient';

const SignIn = () => {
  const [uid, setUid] = useState('');
  const [claims, setClaims] = useState('');

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const result = await axios.put<{ token: string }>('/api/auth', {
      uid,
      claims,
    });
    const userCredentials = await signInWithCustomToken(
      auth,
      result.data.token,
    );
    console.log('userCredentials', userCredentials);
  };

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <input
            type="text"
            value={uid}
            onChange={e => setUid(e.target.value.trim())}
            placeholder="uid"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={claims}
            onChange={e => setClaims(e.target.value.trim())}
            placeholder="claims (foo=bar,baz=qux)"
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
