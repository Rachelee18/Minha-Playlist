import Menu from "./Menu";

function Header({ playlistName, onPlaylistCreated }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center">
        <Menu onPlaylistCreated={onPlaylistCreated} />
      </div>

      <div className="flex flex-col items-start">
        <h1 className="@theme --font- font-sans text-sky-900 text-5xl font-bold">
          My Playlist App
        </h1>
        {playlistName && (
          <p className="text-sky-900 text-lg font-semibold mt-1">
            {playlistName}
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
