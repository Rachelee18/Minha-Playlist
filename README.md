# Playlists de Músicas

## Visão Geral

O Playlists App é uma aplicação web desenvolvida em React que permite ao usuário pesquisar músicas em tempo real, criar playlists personalizadas arrastando músicas, nomear e salvar playlists no navegador. O projeto integra a API pública do Deezer para busca de músicas e utiliza localStorage para persistência das playlists criadas.

## Funcionalidades

- **Pesquisa de músicas**: Busca dinâmica e ilimitada na API do Deezer, permitindo encontrar qualquer música disponível na plataforma.

- **Arrastar e soltar**: Adicione músicas à sua playlist de forma intuitiva usando drag-and-drop.

- **Criação e nomeação de playlists**: Dê um nome à sua playlist antes de salvá-la.

- **Persistência local**: Playlists são salvas no localStorage, permanecendo disponíveis mesmo após fechar o navegador.

- **Visualização de playlists**: Exibe as músicas da playlist criada e, futuramente, listará todas as playlists salvas em um menu dedicado.

- **Exclusão de playlists**: Possibilidade de remover todas as músicas da playlist atual.

## Requisitos do Projeto

### Requisitos Funcionais

- O usuário deve poder pesquisar músicas por nome ou artista.

- O usuário deve poder arrastar músicas para criar uma nova playlist.

- O usuário deve poder nomear a playlist antes de salvá-la.

- O usuário deve poder salvar playlists no navegador (localStorage).

- O usuário deve poder visualizar as músicas da playlist criada.

- O usuário deve poder remover todas as músicas da playlist criada.

- O sistema deve buscar músicas em tempo real na API do Deezer.

- Interface responsiva e intuitiva.

### Requisitos Não-Funcionais

- Persistência local das playlists (mesmo após fechar o navegador).

- Feedback visual para ações de busca, arrastar e salvar.

- Utilização de API pública para busca de músicas.

## Tecnologias Utilizadas

- [React](https://react.dev/) (com hooks)

- [Vite](https://vitejs.dev/) (build tool)

- [Tailwind CSS](https://tailwindcss.com/) (estilização)

- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (drag-and-drop)

- [lucide](https://lucide.dev/) (biblioteca de icones)

- [Deezer API](https://developers.deezer.com/) (busca de músicas)

## Estrutura do Projeto

- `src/App.jsx`: Componente principal, gerencia playlists, músicas e integra os componentes.

- `src/components/Search.jsx`: Busca músicas na API Deezer.

- `src/components/MusicList.jsx`: Lista de músicas disponíveis para adicionar à playlist.

- `src/components/Trash.jsx`: Permite limpar a playlist criada.

- `src/components/Header.jsx`: Cabeçalho da aplicação.

- `src/components/Menu.jsx`: (Futuro) Listagem de playlists salvas.

## Como Usar

1. Clone o repositório e acesse a pasta do projeto.

(https://github.com/Rachelee18/Minha-Playlist)

2. Instale as dependências:

- npm install

3. Inicie o servidor de desenvolvimento:

- npm run dev

4. Acesse a aplicação no navegador pelo endereço exibido no terminal.

## Diferenciais

- **Busca ilimitada**: O componente Search permite pesquisar qualquer música disponível na API do Deezer, não se limitando a uma lista local.

- **Experiência visual**: Interface moderna, responsiva e intuitiva, com feedback visual para ações de arrastar e soltar.

- **Persistência automática**: Playlists são salvas automaticamente no localStorage ao serem criadas ou modificadas.

## Possíveis Melhorias Futuras

- Compartilhamento de playlists via link.

- Edição e remoção individual de músicas da playlist.

- Autenticação de usuário para playlists na nuvem.
