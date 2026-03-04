import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Trashs from "./components/Trash";
import MusicList from "./components/MusicList";
import PlaylistEditor from "./components/PlaylistEditor";
import SaveButton from "./components/SaveButton";
import Menu from "./components/Menu";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
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
      setPlaylist([...playlist, movedMusic]);
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
                <div className="absolute left-4 top-14">
                  <Menu onPlaylistCreated={handlePlaylistCreated} />
                </div>
                <div className="p-10">
                  <Header showMenu={false} playlistName={lastPlaylistName} onPlaylistCreated={handlePlaylistCreated} />
                </div>
                <div className="absolute right-10 top-14 gap-2 flex bg-gray-50 text-sky-900">
                  <Search
                    musics={musics}
                    onSearch={(music) => {
                      setPlaylist((prev) => [...prev, music]);
                      setMusics((prev) => prev.filter((m) => m.id !== music.id));
                    }}
                  />
                  <Trashs />
                  <SaveButton onClick={savePlaylist} />
                </div>
              </div>
              <div className="w-[500px] h-[620px] bg-white rounded-xl shadow-[0_-10px_15px_5px_rgba(0,0,0,0.1)] absolute left-1/2 top-56 -translate-x-1/2 flex items-center justify-center"></div>
              <div className="w-[1910px] h-36 bg-white/30 rounded-xl shadow-[-5px_15px_10px_20px_rgba(1,0,0,0.1)] absolute justify-center items-center left-1/2 -translate-x-1/2 bottom-2">
                <MusicList musics={musics} playlistName={lastPlaylistName} />
              </div>
            </div>
          </DragDropContext>
        }
      />
      <Route path="/playlist/:id" element={<PlaylistEditor />} />
    </Routes>
  );
}

export default App;
