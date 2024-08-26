"use client";

import { fetcher } from "@/network/api";
import React from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: any) => {
  return <SWRConfig value={{ fetcher: (param: string) => fetcher(param) }}>{children}</SWRConfig>;
};
