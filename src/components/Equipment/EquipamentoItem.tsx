import { TEquipment } from "../../Interfaces/IEquipment";

type Props = {
  equipamento: TEquipment;
};

const EquipamentoItem = ({ equipamento }: Props) => {
  return (
    <tr key={equipamento._id}>
      <td className="border px-8 py-4">{equipamento.NomeEntidade}</td>
      <td className="border px-8 py-4">{equipamento.AlturaAntena}</td>
      <td className="border px-8 py-4">{equipamento.DataPrimeiroLicenciamento}</td>
    </tr>
  );
};

export default EquipamentoItem;
