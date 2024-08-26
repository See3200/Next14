import { fetcher, RequestOptions } from "@/network/api";
import useSWR from "swr";

export function useAppSWR(key: string, opts: RequestOptions) {
  const controller = new AbortController();
  return [useSWR(key, (url: string) => fetcher(url, opts)), controller];
}
