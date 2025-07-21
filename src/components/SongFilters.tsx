import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearch, setSort } from "@/store/slices/songsSlice";
import { ChevronUp, ChevronDown, X } from "lucide-react";

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.foreground};
  width: 320px;
  height: 2.25rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.background};
  }

  &[value=""] ~ button {
    display: none;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.muted.active};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    border-radius: 4px;
  }
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Select = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.typography.fontFamily.default};
  height: 2.25rem;
  width: 8rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const SortOrderButton = styled.button`
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.foreground};
  height: 2.25rem;
  width: 2.25rem;

  &:focus {
    outline: none;
  }

  &:active {
    background: ${({ theme }) => theme.colors.card.active};
  }
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover::after {
    content: "Searches only the current page";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.popover.background};
    color: ${({ theme }) => theme.colors.popover.foreground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
  }
`;

const SongFilters = () => {
  const dispatch = useDispatch();
  const { search, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.songs
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearch(""));
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSort({
        sortBy: e.target.value as keyof Omit<
          RootState["songs"]["songs"][number],
          "id"
        >,
        sortOrder: sortOrder || "asc",
      })
    );
  };

  const handleSortOrderToggle = () => {
    dispatch(
      setSort({
        sortBy: sortBy || "title",
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
      })
    );
  };

  return (
    <FilterWrapper>
      <Tooltip>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Search current page..."
            value={search ?? ""}
            onChange={handleSearchChange}
          />
          <ClearButton onClick={handleClearSearch} title="Clear search">
            <X size={20} />
          </ClearButton>
        </InputWrapper>
      </Tooltip>

      <SortWrapper>
        <Select value={sortBy ?? ""} onChange={handleSortByChange}>
          <option value="" disabled>
            Sort By
          </option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="year">Year</option>
        </Select>

        <SortOrderButton
          onClick={handleSortOrderToggle}
          aria-pressed={sortOrder === "desc"}
          title={`Sort order: ${
            sortOrder === "asc" ? "Ascending" : "Descending"
          }`}
        >
          {sortOrder === "asc" ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </SortOrderButton>
      </SortWrapper>
    </FilterWrapper>
  );
};

export default SongFilters;
