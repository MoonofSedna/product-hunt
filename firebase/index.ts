import { ProductsInterface } from './../interfaces/products.interface';
import { initializeApp } from 'firebase/app';
import {
	FirebaseStorage,
	StorageReference,
	getStorage,
} from 'firebase/storage';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
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
	Firestore,
	CollectionReference,
	Query,
	DocumentSnapshot,
	DocumentData,
	QuerySnapshot,
	getDocs,
	getCountFromServer,
	collectionGroup,
	AggregateQuerySnapshot,
	AggregateField,
	startAt,
	QueryDocumentSnapshot,
	endAt,
	where,
} from 'firebase/firestore';
import firebaseRef from 'firebase/app';
import firebaseConfig from './config';
import Router from 'next/router';
import { Auth } from 'firebase/auth/';
import 'firebase/database';
import store from '../store';
import { logout } from '../store/slices/user';

class Firebase {
	constructor() {
		const app = initializeApp(firebaseConfig);
		this.auth = getAuth(app);
		this.storage = getStorage(app);
		this.db = getFirestore(app);
		this.collectionGroup = collectionGroup(this.db, 'products');
		this.getCollection = collection(this.db, 'products');
		this.searchCollection = (order, lastDoc, limitNumber) => {
			return getDocs(
				query(
					this.getCollection,
					orderBy(order, 'desc'),
					startAfter(lastDoc),
					limit(limitNumber)
				)
			);
		};
		this.count = getCountFromServer(this.getCollection);
		this.collectionOrderBy = (order, limitNumber) => {
			if (limitNumber) {
				return query(
					this.getCollection,
					orderBy(order, 'desc'),
					limit(limitNumber)
				);
			} else {
				return query(this.getCollection);
			}
		};
		this.snapshot = async (order, limitNumber, lastDoc) => {
			if (lastDoc && limitNumber) {
				return await this.searchCollection(order, lastDoc, limitNumber);
			} else {
				return await getDocs(
					this.collectionOrderBy(order, limitNumber)
				);
			}
		};
		this.getData = snapshot => {
			const data: ProductsInterface[] = [];
			snapshot.forEach(doc => {
				data.push({ ...(doc.data() as ProductsInterface), id: doc.id });
			});
			return data;
		};
		this.getDoc = id => {
			return getDoc(doc(this.getCollection, id));
		};
		this.updateDoc = (id, values) => {
			return updateDoc(doc(this.getCollection, id), values);
		};
		this.deleteDoc = id => {
			return deleteDoc(doc(this.getCollection, id));
		};
	}

	auth: Auth;
	storage: FirebaseStorage;
	db: Firestore;
	count: Promise<
		AggregateQuerySnapshot<{
			count: AggregateField<number>;
		}>
	>;
	collectionGroup: Query<DocumentData>;
	getCollection: CollectionReference<DocumentData>;
	searchCollection: (
		order: string,
		lastDoc: number,
		limit: number
	) => Promise<QuerySnapshot<DocumentData>>;
	collectionOrderBy: (order: string, limit?: number) => Query<DocumentData>;
	snapshot: (
		order: string,
		limit?: number,
		lastDoc?: number
	) => Promise<QuerySnapshot<DocumentData>>;
	getData: (snapshot: QuerySnapshot<DocumentData>) => ProductsInterface[];
	getDoc: (id: string) => Promise<DocumentSnapshot<DocumentData>>;
	updateDoc: (id: string, values: any) => Promise<void>;
	deleteDoc: (id: string) => Promise<void>;

	async signin(name: string, email: string, password: string) {
		const { user } = await createUserWithEmailAndPassword(
			firebase.auth,
			email,
			password
		);
		updateProfile(user, {
			displayName: name,
		});
	}

	async login(email: string, password: string) {
		const newUser = await signInWithEmailAndPassword(
			firebase.auth,
			email,
			password
		);
		return newUser.user;
	}

	async logout() {
		await firebase.auth.signOut();
		store.dispatch(logout());
		Router.push('/login');
	}

	async addProduct(values: any) {
		await addDoc(collection(firebase.db, 'products'), values);
	}
}

const firebase = new Firebase();
export default firebase;
