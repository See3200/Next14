"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mantine/core";
import styles from "./style.module.scss";

type PropsType = {
  total: number;
};

const Filter = ({ total }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;

  const handlePageChange = (value: number) => {
    const defaultParams = {
      page: String(value),
    };
    let params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles["pagination-wrap"]}>
      <Pagination value={pageNumber} onChange={handlePageChange} total={total} className={styles.pagination} />
    </div>
  );
};

export default Filter;
