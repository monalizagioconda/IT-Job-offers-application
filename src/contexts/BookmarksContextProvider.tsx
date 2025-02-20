import { createContext } from "react";
import { useLocalStorage } from "../components/lib/hooks";

export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage("bookmarkedIds", []);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
    } else {
      setBookmarkedIds(prev => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
