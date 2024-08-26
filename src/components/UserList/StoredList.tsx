"use client";

import styles from "./style.module.scss";
import useStore from "@/store/Store";
import { memo, useEffect } from "react";

const StoredUserList = () => {
  const { fetchUsers, users } = useStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) return null;
  return (
    <ul className={styles.list}>
      {users.map((user: any) => (
        <li key={user.id}>{user.last_name}</li>
      ))}
    </ul>
  );
};

export default memo(StoredUserList);

// useEffect(() => {
//   let control: AbortController;
//   const getUsers = async () => {
//     const controller = await fetchUsers();
//     control = controller;
//   };
//   getUsers();
//   return () => {
//     control?.abort("Unmounted");
//   };
// }, []);
