import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1rwDLKIeXqpwgkjkK-nDRY0vdr9sNZXI',
  authDomain: 'workout-planner-20e75.firebaseapp.com',
  projectId: 'workout-planner-20e75',
  storageBucket: 'workout-planner-20e75.appspot.com',
  messagingSenderId: '315505691562',
  appId: '1:315505691562:web:5255c629c55de2726ab9d3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
