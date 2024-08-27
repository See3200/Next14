"use client";

import { User } from "@/types/User";
import useSWR from "swr";
import styles from "./style.module.scss";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog";
import { Button } from "../../shared/ui/button";

const UserList = () => {
  const { data, isLoading, error } = useSWR<{ data: User[] }, Error>("users");
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="relative flex min-h-20 max-w-60 flex-col items-center justify-start text-ellipsis rounded-sm text-gray-950 first-letter:text-slate-700">
          <DialogHeader>
            <DialogTitle className="relative text-center">Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
