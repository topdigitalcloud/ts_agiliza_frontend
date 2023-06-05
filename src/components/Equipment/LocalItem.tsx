import { TLocation } from "../../Interfaces/ILocation";

const LocalItem = ({ _id }: TLocation) => {
  const { latitude, longitude, enderecoEstacao } = _id;
  return (
    <tr>
      <td className="border px-8 py-4">{latitude}</td>
      <td className="border px-8 py-4">{longitude}</td>
      <td className="border px-8 py-4">{enderecoEstacao}</td>
    </tr>
  );
};

export default LocalItem;
