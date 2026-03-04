import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Trashs from "./components/Trash";
import { Trash2 } from "lucide-react";
import MusicList from "./components/MusicList";
import PlaylistEditor from "./components/PlaylistEditor";
import SaveButton from "./components/SaveButton";
import Menu from "./components/Menu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  // Limpa o localStorage ao carregar o app
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [playlist, setPlaylist] = useState([]);
  const [musics, setMusics] = useState([]);
  const [lastPlaylistName, setLastPlaylistName] = useState(() => {
    try {
      return localStorage.getItem("lastPlaylistName") || "";
    } catch {
      return "";
    }
  });

  const handlePlaylistCreated = (name) => {
    setLastPlaylistName(name);
    try {
      localStorage.setItem("lastPlaylistName", name);
    } catch (e) {
      console.error("Erro salvando nome da playlist:", e);
    }
  };

  useEffect(() => {
    fetch(
      "https://corsproxy.io/?https://api.deezer.com/chart/0/tracks?limit=500",
    )
      .then((res) => res.json())
      .then((data) => {
        setMusics(data.data || []);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "musics" &&
      destination.droppableId === "playlist"
    ) {
      const movedMusic = musics[source.index];
      setPlaylist((prev) => [...prev, movedMusic]);
      setMusics((prev) => prev.filter((_, i) => i !== source.index));
      return;
    }

    if (
      source.droppableId === "playlist" &&
      destination.droppableId === "playlist" &&
      source.index !== destination.index
    ) {
      const items = Array.from(playlist);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setPlaylist(items);
    }
  };

  const savePlaylist = () => {
    if (playlist.length === 0) {
      alert("Nenhuma música na playlist para salvar");
      return;
    }

    const name = prompt("Digite um nome para a playlist:");
    if (!name) return;

    try {
      const stored = localStorage.getItem("playlists");
      const list = stored ? JSON.parse(stored) : [];
      const id = Date.now();
      list.push({ id, name });
      localStorage.setItem("playlists", JSON.stringify(list));
      localStorage.setItem(`playlist_${id}`, JSON.stringify(playlist));
      handlePlaylistCreated(name);
      alert("Playlist salva com sucesso");
    } catch (e) {
      console.error("Erro ao salvar playlist:", e);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="w-[100vw] h-[100vh] bg-gray-50">
              <div className="w-full max-h-30 bg-gray-50 flex items-center justify-center relative">
                <div className="absolute left-4 top-10">
                  <Menu onPlaylistCreated={handlePlaylistCreated} />
                </div>
                <div className="p-10">
                  <Header
                    showMenu={false}
                    playlistName={lastPlaylistName}
                    onPlaylistCreated={handlePlaylistCreated}
                  />
                </div>
                <div className="absolute right-6 top-12">
                  <SaveButton onClick={savePlaylist} className="" />
                </div>
                <div className="absolute right-40 top-10 gap-2 flex bg-gray-50 text-sky-900">
                  <Search
                    musics={musics}
                    onSearch={(music) => {
                      setPlaylist((prev) => [...prev, music]);
                      setMusics((prev) =>
                        prev.filter((m) => m.id !== music.id),
                      );
                    }}
                  />
                  <Trashs />
                </div>
              </div>
              <Droppable droppableId="playlist">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[500px] h-[620px] rounded-xl shadow-[0_-10px_15px_5px_rgba(0,0,0,0.1)] absolute left-1/2 top-56 -translate-x-1/2 flex flex-col items-center justify-start overflow-y-auto transition-all ${
                      snapshot.isDraggingOver ? "bg-sky-50" : "bg-white"
                      //snapshot = estado atual do drag
                      // isDraggingOver = se o item está sendo arrastado sobre esse droppable
                    }`}
                  >
                    {playlist.length === 0 ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-center px-4">
                        <div>
                          <p className="text-lg font-semibold">
                            Arraste músicas aqui
                          </p>
                          <p className="text-sm">
                            ou use a busca para adicionar
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full p-4 flex flex-col">
                        {playlist.map((music, index) => (
                          <Draggable
                            //draggable = itens que podem ser arrastados
                            key={`${music.id}-${index}`}
                            draggableId={`${music.id}-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ minWidth: 0, width: "100%" }}
                                className={`flex justify-between items-center p-3 mb-2 rounded-lg transition-all w-full ${
                                  snapshot.isDragging
                                    ? "bg-sky-200 shadow-md"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                              >
                                <div className="flex-1 min-w-0 flex items-center gap-2">
                                  <span className="font-bold text-xs text-sky-700">
                                    {index + 1}.
                                  </span>
                                  <div className="truncate">
                                    <p className="font-semibold text-sm truncate">
                                      {music.title}
                                    </p>
                                    <p className="text-xs text-gray-600 truncate">
                                      {music.artist?.name ||
                                        "Artista desconhecido"}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setPlaylist((prev) =>
                                      prev.filter((_, i) => i !== index),
                                    );
                                  }}
                                  className="ml-2 text-red-600 hover:bg-red-100 px-2 py-1 rounded transition-colors"
                                  title="Remover música"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <div style={{ minWidth: 0, width: "100%" }}>
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="musics" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[1910px] h-36 bg-white/30 rounded-xl shadow-[-5px_15px_10px_20px_rgba(1,0,0,0.1)] absolute justify-center items-center left-1/2 -translate-x-1/2 bottom-2 transition-all ${
                      snapshot.isDraggingOver ? "bg-white/50" : "bg-white/30"
                    }`}
                  >
                    <MusicList musics={musics} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        }
      />
      <Route path="/playlist/:id" element={<PlaylistEditor />} />
    </Routes>
  );
}

export default App;
