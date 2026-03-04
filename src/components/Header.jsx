function Header({ playlistName }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex flex-col items-center gap-6">
        <h1 className="@theme --font- font-sans text-sky-900 text-5xl font-bold">
          My Playlist App
        </h1>
      </div>
    </div>
  );
}

export default Header;
