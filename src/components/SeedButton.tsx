import { useDispatch, useSelector } from "react-redux";
import { seedSongs } from "@/store/slices/songsSlice";
import { Button } from "./Form";
import { RootState } from "@/store";
import { css } from "@emotion/react";
import { LoaderCircle } from "lucide-react";

export default function SeedButton() {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.songs.status.seedSongs === "loading"
  );

  return (
    <Button
      css={css`
        width: fit-content;
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
      `}
      onClick={() => dispatch(seedSongs())}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}
      <span>{loading ? "Seeding..." : "Seed Songs"}</span>
    </Button>
  );
}
