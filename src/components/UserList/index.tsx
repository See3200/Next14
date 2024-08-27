"use client";

import { User } from "@/types/User";
import useSWR from "swr";
import styles from "./style.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Slider } from "@mantine/core";
import { useState } from "react";

const UserList = () => {
  const { data, isLoading, error } = useSWR<{ data: User[] }, Error>("users");
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(40);
  if (isLoading) return <p>Loading...</p>;
  //if (!data) return null;
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Authentication">
        <p>Modal content here...</p>
      </Modal>

      <Button className={styles.btn} onClick={open}>
        Open modal
      </Button>
      <Slider value={value} onChange={setValue} />
      <ul className={styles.list}>{data?.data.map((user: any) => <li key={user.id}>{user.first_name}</li>)}</ul>
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
