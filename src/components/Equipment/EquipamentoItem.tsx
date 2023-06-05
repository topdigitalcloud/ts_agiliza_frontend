import { TEquipment } from "../../Interfaces/IEquipment";

const EquipamentoItem = (equipamento: TEquipment) => {
  return (
    <tr>
      <td className="border px-8 py-4">{equipamento.nomeEntidade}</td>
      <td className="border px-8 py-4">{equipamento.alturaAntena}</td>
      <td className="border px-8 py-4">
        {equipamento.dataPrimeiroLicenciamento}
      </td>
    </tr>
  );
};

export default EquipamentoItem;
