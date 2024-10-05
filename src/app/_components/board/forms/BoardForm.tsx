"use client";

import React, { useState } from "react";

type Props = {
  onSubmit: (input: string) => void;
};

const BoardForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: do validation
    onSubmit(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Board title"
      />
      <button type="submit">Create board</button>
    </form>
  );
};

export default BoardForm;
