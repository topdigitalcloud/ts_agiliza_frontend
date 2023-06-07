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
      { name: "Licenças", link: "/licensas" },
      { name: "ART", link: "/art" },
      { name: "Laudos Radiométricos", link: "/laudos" },
      { name: "Projetos", link: "/projetos" },
    ],
  },
];
