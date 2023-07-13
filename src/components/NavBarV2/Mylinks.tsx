//icons
import { RadioTower } from "lucide-react";

export const links = [
  {
    name: "Home",
    link: "/",
    auth: true,
  },
  {
    name: "Meu Perfil",
    auth: true,
    sublinks: [
      { name: "Alterar Senha", link: "/password", navLink: true, icon: RadioTower },
      { name: "Alterar Dados", link: "/profile", navLink: true, icon: RadioTower },
    ],
  },
  {
    name: "Documentos",
    auth: true,
    sublinks: [
      { name: "Upload", link: "/upload", navLink: false, icon: RadioTower },
      { name: "Tipos de Documentos", link: "/doctype", navLink: true, icon: RadioTower },
      { name: "Configurações Estações", link: "/configstation", navLink: true, icon: RadioTower },
      { name: "Configurações Sistemas", link: "/configsystem", navLink: true, icon: RadioTower },
    ],
  },
];
