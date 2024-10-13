import React, { ReactElement, useEffect, useRef, useState } from "react";

type Props = {
  controlledIsOpen?: boolean;
  setControlledIsOpen?: (value: boolean) => void;
  title: string;
  className?: string;
  openElement: React.ReactNode; //Any buttons not marked type="button" will open form
  onSubmit: (title: string) => void;
};

// TODO: ability for custom input element
const ClickableForm = ({
  controlledIsOpen,
  setControlledIsOpen,
  title,
  openElement,
  onSubmit,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [_title, setTitle] = useState("");

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  useEffect(() => {
    if (isOpen) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen]);

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(_title);
    setTitle("");
    setIsOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  };

  const onIsOpenChange = (value: boolean) => {
    setIsOpen(value);
    if (setControlledIsOpen) {
      setControlledIsOpen(value);
    }
  };

  const _openElement = React.Children.map(openElement, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement, {
        onClick: (e: React.MouseEvent) => {
          if ((e.target as HTMLButtonElement).type === "submit") {
            onIsOpenChange(true);
          }
          if (child.props.onClick) {
            child.props.onClick(e);
          }
        },
      });
    }
  });

  return (
    <div className="w-full">
      {isOpen ? (
        <form
          onSubmit={_onSubmit}
          className={`w-full rounded-lg ${className ? className : ""}`}
        >
          <textarea
            ref={ref}
            style={{ height: "72px" }}
            dir="auto"
            className="w-full resize-none overflow-y-hidden rounded-lg bg-gray-800 px-3 py-2 pb-6 text-gray-300"
            value={_title}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            onChange={onChange}
            onBlur={() => onIsOpenChange(false)}
          />
          <div>
            <button
              className="rounded-sm bg-blue-500 px-2 py-1 font-bold text-gray-800 hover:bg-blue-400"
              type="submit"
            >
              Add {title}
            </button>
            <button
              className="mx-2 px-2 py-1 hover:bg-gray-800"
              type="button"
              onClick={() => {
                onIsOpenChange(false);
                setTitle("");
              }}
            >
              X
            </button>
          </div>
        </form>
      ) : (
        _openElement
      )}
    </div>
  );
};

export default ClickableForm;
