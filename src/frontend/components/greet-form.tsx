"use client";

import { useState } from "react";

export function GreetForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(
      `/api/greet?name=${encodeURIComponent(name)}`,
    );
    const body = await response.json();

    setMessage(body.message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
    >
      <label
        htmlFor="greet-name"
        className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500"
      >
        Name
      </label>
      <input
        id="greet-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="mt-4 w-full rounded-full border border-zinc-200 px-5 py-3 text-sm text-zinc-950"
      />
      <button
        type="submit"
        className="mt-8 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Greet
      </button>
      {message && (
        <p className="mt-4 max-w-prose text-base leading-7 text-zinc-600">
          {message}
        </p>
      )}
    </form>
  );
}
