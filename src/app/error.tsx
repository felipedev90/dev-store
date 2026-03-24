"use client";
import Container from "@/components/layout/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container>
      <h2 className="text-xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </Container>
  );
}
