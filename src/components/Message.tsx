import React from "react";

type Props = {
  msg: unknown;
  type: string;
};

const Message = ({ msg, type }: Props) => {
  return <>{msg}</>;
};

export default Message;
