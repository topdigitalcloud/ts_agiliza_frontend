export const links = [
  {
    name: "Meu Perfil",
    auth: true,
    sublinks: [
      { name: "Alterar Senha", link: "/password" },
      { name: "Alterar Dados", link: "/profile" },
    ],
  },
  {
    name: "Documentos",
    auth: true,
    sublinks: [
      { name: "Upload", link: "/upload" },
      { name: "Configurações", link: "/config" },
      { name: "ART", link: "/art" },
      { name: "Laudos Radiométricos", link: "/laudos" },
      { name: "Projetos", link: "/projetos" },
    ],
  },
];
