# Playlist App — Documentação Completa

## Visão Geral

O Playlist App é uma aplicação web moderna desenvolvida em React, que permite ao usuário pesquisar músicas em tempo real, criar playlists personalizadas arrastando músicas, nomear e salvar playlists no navegador. O projeto integra a API pública do Deezer para busca de músicas e utiliza localStorage para persistência das playlists criadas. A interface é responsiva, intuitiva e oferece feedback visual para todas as ações.

## Funcionalidades

- **Pesquisa de músicas:** Busca dinâmica e ilimitada na API do Deezer, permitindo encontrar qualquer música disponível na plataforma.
- **Arrastar e soltar:** Adicione músicas à sua playlist de forma intuitiva usando drag-and-drop (react-beautiful-dnd).
- **Criação e nomeação de playlists:** Dê um nome à sua playlist antes de salvá-la.
- **Persistência local:** Playlists são salvas no localStorage, permanecendo disponíveis mesmo após fechar o navegador.
- **Visualização e edição de playlists:** Exibe as músicas da playlist criada, permite editar nome e músicas, e listar todas as playlists salvas em um menu dedicado.
- **Exclusão de músicas e playlists:** Remova músicas individualmente ou exclua playlists inteiras. Músicas removidas podem ir para uma lixeira temporária.
- **Interface moderna:** Feedback visual para ações de busca, arrastar, salvar e excluir.

## Regras e Fluxo de Uso

- O usuário pode pesquisar músicas por nome ou artista (API Deezer).
- Músicas podem ser arrastadas da lista de disponíveis para a área da playlist.
- O nome da playlist pode ser editado e salvo.
- Playlists são salvas e recuperadas do localStorage.
- O menu permite navegar, criar, renomear e excluir playlists.
- Músicas removidas da playlist podem ser restauradas da lixeira.
- O localStorage é limpo ao carregar o app (útil para testes, pode ser removido em produção).

## Requisitos

### Funcionais

- Pesquisar músicas por nome ou artista.
- Arrastar músicas para criar/editar playlists.
- Nomear e salvar playlists no navegador.
- Visualizar, editar e excluir playlists.
- Remover músicas individualmente ou todas de uma playlist.
- Interface responsiva e intuitiva.

### Não-Funcionais

- Persistência local das playlists (mesmo após fechar o navegador).
- Feedback visual para todas as ações.
- Utilização de API pública para busca de músicas.

## Tecnologias Utilizadas

