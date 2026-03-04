import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";

function Search({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // aqui vai buscar as músicas usando a API do Deezer sempre que a query mudar, e armazenar os resultados, o estado de loading e possíveis erros
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      if (results.length > 0) setResults([]);
      if (error) setError(null);
      return;
    }
    const fetchMusics = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        setResults(data.data || []);
      } catch {
        setError("Erro ao buscar músicas");
      } finally {
        setLoading(false);
      }
    };
    fetchMusics();
    // esse comentario é para evitar o warning do React sobre as dependências do useEffect,
    // já que queremos que ele rode apenas quando a query mudar, e não quando os resultados ou erros mudarem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          w-14 h-14 flex items-center justify-center
          rounded-full transition-all duration-200 cursor-pointer
          ${hover ? "bg-sky-900 shadow-lg scale-110" : "bg-gray-50 hover:bg-sky-100"}
        `}
      >
        <SearchIcon
          size={28}
          className={hover ? "text-white" : "text-sky-900"}
        />
      </div>

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
            {loading && (
              <div className="text-gray-400 mt-8 text-center">Buscando...</div>
            )}
            {error && (
              <div className="text-red-400 mt-8 text-center">{error}</div>
            )}
            {query && !loading && results.length === 0 && !error && (
              <div className="text-gray-400 mt-8 text-center">
                Nenhuma música encontrada
              </div>
            )}
            {results.map((music) => (
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
