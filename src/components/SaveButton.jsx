import React from "react";

function SaveButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 h-10 bg-sky-900 text-white rounded hover:bg-sky-800 transition-colors font-semibold ${className}`}
    >
      Salvar
    </button>
  );
}

export default SaveButton;
