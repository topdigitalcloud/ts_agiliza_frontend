import React, { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return <main className="container min-h-screen mx-auto">{children}</main>;
};

export default Main;
