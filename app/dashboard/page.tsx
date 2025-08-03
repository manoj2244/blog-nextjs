"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const POSTS_PER_PAGE = 10;

export default function DashboardPage() {
  const { posts, loading, error, fetchPosts, deletePost } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedPages, setFetchedPages] = useState<number[]>([]);

  const totalPages = Math.ceil((posts.length + 1) / POSTS_PER_PAGE);

  useEffect(() => {
    // redirectIfUnauthorized();
  
    if (!fetchedPages.includes(1)) {
      fetchPosts(0, POSTS_PER_PAGE).then(() => {
        setFetchedPages((prev) => [...prev, 1]);
      });
    }
  }, []);

  const handlePageChange = async (page: number) => {
    const offset = (page - 1) * POSTS_PER_PAGE;

    if (!fetchedPages.includes(page)) {
      await fetchPosts(offset, POSTS_PER_PAGE);
      setFetchedPages((prev) => [...prev, page]);
    }

    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    deletePost(id);
    toast.success("Post deleted");
  };

  console.log(posts.length,"esdfsdfsdf");
  

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (

        <ProtectedRoute>

    <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📝 Blog Post Management
        </h1>
        <div className="flex gap-4">
          <Link
            href="/post/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Create Post
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              location.href = "/login";
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full w-[1000px] table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 text-sm">
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3 w-1/4">Title</th>
              <th className="px-4 py-3 w-1/2">Body</th>
              <th className="px-4 py-3 w-60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={4} className="text-center text-red-500 py-6">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && paginatedPosts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No posts available. Please create one.
                </td>
              </tr>
            )}

            {paginatedPosts.map((post, index) => (
              <tr
                key={`post-${post.id}`}
                className="border-t border-gray-200 hover:bg-gray-50 text-sm"
              >
                <td className="px-4 py-4 text-gray-700">
                  {(currentPage - 1) * POSTS_PER_PAGE + index + 1}
                </td>
                <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-xs">
                  {post.title}
                </td>
                <td className="px-4 py-4 text-gray-600 truncate max-w-xl">
                  {post.body}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={`/post/${post.id}/edit`}
                      className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages >= 1 && (
        <div className="flex items-center justify-center mt-6 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border font-medium transition cursor-pointer ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          >
            ← Prev
          </button>

          <span className="text-sm text-gray-600 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border font-medium transition cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
