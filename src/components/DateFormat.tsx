import React from "react";

type Props = {
  data: Date;
};

const DateFormat = ({ data }: Props) => {
  const dateFormat = new Date(data).toLocaleDateString();
  return <span>{dateFormat}</span>;
};

export default DateFormat;
