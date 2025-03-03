import { createContext, useState } from "react";
import { RESULTS_PER_PAGE } from "../components/lib/constants";
import { useSearchQuery, useSearchTextContext } from "../components/lib/hooks";
import { SortBy, PageDirection, JobItem } from "../components/lib/types";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived / computed state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // event handlers / actions
  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage(prev => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage(prev => prev - 1);
    }
  };
  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
