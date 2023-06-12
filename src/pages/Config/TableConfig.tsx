import { useState, MouseEvent, useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

//icons
import { X, Save } from "lucide-react";

//redux
import { reset, getConfig, setConfig, configSelector } from "../../slices/ConfigSlice";

//types
import { TConfig } from "../../Interfaces/IConfig";

const TableConfig = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TConfig>({
    _id: "",
    campo: "",
    label: "",
    order: 0,
    visible: true,
  });

  const dispatch = useAppDispatch();
  const { config, loading, success, error } = useAppSelector(configSelector);

  const handleEditForm = (e: MouseEvent<HTMLButtonElement>, config: TConfig) => {
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
    <div className="flex justify-center mt-5 ">
      <table className="shadow-lg bg-white text-left">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-4 py-2">Campo</th>
            <th className="bg-blue-100 border text-left px-4 py-2">Apelido</th>
            <th className="bg-blue-100 border text-left px-4 py-2">Ordem</th>
            <th className="bg-blue-100 border text-left px-4 py-2">Exibir</th>
            <th className="bg-blue-100 border text-left px-4 py-2"></th>
          </tr>
        </thead>
        {!isEditing && (
          <tbody>
            {config &&
              config.length !== 0 &&
              config.map((conf) => (
                <tr key={conf._id}>
                  <td className="border px-4 py-2">{conf.campo}</td>
                  <td className="border px-4 py-2">{conf.label}</td>
                  <td className="border px-4 py-2">{conf.order}</td>
                  <td className="border px-4 py-2">
                    {conf.visible && <input type="checkbox" checked readOnly disabled />}
                    {!conf.visible && <input type="checkbox" readOnly disabled />}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={(e) => {
                        handleEditForm(e, conf);
                      }}
                      className="bg-top-digital hover:bg-top-digital-hover hover:text-white px-4 py-2 rounded-md"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
        {isEditing && (
          <tbody>
            <tr key={editForm._id}>
              <td className="border px-4 py-2">{editForm.campo}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="label"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })}
                />
              </td>
              <td className="border px-4 py-2 border-top-digital">
                <input
                  className="w-10 outline-21"
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

              <td className="border px-4 py-2">
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
              <td className="border px-4 py-2">
                <button title="Cancelar Edição" className="px-1 py-2" onClick={handleCancelEdit}>
                  <X />
                </button>
                <button title="Salvar Edição" className="px-1 py-2" onClick={handleSaveEdit}>
                  <Save />
                </button>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableConfig;
