import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereOptions, orderOptions) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where(...whereOptions),
      orderBy(...orderOptions)
    );

    const getData = async () => {
      onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() });
        });
        setData(todos);
      });
    };

    getData();
  }, [collectionName]);

  return { data };
};
