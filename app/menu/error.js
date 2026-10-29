"use client";

export default function Error({ reset }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
      <h2 className="text-xl font-bold text-red-700">Something went wrong!</h2>

      <p className="mt-2 text-red-600">We couldn't load the menu.</p>

      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
