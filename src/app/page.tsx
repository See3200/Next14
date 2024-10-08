import BearCounter from "@/components/BearCounter";
import styles from "./page.module.scss";
import BearControls from "@/components/BearControls";
import useSWR from "swr";
import UserList from "@/components/UserList";
import Link from "next/link";
import StoredUserList from "@/components/UserList/StoredList";
import { fetcher } from "@/network/api";
import { Button } from "@mantine/core";
import { cookies } from "next/headers";

export default async function Home() {
  const accessToken = await cookies().get("accessToken")?.value; // can be used in server side only
  //const { data, error, isLoading } = useSWR<any, Error>(["users"], ([url]) => fetcher(url));
  // const { data, error, isLoading } = useSWR<any, Error>("users");
  // if (error) {
  //   console.log(error);
  //   return <p>{error.message}</p>;
  // }
  const data = await fetcher("users");
  return (
    <main className={styles.main}>
      <p>Home page</p>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/jobs">Jobs</Link>
      </nav>
      <Button variant="filled">Button</Button>
      <section>
        <h2>Data from request:</h2>
        <div>
          <ul className={styles.list}>
            {data.data.map((user: any) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </div>
        <UserList />
        <div>
          <StoredUserList />
        </div>
      </section>

      <section>
        <h2>About Bears</h2>
        <div>
          <BearCounter />
        </div>
        <div>
          <BearControls />
        </div>
      </section>
    </main>
  );
}
