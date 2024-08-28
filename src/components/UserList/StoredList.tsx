"use client";

import AppStore from "@/store/AppStore";
import styles from "./style.module.scss";
import useStore from "@/store/Store";
import { Button } from "@mantine/core";
import { memo, useEffect } from "react";
import { cn } from "@/hooks/cn";

const StoredUserList = () => {
  const { fetchUsers, users } = useStore();
  const { reduceUsers } = AppStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) return null;
  return (
    <div className={cn(styles.wrapper, { [styles.reduced]: users.length <= 2 })}>
      <h2>-- Stored User List --</h2>
      <ul className={styles.list}>
        {users.map((user: any) => (
          <li key={user.id}>{user.last_name}</li>
        ))}
      </ul>
      <Button variant="outline" onClick={reduceUsers}>
        Reduce users
      </Button>
    </div>
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
