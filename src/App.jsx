import React from "react";
import "./index.css";
import Header from "./components/Header";
import { Search } from "lucide-react";
import Trashs from "./components/Trash";
import MusicList from "./components/MusicList";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-50">
      <div className="w-full max-h-30 bg-gray-50 flex items-center justify-center">
        <div className="p-10">
          <Header />
        </div>
        <div className="absolute right-10 top-14 gap-2 flex bg-gray-50 text-sky-900">
          <Search />
          <Trashs />
        </div>
      </div>
      <div className="w-[500px] h-[620px] bg-white rounded-xl shadow-[0_-10px_15px_5px_rgba(0,0,0,0.1)] absolute left-1/2 top-56 -translate-x-1/2 flex items-center justify-center"></div>
      <div className="w-[1910px] h-36 bg-white/30 rounded-xl shadow-[-5px_15px_10px_20px_rgba(1,0,0,0.1)] absolute justify-center items-center left-1/2 -translate-x-1/2 bottom-2">
        <MusicList />
      </div>
    </div>
  );
}

export default App;
