import { AppDispatch, RootState } from "@/store";
import { changePage } from "@/store/slices/songsSlice";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary.background : "transparent"};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary.foreground : theme.colors.foreground};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:not(:disabled):hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary.hover : theme.colors.muted.hover};
  }
`;

const ArrowButton = styled(PageButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Dots = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const PaginationControls = () => {
  const {
    page: currentPage = 1,
    perPage = 10,
    total: totalSongs,
  } = useSelector((state: RootState) => state.songs);
  const isLoading = useSelector(
    (state: RootState) => state.songs.status.getSongs === "loading"
  );
  const error = useSelector((state: RootState) => state.songs.errors.getSongs);
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.ceil(totalSongs / perPage);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisible);
    }

    if (currentPage > totalPages - half) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <ArrowButton
        onClick={() => dispatch(changePage(currentPage - 1))}
        disabled={currentPage === 1 || isLoading || Boolean(error)}
      >
        <ChevronLeft size={16} />
      </ArrowButton>

      {generatePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <PageButton
            key={index}
            isActive={page === currentPage}
            onClick={() => dispatch(changePage(page))}
          >
            {page}
          </PageButton>
        ) : (
          <Dots key={index}>…</Dots>
        )
      )}

      <ArrowButton
        onClick={() => dispatch(changePage(currentPage + 1))}
        disabled={currentPage === totalPages || isLoading || Boolean(error)}
      >
        <ChevronRight size={16} />
      </ArrowButton>
    </PaginationContainer>
  );
};

export default PaginationControls;
