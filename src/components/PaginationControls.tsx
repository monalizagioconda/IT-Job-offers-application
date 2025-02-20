import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "./lib/types";

type PaginationControlsProps = {
  currentPage: number;
  totalNumberOfPages: number;
  onClick: (direction: PageDirection) => void;
};

export default function PaginationControls({ currentPage, totalNumberOfPages, onClick }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton direction="previous" currentPage={currentPage} onClick={() => onClick("previous")} />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton direction="next" currentPage={currentPage} onClick={() => onClick("next")} />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button
      onClick={e => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
