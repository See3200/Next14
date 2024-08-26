import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetcher } from "@/network/api";
import styles from "./about.module.scss";
import UserDetails from "@/components/UserDetails";

export default async function About() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["userDetails"],
    queryFn: () => fetcher("users", { id: 2 }),
  });
  //console.log(data);

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.main}>
        <p>About page</p>
        <nav>
          <Link href="/">Home</Link>
        </nav>
        <UserDetails id={2} />
      </div>
    </HydrationBoundary>
  );
}
