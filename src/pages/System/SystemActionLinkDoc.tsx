import React, { MouseEvent, useEffect, useState } from "react";
import { Link } from "lucide-react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

import {
  linkSystemDocSelector,
  setDocToSystem,
  removeDocFromSystem,
  resetLinkSystemDocSlice,
} from "../../slices/LinkSystemDocSlice";

type Props = {
  document: string;
  system: string;
  linked: boolean;
};

const SystemActionLinkDoc = ({ document, system, linked }: Props) => {
  const dispatch = useAppDispatch();
  const { success, message, loading } = useAppSelector(linkSystemDocSelector);
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [dDocumento, setDDocumento] = useState<string>("");
  const [sSistema, setSSistema] = useState<string>("");

  //inicalizing isLinked
  useEffect(() => {
    setIsLinked(linked);
    setDDocumento(document);
    setSSistema(system);
  }, [linked, document, system]);

  const handleIsLinked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = {
      system: sSistema,
      document: dDocumento,
    };
    if (isLinked) {
      dispatch(removeDocFromSystem(obj));
    } else {
      dispatch(setDocToSystem(obj));
    }
  };

  useEffect(() => {
    if (success && message["successSystem"] === sSistema && message["successDoc"] === dDocumento) {
      setIsLinked((l) => !l);
      console.log("CERTO");
    }
    if (success && message["successSystem"] === system && message["successDoc"] === document) {
      console.log("ERRADO");
    }
  }, [success, message, sSistema, dDocumento, dispatch, document, system]);

  useEffect(() => {
    dispatch(resetLinkSystemDocSlice());
  }, [dispatch, success]);

  return (
    <div>
      <button title="Avançar" disabled={loading === true} onClick={handleIsLinked}>
        <Link className={`cursor-pointer ${isLinked ? "text-top-digital-buttom-hover" : "text-gray-400"}`} />
      </button>
    </div>
  );
};

export default SystemActionLinkDoc;
