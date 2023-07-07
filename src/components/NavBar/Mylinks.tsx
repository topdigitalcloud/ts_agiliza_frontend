export const links = [
  {
    name: "Meu Perfil",
    auth: true,
    sublinks: [
      { name: "Alterar Senha", link: "/password", navLink: true },
      { name: "Alterar Dados", link: "/profile", navLink: true },
    ],
  },
  {
    name: "Documentos",
    auth: true,
    sublinks: [
      { name: "Upload", link: "/upload", navLink: false },
      { name: "Tipos de Documentos", link: "/doctype", navLink: true },
      { name: "Configurações Estações", link: "/configstation", navLink: true },
      { name: "Configurações Sistemas", link: "/configsystem", navLink: true },
    ],
  },
];
