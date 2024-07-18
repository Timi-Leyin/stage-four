import { useState } from "react";
import { AxiosError } from "axios";

export const useFetch = <Args = any, Res = any>(fetcher: any) => {
  const [data, setData] = useState<Res>(null!);
  const [error, setError] = useState<string | null>(null!);
  const [loading, setLoading] = useState(false);

  const fetchData = async (args?: Args) => {
    setError(null);
    setLoading(true);
    setData(null!);
    try {
      const response = await fetcher(args);
      setData(response.data);
      return response.data;
    } catch (error: any) {
      setError("Check Your Internet Connection");
      setData(null!);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchData,
    data,
    error,
    loading,
  };
};
