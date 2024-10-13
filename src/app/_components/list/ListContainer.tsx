import React, { isValidElement } from "react";

type Props = {
  padding?: boolean;
  background?: boolean;
  children: React.ReactNode;
};

const ListContainer = ({ padding, background, children }: Props) => {
  return (
    <div
      className={`h-fit w-[272px] flex-shrink-0 overflow-hidden rounded-xl text-gray-300 ${background != false ? "bg-black" : ""} ${padding ? "px-2 py-2" : ""}`}
    >
      {children}
    </div>
  );
};

export default ListContainer;
