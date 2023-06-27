import React from "react";

type Props = {
  timestamp: string;
};

const DataUnixTimeStamp = ({ timestamp }: Props) => {
  const date = new Date(parseInt(timestamp));
  return <div className="text-purple-950 font-semibold">{date.toLocaleDateString()}</div>;
};

export default DataUnixTimeStamp;
