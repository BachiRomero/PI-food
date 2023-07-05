import "./searchBar.modules.css";

export default function SearchBar({ handleSubmit, handleChange }) {
  return (
    <div>
      <form onChange={handleChange}>
        <input className="searchBar" type="search" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}
