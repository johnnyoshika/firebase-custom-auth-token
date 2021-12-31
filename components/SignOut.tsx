import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseClient';

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <h2>Sign out</h2>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </>
  );
};

export default SignOut;
