import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import firebaseConfig from "./config";
import Router, { useRouter } from "next/router";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.storage = getStorage(app);
    this.storageRef = ref(this.storage, "products");
    this.db = getFirestore(app);
    this.getCollection = collection(this.db, "products");
    this.collectionOrderBy = (order, lastViewed, limitNumber) =>
      query(
        this.getCollection,
        orderBy(order, "desc"),
        startAfter(lastViewed ? lastViewed : Date.now()),
        limit(limitNumber)
      );
    this.snapshot = (snapshot, order, lastViewed, limitNumber) =>
      onSnapshot(
        this.collectionOrderBy(order, lastViewed, limitNumber),
        snapshot
      );
    this.getDoc = (id) => {
      return getDoc(doc(this.getCollection, id));
    };
    this.updateDoc = (id, values) => {
      return updateDoc(doc(this.getCollection, id), values);
    };
    this.deleteDoc = (id) => {
      return deleteDoc(doc(this.getCollection, id));
    };
  }

  async signin(name, email, password) {
    const { user } = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );
    updateProfile(user, {
      displayName: name,
    });
  }

  async login(email, password) {
    const newUser = await signInWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );
    return newUser.user;
  }

  async logout() {
    await firebase.auth.signOut();
    Router.push("/login");
  }

  async addProduct(values) {
    await addDoc(collection(firebase.db, "products"), values);
  }
}

const firebase = new Firebase();
export default firebase;
