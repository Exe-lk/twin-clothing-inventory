import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    return null;
  }
};

export default SignInUser;
