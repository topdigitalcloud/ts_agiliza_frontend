import { useState, MouseEvent, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//icons
import { X, Save, Edit } from "lucide-react";

//redux
import { reset, setConfig, configSelector } from "../../slices/ConfigStationSlice";

//types
import { TConfigStation } from "../../Interfaces/IConfigStation";

const TableStationConfig = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TConfigStation>({
    _id: "",
    campo: "",
    label: "",
    order: 0,
    visible: true,
  });

  const dispatch = useAppDispatch();
  const { config, loading, success } = useAppSelector(configSelector);

  const handleEditForm = (e: MouseEvent<HTMLButtonElement>, config: TConfigStation) => {
    e.preventDefault();
    setIsEditing(true);
    setEditForm({ ...config });
  };

  const handleCancelEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditForm({
      _id: "",
      campo: "",
      label: "",
      order: 0,
      visible: true,
    });
    setIsEditing(false);
  };

  const handleSaveEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setConfig(editForm));
  };

  useEffect(() => {
    if (success) {
      setEditForm({
        _id: "",
        campo: "",
        label: "",
        order: 0,
        visible: true,
      });
      setIsEditing(false);
    }
    dispatch(reset());
  }, [success, dispatch]);

  if (loading) {
    return <div>Aguarde....</div>;
  }

  return (
    <div className="container mx-auto mt-2">
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
            <th className="bg-top-digital-op-40 p-2 text-top-digital-content-color font-top-digital-title font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Campo
            </th>
            <th className="bg-top-digital-op-40 p-2 text-top-digital-content-color font-top-digital-title font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Apelido
            </th>
            <th className="bg-top-digital-op-40 p-2 text-top-digital-content-color font-top-digital-title font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Ordem
            </th>
            <th className="bg-top-digital-op-40 p-2 text-top-digital-content-color font-top-digital-title font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Exibir
            </th>
            <th className="bg-top-digital-op-40 p-2 text-top-digital-content-color font-top-digital-title font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Editar
            </th>
          </tr>
        </thead>
        {!isEditing && (
          <tbody className="block md:table-row-group">
            {config &&
              config.length !== 0 &&
              config.map((conf, index) => (
                <tr
                  key={conf._id}
                  className={` border border-grey-500 md:border-none block md:table-row ${
                    index % 2 ? "bg-top-digital-op-25" : "bg-white"
                  }`}
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Campo</span>
                    {conf.campo}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Apelido</span>
                    {conf.label}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Ordem</span>
                    {conf.order}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Exibir</span>
                    {conf.visible && <input type="checkbox" checked readOnly disabled />}
                    {!conf.visible && <input type="checkbox" readOnly disabled />}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Editar</span>
                    <button
                      onClick={(e) => {
                        handleEditForm(e, conf);
                      }}
                      className="font-bold py-1 px-2 border rounded"
                    >
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
        {isEditing && (
          <tbody className="block md:table-row-group">
            <tr key={editForm._id} className="border border-grey-500 md:border-none block md:table-row bg-gray-300}">
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold ">Campo</span>
                {editForm.campo}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Label</span>
                <input
                  className="leading-none text-gray-900 p-3 w-64 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                  type="text"
                  name="label"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })}
                />
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell border-top-digital">
                <span className="inline-block w-1/3 md:hidden font-bold">Ordem</span>
                <input
                  className="leading-none text-gray-900 p-3 w-20 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                  type="number"
                  name="order"
                  value={editForm.order}
                  onChange={(e) =>
                    parseInt(e.target.value) > 0 && parseInt(e.target.value) <= config.length
                      ? setEditForm({ ...editForm, [e.target.name]: e.target.value })
                      : e.target.value
                  }
                />
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Exibir</span>
                {editForm.visible ? (
                  <input
                    type="checkbox"
                    name="visible"
                    checked
                    onChange={(e) => {
                      setEditForm({
                        ...editForm,
                        [e.target.name]: e.target.checked,
                      });
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="visible"
                    onChange={(e) => {
                      setEditForm({
                        ...editForm,
                        [e.target.name]: e.target.checked,
                      });
                    }}
                  />
                )}
              </td>
              <td className="p-2  md:border md:border-grey-500 text-left block md:table-cell top-0 right-0">
                <span className="inline-block w-1/3 md:hidden font-bold">Editar</span>
                <button title="Salvar Edição" className="px-1 py-2" onClick={handleSaveEdit}>
                  <Save />
                </button>
                <button title="Cancelar Edição" className="px-1 py-2" onClick={handleCancelEdit}>
                  <X />
                </button>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableStationConfig;