- [React](https://react.dev/) (com hooks: useState, useEffect)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (estilização)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (drag-and-drop)
- [lucide-react](https://lucide.dev/) (biblioteca de ícones)
- [Deezer API](https://developers.deezer.com/) (busca de músicas)
- [localStorage] (persistência)
- [react-router-dom] (navegação entre telas)
- [ESLint, PostCSS] (qualidade e processamento CSS)

## Estrutura do Projeto

- `src/App.jsx`: Componente principal, gerencia playlists, músicas, lixeira e integra todos os componentes. Controla o estado global e define as rotas.
- `src/components/Header.jsx`: Exibe o título do app e o nome da playlist atual.
- `src/components/Search.jsx`: Busca músicas na API Deezer, controla loading, erros e resultados.
- `src/components/MusicList.jsx`: Lista horizontal de músicas disponíveis para adicionar à playlist, com drag-and-drop.
- `src/components/Trash.jsx`: Exibe músicas excluídas (lixeira), permite restaurar ou remover definitivamente.
- `src/components/Menu.jsx`: Lista de playlists salvas, permite criar, renomear, excluir e navegar entre playlists.
- `src/components/SaveButton.jsx`: Botão estilizado para salvar playlists.
- `src/components/PlaylistEditor.jsx`: Tela de edição de playlists salvas, permite editar nome e músicas.
- `public/`, `index.html`, `index.css`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `package.json`: arquivos de configuração e estrutura base do projeto.

## Como Usar

1. Clone o repositório e acesse a pasta do projeto.

(https://github.com/Rachelee18/Minha-Playlist)

2. Instale as dependências:

- npm install

- npm install react-router-dom

- npm install lucide-react@0.435.0

- npm install react-beautiful-dnd --legacy-peer-deps

- npm install tailwindcss@3.4.10 postcss@8.4.41 autoprefixer@10.4.20 --legacy-peer-deps

3. Inicie o servidor de desenvolvimento:

- npm run dev

4. Acesse a aplicação no navegador pelo endereço exibido no terminal.

## Diferenciais

- **Busca ilimitada:** Pesquisa qualquer música disponível na API do Deezer, sem limitação local.
- **Experiência visual:** Interface moderna, responsiva e intuitiva, com feedback visual para todas as ações.
- **Persistência automática:** Playlists são salvas automaticamente no localStorage ao serem criadas ou modificadas.
- **Drag and Drop avançado:** Permite reordenar músicas na playlist e adicionar/remover facilmente.
- **Menu de playlists:** Gerencie múltiplas playlists, navegue, crie, renomeie e exclua.
- **Lixeira de músicas:** Segurança extra para exclusão, com possibilidade de restaurar músicas removidas.

## Possíveis Melhorias Futuras

- Compartilhamento de playlists via link.
- Edição e remoção individual de músicas da playlist.
- Autenticação de usuário para playlists na nuvem.
- Exportação/importação de playlists.
- Busca avançada por gênero.
- Integração com outras APIs de música.
- Trocar o Index dentro da playlist.
- Melhorar a UI/UX com animações e transições.
- Drag and Drop para reordenar músicas dentro da playlist.
- Implementar Drag and Drop no Search.jsx para buscar músicas da playlist.
- Integrar API de Streaming de Filmes.

## Detalhamento dos Componentes e Fluxo

### App.jsx

Controla o estado global das músicas disponíveis, playlist atual, nome da playlist, lixeira e lista de playlists. Implementa Drag and Drop, salva/carrega playlists do localStorage, define rotas e integra todos os componentes.

### Header.jsx

Exibe o título do app e o nome da playlist atual.

### Search.jsx

Permite buscar músicas na API Deezer, controla loading, erros e resultados. Ao selecionar uma música, adiciona à playlist.

### MusicList.jsx

Exibe lista horizontal de músicas disponíveis, com drag-and-drop e botões para rolar horizontalmente.

### PlaylistEditor.jsx

Tela de edição de playlists salvas, permite editar nome, adicionar/remover músicas e salvar alterações.

### Menu.jsx

Lista de playlists salvas, permite criar, renomear, excluir e navegar entre playlists.

### SaveButton.jsx

Botão estilizado para salvar playlists.

### Trash.jsx

Exibe lixeira de músicas deletadas, permite restaurar ou remover definitivamente músicas da lixeira.

## Fluxo de Dados e Hooks

- O estado global é mantido em App.jsx e passado para componentes via props.
- Hooks useState e useEffect controlam listas, nomes, loading, erros e sincronizam dados com localStorage.
- Eventos de clique, input e drag-and-drop atualizam o estado e a UI em tempo real.

## Telas da Aplicação

- **Tela Principal:** Criação de nova playlist, busca e adição de músicas, salvar playlist.
- **Editor de Playlist:** Edição de playlists salvas, adicionar/remover músicas, editar nome.
- **Menu:** Lista de playlists salvas, criar nova, renomear, excluir.
- **Lixeira:** Músicas removidas, com opção de restaurar.

## Perguntas Frequentes

- Como funciona o fluxo de criação de uma playlist? O usuário busca músicas, arrasta para a playlist, edita o nome e salva. Os dados são persistidos no localStorage.
- Como as músicas são buscadas? Via API do Deezer, usando fetch e proxy para CORS.
- Como funciona o Drag and Drop? Usando react-beautiful-dnd, músicas podem ser arrastadas da lista para a playlist e reordenadas.
- Como as playlists são salvas? No localStorage, com nome e lista de músicas.
- Como a aplicação lida com múltiplas playlists? O Menu permite criar, renomear, excluir e navegar entre playlists.
- Como garantir que não haja músicas duplicadas na playlist? Ao adicionar, a música é removida da lista de disponíveis.
- Como funciona a busca personalizada? O componente Search faz fetch na API Deezer com a query do usuário.

---

**Atualizado em 05/03/2026**
