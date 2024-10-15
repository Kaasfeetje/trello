"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  onSubmit: (title: string) => void;
};

const UpdatableTitle = ({ children, title, onSubmit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_title, setTitle] = useState(title || "");

  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    update();
  };

  const update = () => {
    if (title == _title) {
      setIsOpen(false);
      return;
    }
    onSubmit(_title);
  };

  return (
    <div>
      {isOpen ? (
        <form onSubmit={submit}>
          <input
            ref={inputRef}
            value={_title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            onBlur={update}
          />
        </form>
      ) : (
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default UpdatableTitle;
