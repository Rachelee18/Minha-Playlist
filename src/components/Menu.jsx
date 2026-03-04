import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Plus, Trash2 } from "lucide-react";

function Menu({ onPlaylistCreated }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  // Carregar playlists do localStorage
  useEffect(() => {
    const loadPlaylists = () => {
      try {
        const raw = localStorage.getItem("playlists");
        const parsed = raw ? JSON.parse(raw) : [];
        setPlaylists(parsed);
      } catch (e) {
        console.error("Erro ao carregar playlists:", e);
        setPlaylists([]);
      }
    };
    loadPlaylists();
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  const savePlaylists = (list) => {
    setPlaylists(list);
    try {
      localStorage.setItem("playlists", JSON.stringify(list));
    } catch (e) {
      console.error("Erro ao salvar playlists:", e);
    }
  };

  const startCreate = () => {
    setIsAdding(true);
    setNewName("");
    // focus será chamado no useEffect abaixo
  };

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const commitCreate = () => {
    const name = (newName || "").trim();
    if (!name) {
      setIsAdding(false);
      setNewName("");
      return;
    }
    const newPlaylist = { id: Date.now(), name };
    const newList = [...playlists, newPlaylist];
    savePlaylists(newList);
    if (onPlaylistCreated) onPlaylistCreated(name);
    setIsAdding(false);
    setNewName("");
    setOpen(false);
    // o usuário permanece na página principal
  };

  const cancelCreate = () => {
    setIsAdding(false);
    setNewName("");
  };

  const deletePlaylist = (id) => {
    const newList = playlists.filter((p) => p.id !== id);
    savePlaylists(newList);
    try {
      localStorage.removeItem(`playlist_${id}`);
    } catch (e) {
      console.error("Erro ao deletar playlist:", e);
    }
  };

  const openPlaylist = (id) => {
    setOpen(false);
    navigate(`/playlist/${id}`);
  };

  return (
    <div className="relative" ref={ref}>
      {/* BOTÃO REDONDO ANIMADO */}
      <div
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          w-14 h-14 flex items-center justify-center
          rounded-full cursor-pointer transition-all duration-200
          ${hover ? "bg-sky-900 shadow-lg scale-110" : "bg-gray-50 hover:bg-sky-100"}
        `}
        aria-label="Abrir menu de playlists"
      >
        <MenuIcon size={24} className={hover ? "text-white" : "text-sky-900"} />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="font-semibold text-sky-900">Playlists</div>
            <button
              onClick={startCreate}
              className="flex items-center gap-1 text-sky-900 hover:text-white hover:bg-sky-900 rounded px-2 py-1"
              aria-label="Criar nova playlist"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="border-t" />

          <div className="max-h-48 overflow-y-auto">
            {playlists.length === 0 && !isAdding ? (
              <div className="p-4 text-sm text-gray-500">Nenhuma playlist criada</div>
            ) : (
              <>
                {playlists.map((p) => (
                  <div
                    key={p.id}
                    className="px-4 py-2 hover:bg-sky-50 cursor-pointer truncate flex items-center justify-between group"
                    title={p.name}
                  >
                    <div
                      onClick={() => openPlaylist(p.id)}
                      className="flex-1 truncate"
                    >
                      {p.name}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(p.id);
                      }}
                      className="hidden group-hover:flex items-center justify-center text-red-600 hover:bg-red-100 rounded p-1 transition-colors"
                      title="Deletar playlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {isAdding && (
                  <div className="px-4 py-2 flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitCreate();
                        if (e.key === "Escape") cancelCreate();
                      }}
                      onBlur={() => commitCreate()}
                      className="flex-1 border-b border-gray-300 outline-none px-2 py-1"
                      placeholder="Nome da playlist"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
