import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData } from "../types/types";
import { signOut } from "firebase/auth";
// our custom hook that calls useContext
import { useAuth } from "../context/AuthContext";

// notice we don't need a props interface or any props for the Dashboard anymore!
// this is thanks to useContext
export default function Dashboard() {
  // getting current user from our custom hook
  const { currentUser } = useAuth();

  const [note, setNote] = useState("");
  const [edit, setEdit] = useState("");
  // note that this is for the note loading not auth
  const [isLoading, setIsLoading] = useState(true);

  // Curious as to why we have to create an async function inside the
  // useEffect? See
  // https://devtrium.com/posts/async-functions-useeffect
  // Basically, async functions return Promises
  // which means that trying to directly pass in
  // useEffect(async () => { ... }) wouldn't work as
  // intended. So to ensure that we can run an async effect in
  // useEffect, we have to make an async function and then call it inside the
  // useEffect.
  useEffect(() => {
    // check in case currentUser is null
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as UserData;
          setNote(data.notes);
          setEdit(data.notes);
        }
      } catch (error) {
        console.error("Error retrieving note:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  const saveNote = async () => {
    // check in case currentUser is null
    if (!currentUser) return;
    const ref = doc(db, "users", currentUser.uid);
    await updateDoc(ref, { notes: edit });
    setNote(edit);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return isLoading ? (
    <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      Loading...
    </h2>
  ) : (
    <div className="min-h-screen flex flex-col items-center my-15">
      {/* ? just means if currentUser is undefined the expression will return undefined */}
      <h1 className="mb-4">Welcome, {currentUser?.email}</h1>
      <textarea
        className="rounded-lg border-2 p-2 w-80 resize"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        rows={4}
      />
      <br />
      <button
        className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
        onClick={saveNote}
      >
        Save
      </button>
      <button
        className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>
      <p>
        <strong>Saved note:</strong> {note}
      </p>
    </div>
  );
}
