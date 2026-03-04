import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Trash as TrashIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./Header";
import Search from "./Search";
import MusicList from "./MusicList";
import SaveButton from "./SaveButton";

function PlaylistEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistMusics, setPlaylistMusics] = useState([]);
  const [allMusics, setAllMusics] = useState([]);

  const [hover, setHover] = useState(false);

  useEffect(() => {
    const loadData = () => {
      // Carregar playlists e músicas do localStorage no mount
      try {
        const raw = localStorage.getItem("playlists");
        const playlists = raw ? JSON.parse(raw) : [];
        const playlist = playlists.find((p) => p.id === parseInt(id));

        if (playlist) {
          setPlaylistName(playlist.name);
          const musicsRaw = localStorage.getItem(`playlist_${id}`);
          const musics = musicsRaw ? JSON.parse(musicsRaw) : [];
          setPlaylistMusics(musics);
        }
      } catch (error) {
        console.error("Erro ao carregar playlist:", error);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    // Carregar todas as músicas
    fetch("https://corsproxy.io/?https://api.deezer.com/chart/0/tracks?limit=500")
      .then((res) => res.json())
      .then((data) => {
        setAllMusics(data.data || []);
      })
      .catch((error) => console.error("Erro ao carregar músicas:", error));
  }, []);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "musics" &&
      destination.droppableId === "playlist"
    ) {
      const movedMusic = allMusics[source.index];
      setPlaylistMusics([...playlistMusics, movedMusic]);
    }
  };

  const savePlaylist = () => {
    try {
      const playlists = JSON.parse(localStorage.getItem("playlists") || "[]");
      const playlistIndex = playlists.findIndex((p) => p.id === parseInt(id));
      if (playlistIndex !== -1) {
        playlists[playlistIndex].name = playlistName;
        localStorage.setItem("playlists", JSON.stringify(playlists));
      }
      localStorage.setItem(`playlist_${id}`, JSON.stringify(playlistMusics));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const removeMusic = (index) => {
    setPlaylistMusics(playlistMusics.filter((_, i) => i !== index));
  };

  const handleSearch = (music) => {
    setPlaylistMusics((prev) => [...prev, music]);
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="w-[100vw] h-[100vh] bg-gray-50">
        <div className="w-full max-h-30 bg-gray-50 flex items-center justify-between px-10 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sky-900 hover:bg-sky-100 rounded px-3 py-2 transition-colors"
              title="Voltar para home"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-4">
              <Header playlistName={playlistName} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sky-900 font-semibold">Nome:</span>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="px-3 py-2 border-b-2 border-sky-900 outline-none bg-transparent text-sky-900 font-semibold"
              />
            </div>
            <Search musics={allMusics} onSearch={handleSearch} />
            <div
              onClick={() => {
                // remover playlist do armazenamento e redirecionar
                try {
                  const stored = localStorage.getItem("playlists");
                  const list = stored ? JSON.parse(stored) : [];
                  const filtered = list.filter((p) => p.id !== parseInt(id));
                  localStorage.setItem("playlists", JSON.stringify(filtered));
                  localStorage.removeItem(`playlist_${id}`);
                } catch (e) {
                  console.error("Erro ao deletar playlist:", e);
                }
                navigate("/");
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`
          w-14 h-14 flex items-center justify-center
          rounded-full transition-all duration-200 cursor-pointer
          ${hover ? "bg-red-500 shadow-lg scale-110" : "bg-gray-50 hover:bg-red-100"}
        `}
            >
              <TrashIcon
                size={24}
                className={hover ? "text-white" : "text-red-600"}
              />
            </div>
            <SaveButton onClick={savePlaylist} />
          </div>
        </div>

        {/* Container da Playlist */}
        <Droppable droppableId="playlist">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`w-[500px] h-[620px] rounded-xl shadow-[0_-10px_15px_5px_rgba(0,0,0,0.1)] absolute left-1/2 top-56 -translate-x-1/2 flex flex-col items-center justify-start overflow-y-auto transition-all ${
                snapshot.isDraggingOver ? "bg-sky-50" : "bg-white"
              }`}
            >
              {playlistMusics.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-center px-4">
                  <div>
                    <p className="text-lg font-semibold">Arraste músicas aqui</p>
                    <p className="text-sm">ou use a busca para adicionar</p>
                  </div>
                </div>
              ) : (
                <div className="w-full p-4">
                  {playlistMusics.map((music, index) => (
                    <Draggable
                      key={`${music.id}-${index}`}
                      draggableId={`${music.id}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex justify-between items-center p-3 mb-2 rounded-lg transition-all ${
                            snapshot.isDragging
                              ? "bg-sky-200 shadow-md"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                              {music.title}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {music.artist?.name || "Artista desconhecido"}
                            </p>
                          </div>
                          <button
                            onClick={() => removeMusic(index)}
                            className="ml-2 text-red-600 hover:bg-red-100 px-2 py-1 rounded transition-colors"
                            title="Remover música"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </div>
          )}
        </Droppable>

        {/* MusicList na parte inferior */}
        <Droppable droppableId="musics" type="MUSIC">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`w-[1910px] h-36 rounded-xl shadow-[-5px_15px_10px_20px_rgba(1,0,0,0.1)] absolute justify-center items-center left-1/2 -translate-x-1/2 bottom-2 transition-all ${
                snapshot.isDraggingOver ? "bg-white/50" : "bg-white/30"
              }`}
            >
              <MusicList musics={allMusics} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default PlaylistEditor;
