// src/components/examples/LoadingExample.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useLoading } from "@/hooks/useLoading";

const LoadingExample = () => {
  const [data, setData] = useState<string | null>(null);
  const { isLoading, withLoading } = useLoading();
  const [showFullPage, setShowFullPage] = useState(false);

  // Simulate a server fetch with delay
  const fetchDataFromServer = async () => {
    return new Promise<string>((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve("Data has been loaded from server!");
      }, 2000);
    });
  };

  // Handle data fetching with loading state
  const handleFetchData = withLoading(async () => {
    setData(null);
    const result = await fetchDataFromServer();
    setData(result);
  });

  // Toggle full page loading spinner
  const toggleFullPageLoading = () => {
    setShowFullPage(true);

    // Simulate server operation
    setTimeout(() => {
      setShowFullPage(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-dark-surface rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Loading Spinner Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center">
            <LoadingSpinner size="sm" />
            <p className="mt-2 text-sm">Small</p>
          </div>
          <div className="flex flex-col items-center">
            <LoadingSpinner size="md" />
            <p className="mt-2 text-sm">Medium</p>
          </div>
          <div className="flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm">Large</p>
          </div>
          <div className="flex flex-col items-center">
            <LoadingSpinner size="xl" />
            <p className="mt-2 text-sm">Extra Large</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Loading Spinner Colors
        </h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center">
            <LoadingSpinner color="primary" />
            <p className="mt-2 text-sm">Primary</p>
          </div>
          <div className="flex flex-col items-center">
            <LoadingSpinner color="secondary" />
            <p className="mt-2 text-sm">Secondary</p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg">
            <LoadingSpinner color="white" />
            <p className="mt-2 text-sm text-white">White</p>
          </div>
          <div className="flex flex-col items-center">
            <LoadingSpinner color="gray" />
            <p className="mt-2 text-sm">Gray</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Integration with Server Actions
        </h2>
        <div className="flex flex-col space-y-4">
          <Button
            onClick={handleFetchData}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Loading Data..." : "Fetch Data from Server"}
          </Button>

          {data && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
              {data}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Full Page Loading Overlay
        </h2>
        <Button onClick={toggleFullPageLoading}>
          Show Full Page Loading (3 seconds)
        </Button>
      </div>

      {/* Render full page loading overlay when showFullPage is true */}
      {showFullPage && <LoadingSpinner fullPage size="lg" />}
    </div>
  );
};

export default LoadingExample;
