"use client";
import { fetcher } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

type PropsType = {
  id: number;
};

const UserDetails: FC<PropsType> = ({ id }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => fetcher("users", { id }),
  });
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => fetcher("users"),
  });
  console.log(userList);

  return <div>{isLoading ? "Loading..." : <p>Email: {userData?.data?.email}</p>}</div>;
};

export default UserDetails;
