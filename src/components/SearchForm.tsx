import { useSearchTextContext } from "./lib/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={e => {
          handleChangeSearchText(e.target.value);
          // fetch() // directly in the event handler,- fetch after an event occure, jako response to user event
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
