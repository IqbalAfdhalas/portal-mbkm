// src/hooks/useFetch.ts
import { useState, useCallback } from "react";
import { useLoading } from "./useLoading";

interface FetchOptions extends RequestInit {
  baseUrl?: string;
}

interface FetchResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  fetch: (url: string, options?: FetchOptions) => Promise<T | null>;
}

/**
 * Custom hook for handling fetch requests with loading and error states
 *
 * @returns An object containing data, error, loading state, and fetch function
 */
export function useFetch<T = any>(): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { isLoading, withLoading } = useLoading();

  /**
   * Fetch data from the specified URL
   *
   * @param url - The URL to fetch data from
   * @param options - Fetch options including baseUrl
   * @returns The fetched data or null if an error occurred
   */
  const fetchData = useCallback(
    withLoading(async (url: string, options: FetchOptions = {}) => {
      try {
        // Reset states
        setData(null);
        setError(null);

        // Construct the full URL
        const baseUrl = options.baseUrl || "";
        const fullUrl = `${baseUrl}${url}`;

        // Remove baseUrl from options to avoid fetch errors
        const { baseUrl: _, ...fetchOptions } = options;

        // Execute the fetch
        const response = await fetch(fullUrl, fetchOptions);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse response body as JSON
        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        // Handle any errors
        const fetchError = err instanceof Error ? err : new Error(String(err));
        setError(fetchError);
        console.error("Fetch error:", fetchError);
        return null;
      }
    }),
    [],
  );

  return {
    data,
    error,
    isLoading,
    fetch: fetchData,
  };
}

export default useFetch;
