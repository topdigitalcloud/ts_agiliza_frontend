import React from "react";
import { Link } from "lucide-react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

import { systemSelector, getSystemsByStation } from "../../slices/SystemSlice";

type Props = {
  document: string;
  system: string;
  linked: boolean;
};

const SystemActionLinkDoc = ({ document, system, linked }: Props) => {
  //const dispatch = useAppDispatch();
  //const { systems, labels } = useAppSelector(systemSelector);

  return (
    <div>
      <Link className={`cursor-pointer ${linked ? "text-top-digital-buttom-hover" : "text-gray-400"}`} />
    </div>
  );
};

export default SystemActionLinkDoc;
