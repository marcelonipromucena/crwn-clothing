import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: '',
  authDomain: 'crwn-db-664fd.firebaseapp.com',
  databaseURL: 'https://crwn-db-664fd.firebaseio.com',
  projectId: 'crwn-db-664fd',
  storageBucket: '',
  messagingSenderId: '140886141002',
  appId: '1:140886141002:web:a8292f9d13799ea1691eb3',
};

export const createUserProfileDocument = async (
  userAuth,
  additionalData,
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const collectionRef = firestore.collection('users');

  const snap = await userRef.get();

  const collectionSnapshot = await collectionRef.get();

  console.log({ collectionSnapshot });

  if (!snap.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (
  collectionsSnapshot,
) => {
  const transformedCollection = collectionsSnapshot.docs.map(
    (docSnapshot) => {
      const { title, items } = docSnapshot.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items,
      };
    },
  );

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>
  auth.signInWithPopup(googleProvider);

export default firebase;
