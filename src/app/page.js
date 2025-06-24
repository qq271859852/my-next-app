"use client";

import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1, num2 }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await res.json();
      setResult(data.sum);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          两数相加
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="num1"
              className="block text-sm font-medium text-gray-600"
            >
              数值 1
            </label>
            <input
              type="number"
              id="num1"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="num2"
              className="block text-sm font-medium text-gray-600"
            >
              数值 2
            </label>
            <input
              type="number"
              id="num2"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            确定
          </button>
        </form>
        {result !== null && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p className="font-semibold">结果: {result}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-semibold">错误: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
