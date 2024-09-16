const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url: string, options?: RequestOptions): Promise<any> => {
  let urlStr = apiUrl + url;
  if (options) {
    const { id, page } = options;
    if (id) urlStr += `/${id}`;
    if (page || page === 0) urlStr += `?page=${page}`;
  }
  const controller = new AbortController();
  try {
    const response = await fetch(urlStr, {
      //cache: "force-cache",
      signal: controller.signal,
      // headers: {
      //   Authorization: `Bearer ...`,
      // },
    });
    // if (!response.ok) { // if "catch" doesn't work
    //   throw new Error("Network response was not ok");
    // }
    //console.log(response.json());
    return response.json();
    return {
      data: response.json(),
      controller,
    };
  } catch (error) {
    console.error(error);
    return {
      error,
    };
  }

  return fetch(urlStr, {
    cache: "force-cache",
    signal: controller.signal,
  }).then((res) =>
    res.json().catch((error: string) => {
      console.error(error);
      return {
        error,
      };
    }),
  );
};

export type RequestOptions = {
  id?: number;
  page?: number;
};
