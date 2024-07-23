import {
  addDoc as firebaseAddDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useState } from "react";

export const useFirestore = () => {
  const [isPending, setISPending] = useState(false);

  const addDoc = async (doc) => {
    try {
      await firebaseAddDoc(collection(db, "todos"), {
        ...doc,
        createdAt: serverTimestamp(),
      });
      toast.success("Yangi hujjat qo'shildi");
    } catch (error) {
      toast.error("Hujjatni qo'shishda xatolik yuz berdi");
      console.error("Hujjatni qo'shishda xatolik: ", error);
    }
  };
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    toast.success("deleted Doc");
  };

  const changeStatus = async (id, status) => {
    const selectedDoc = doc(db, "todos", id);

    await updateDoc(selectedDoc, { completed: !status });

    toast.success("Status Changed !");
  };
  const changeTitle = async (id) => {
    setISPending(true);
    const selectedDoc = doc(db, "todos", id);

    await updateDoc(selectedDoc, {
      title: newTitle,
    });
    setISPending(false)
  };

  return { addDoc, deleteItem, changeStatus, changeTitle, isPending };
};
