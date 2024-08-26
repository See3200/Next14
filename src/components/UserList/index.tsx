"use client";

import { User } from "@/types/User";
import useSWR from "swr";
import styles from "./style.module.scss";
import { Button, Modal } from "antd";
import { useState } from "react";

const UserList = () => {
  const { data, isLoading, error } = useSWR<{ data: User[] }, Error>("users");
  const [open, setOpen] = useState(false);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <p>Some contents...</p>
      </Modal>
      <ul className={styles.list}>
        {data.data.map((user: any) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

// "use client";

// import { User } from "@/types/User";
// import useSWR from "swr";
// import styles from "./style.module.scss";
// import { useEffect, useState } from "react";
// import { fetcher } from "@/network/api";

// const UserList = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const res = await fetcher("users");
//       if (res) setData(res);
//     };
//     getData();
//   }, []);
//   // const { data, isLoading, error } = useSWR<{ data: User[] }, Error>("users");
//   // if (isLoading) return <p>Loading...</p>;
//   // if (!data) return null;
//   return <ul className={styles.list}>{data?.data?.map((user: any) => <li key={user.id}>{user.first_name}</li>)}</ul>;
// };

// export default UserList;
