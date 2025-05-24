// taskea-docs/docusaurus.config.js
// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Taskea',
  tagline: 'Documentação Técnica Completa do Projeto Taskea',
  favicon: 'img/taskea.png', // Assumindo que taskea.png também pode ser o favicon. Crie um favicon.ico se preferir.

  url: 'https://taskea.example.com', // SUBSTITUA PELA URL FINAL DO SEU SITE PUBLICADO
  baseUrl: '/',

  organizationName: 'dev-netinho', // Teu user/org do GitHub
  projectName: 'Taskea-Node.JS', // Nome do teu repositório

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  // docusaurus.config.js
// ...
presets: [
  [
    'classic',
    /** @type {import('@docusaurus/preset-classic').Options} */
    ({
      docs: {
        sidebarPath: './sidebars.js',
        editUrl: 'https://github.com/dev-netinho/Taskea-Node.JS/tree/main/taskea-docs/', // Ou remove se não quiseres
        routeBasePath: '/', // <<< ADICIONA OU ALTERA ESTA LINHA PARA '/'
      },
      blog: false, 
      theme: {
        customCss: './src/css/custom.css',
      },
    }),
  ],
],
// ...

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/taskea.png', // Imagem para redes sociais (pode ser o teu logo)
      navbar: {
        title: 'Taskea',
        logo: {
          alt: 'Taskea Logo',
          src: 'img/taskea.png', // Caminho para o teu logo em static/img/
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar', // Mantendo o ID que já estavas a usar
            position: 'left',
            label: 'Documentação Taskea',
          },
          {
            href: 'https://github.com/dev-netinho/Taskea-Node.JS',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
footer: {
  style: 'dark',
  links: [
    {
      title: 'Documentação',
      items: [
        {
          label: 'Introdução',
          to: '/', // ALTERADO
        },
        {
          label: 'Back-end',
          // Se o nome do teu ficheiro backend é "DocumentacaoTecnicadoBackend-ProjetoTaskea.md"
          // e está na pasta "docs/backend/", o caminho URL será "/backend/DocumentacaoTecnicadoBackend-ProjetoTaskea"
          to: '/backend/DocumentacaoTecnicadoBackend-ProjetoTaskea', // ALTERADO
        },
      ],
    },
          {
            title: 'Mais',
            items: [
              {
                label: 'GitHub do Projeto Taskea',
                href: 'https://github.com/dev-netinho/Taskea-Node.JS',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Taskea. Construído com Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['javascript', 'css', 'json'], // Adiciona linguagens se necessário
      },
    }),
};

export default config;