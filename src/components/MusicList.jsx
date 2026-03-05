import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Droppable, Draggable } from "react-beautiful-dnd";

function MusicList({ musics }) {
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

        <Droppable droppableId="musics" direction="horizontal">
          {(provided) => (
            <div
              ref={(node) => {
                scrollRef.current = node;
                provided.innerRef(node);
              }}
              {...provided.droppableProps}
              className="w-full h-full flex flex-row overflow-x-auto gap-4 items-center px-12 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {musics.map((music, index) => (
                <Draggable
                  key={`musics-${music.id}-${index}`}
                  draggableId={`musics-${music.id}-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`min-w-[280px] h-24 bg-white rounded-xl shadow-md p-4 flex flex-row items-center gap-4 transition-all ${
                        snapshot.isDragging ? "bg-sky-200 shadow-lg" : ""
                      }`}
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
                        <p className="text-xs text-gray-500">
                          {music.artist.name}
                        </p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 z-10 p-2 bg-sky-900/80 rounded-full hover:bg-sky-900 shadow-md transition opacity-0 group-hover:opacity-100 text-white"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MusicList;
