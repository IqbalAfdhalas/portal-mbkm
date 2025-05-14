// src/hooks/useLoading.ts
import { useState, useCallback } from "react";

/**
 * A custom hook for managing loading states in async operations
 *
 * @returns An object containing the loading state and helper functions
 */
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState<boolean>(initialState);

  /**
   * Wraps an async function with loading state management
   * Sets loading state to true before execution and false after completion
   *
   * @param asyncFunction - The async function to execute with loading state management
   * @returns A function that executes the provided async function with loading state management
   */
  const withLoading = useCallback(
    <T extends any[], R>(asyncFunction: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R> => {
        try {
          setIsLoading(true);
          const result = await asyncFunction(...args);
          return result;
        } finally {
          setIsLoading(false);
        }
      };
    },
    [],
  );

  /**
   * Start loading state
   */
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  /**
   * Stop loading state
   */
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    withLoading,
    startLoading,
    stopLoading,
    setIsLoading,
  };
}
