import { useState } from "react";
import { TrashIcon } from "lucide-react";

function Trashs({ playlist = [], onDeleteAll }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleDeleteAll = () => {
    onDeleteAll && onDeleteAll();
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          w-14 h-14 flex items-center justify-center
          rounded-full transition-all duration-200 cursor-pointer
          ${hover ? "bg-red-500 shadow-lg scale-110" : "bg-gray-50 hover:bg-red-100"}
        `}
      >
        <TrashIcon
          size={28}
          className={hover ? "text-white" : "text-red-600"}
        />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] h-[600px] flex flex-col animate-slideIn">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                Lixeira de músicas
              </h2>
              <button
                className="text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {playlist.length === 0 ? (
                <div className="text-gray-400 text-center mt-8">
                  Ainda não há músicas deletadas
                </div>
              ) : (
                playlist.map((music) => (
                  <div
                    key={music.id}
                    className="flex items-center gap-3 py-3 border-b hover:bg-red-50"
                  >
                    <img
                      src={music.album.cover_small}
                      className="w-10 h-10 rounded object-cover"
                      alt=""
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold truncate w-56">
                        {music.title}
                      </span>
                      <span className="text-xs text-gray-500 truncate w-56">
                        {music.artist.name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t flex justify-center">
              <button
                onClick={handleDeleteAll}
                disabled={playlist.length === 0}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deletar itens permanentemente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Trashs;
