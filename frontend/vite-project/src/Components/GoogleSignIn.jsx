import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();

  async function signInwithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Send ID token to the backend
      const response = await axios.post(
        "http://localhost:5001/api/auth/google-register",
        {},
        {
          headers: { authorization: `Bearer ${idToken}` },
        }
      );
      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
        onClick={signInwithGoogle}
      >
        <FaGoogle className="h-5 w-5" />
      </button>
    </div>
  );
}
