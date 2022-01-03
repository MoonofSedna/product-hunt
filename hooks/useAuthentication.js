import { useState, useEffect } from "react";
import firebase from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebase.auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      []
    );

    return () => {
      unsubscribe();
    };
  });

  return { user, loading };
}
