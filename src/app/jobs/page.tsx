// pages/jobs.js or pages/jobs.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import Filter from "@/components/Filters";
import { fetcher } from "@/network/api";

const JobsPage = ({ searchParams }: any) => {
  const page = searchParams.page || 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetcher("users", { page: Number(page) }),
    //keepPreviousData: true, // Keeps old data while fetching new data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div>
      <Filter total={data.total_pages} />
      <div>
        {data.data.map((job: any) => (
          <div key={job.id}>
            <h2>{job.first_name}</h2>
            <p>{job.avatar}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
