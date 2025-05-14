// src/components/examples/FetchExample.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import useFetch from "@/hooks/useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchExample = () => {
  const { data, error, isLoading, fetch: fetchPosts } = useFetch<Post[]>();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [singlePostLoading, setSinglePostLoading] = useState(false);

  // Fetch posts from JSONPlaceholder API
  const handleFetchPosts = () => {
    fetchPosts("https://jsonplaceholder.typicode.com/posts?_limit=5");
  };

  // Fetch single post details
  const handleFetchPostDetails = async (postId: number) => {
    setSinglePostLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      if (!res.ok) {
        throw new Error("Gagal fetch post");
      }
      const data: Post = await res.json();
      setSelectedPost(data);
    } catch (err) {
      console.error("Gagal fetch post:", err);
    } finally {
      setSinglePostLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-dark-surface rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Real API Fetch Example
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This example demonstrates real API fetching with loading states using
          JSONPlaceholder.
        </p>

        <Button
          onClick={handleFetchPosts}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Loading Posts..." : "Fetch Posts"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
          Error: {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : data ? (
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-semibold">Posts</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((post) => (
              <div
                key={post.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleFetchPostDetails(post.id)}
              >
                <h4 className="font-semibold text-lg mb-2 line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.body}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFetchPostDetails(post.id);
                  }}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {singlePostLoading ? (
        <div className="mt-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        </div>
      ) : selectedPost ? (
        <div className="mt-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-xl font-heading font-semibold mb-4">
            Post Details
          </h3>
          <h4 className="text-lg font-semibold mb-2">{selectedPost.title}</h4>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedPost.body}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FetchExample;
