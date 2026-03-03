import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

function Search({ musics, onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // aqui vai filtrar as músicas pelo título ou artista
  const filtered = query
    ? musics.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.artist.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-sky-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir busca"
      >
        <SearchIcon size={28} />
      </button>
      {open && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-white shadow-2xl z-50 flex flex-col p-6 animate-slideIn">
          <div className="flex items-center mb-4">
            <input
              autoFocus
              type="text"
              className="flex-1 border-b-2 border-sky-900 outline-none text-lg px-2 py-1"
              placeholder="Buscar música ou artista..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="ml-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setOpen(false)}
              aria-label="Fechar busca"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {query && filtered.length === 0 && (
              <div className="text-gray-400 mt-8 text-center">
                Nenhuma música encontrada
              </div>
            )}
            {filtered.map((music) => (
              <div
                key={music.id}
                className="flex items-center gap-3 py-2 border-b cursor-pointer hover:bg-sky-50"
                onClick={() => {
                  onSearch && onSearch(music);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <img
                  src={music.album.cover_small}
                  className="w-10 h-10 rounded object-cover"
                  alt=""
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className="font-semibold truncate w-56"
                    title={music.title}
                  >
                    {music.title}
                  </span>
                  <span
                    className="text-xs text-gray-500 truncate w-56"
                    title={music.artist.name}
                  >
                    {music.artist.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
