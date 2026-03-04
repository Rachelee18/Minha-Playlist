import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

function MusicList({ musics, onSave }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Ajuste o valor 300 para a largura do seu card + o gap
      const scrollTo =
        direction === "left" ? scrollLeft - 300 : scrollLeft + 300;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth", // Faz o movimento deslizar suavemente
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center px-4 group">
      <div className="relative w-full flex items-center justify-between flex-1 group">
        {/* Botão para Esquerda */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 z-10 p-2 bg-sky-900/80 rounded-full hover:bg-sky-900 shadow-md transition opacity-0 group-hover:opacity-100 text-white"
        >
          <ChevronLeft />
        </button>

        {/* Container da Lista (Agora com Ref e sem barra visível) */}
        <div
          ref={scrollRef}
          className="w-full h-full flex flex-row overflow-x-auto gap-4 items-center px-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Esconde a barra no Firefox/IE
        >
          {musics.map((music) => (
            <div
              key={music.id}
              className="min-w-[280px] h-24 bg-white rounded-xl shadow-md p-4 flex flex-row items-center gap-4"
            >
              <img
                src={music.album.cover_medium}
                className="w-14 h-14 rounded-lg object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <h4 className="text-sm font-bold truncate w-40">
                  {music.title}
                </h4>
                <p className="text-xs text-gray-500">{music.artist.name}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 z-10 p-2 bg-sky-900/80 rounded-full hover:bg-sky-900 shadow-md transition opacity-0 group-hover:opacity-100 text-white"
        >
          <ChevronRight />
        </button>

        {/* Botão Salvar */}
        {onSave && (
          <button
            onClick={onSave}
            className="px-6 py-2 bg-sky-900 text-white rounded hover:bg-sky-800 transition-colors font-semibold"
          >
            Salvar
          </button>
        )}
      </div>
    </div>
  );
}

export default MusicList;
