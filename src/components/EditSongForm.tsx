import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { updateSong } from "@/store/slices/songsSlice";
import type { Song, UpdateSongPayload } from "@/types";
import { LoaderCircle } from "lucide-react";
import { Button, Form, FormGroup, Input, Label } from "@/components/Form";

interface Props {
  song: Song;
  onClose?: () => void;
}

export default function EditSongForm({ song, onClose }: Props) {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.songs.status.updateSong
  );
  const error = useSelector(
    (state: RootState) => state.songs.errors.updateSong
  );

  const [formData, setFormData] = useState<UpdateSongPayload>({
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: song.album ?? "",
    year: Number(song.year) || undefined,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: UpdateSongPayload = {
        id: song.id,
        title: formData.title?.trim(),
        artist: formData.artist?.trim(),
        album: formData.album?.trim() || undefined,
        year: formData.year
          ? parseInt(formData.year.toString(), 10)
          : undefined,
      };
      dispatch(updateSong(payload));
      setSubmitted(true);
    } catch (err) {
      console.error("Error updating song:", err);
    }
  };

  useEffect(() => {
    if (submitted && status === "success") {
      onClose?.();
    }
  }, [submitted, status, onClose]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Sema"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          name="artist"
          placeholder="e.g. Rophnan"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="album">Album (optional)</Label>
        <Input
          id="album"
          name="album"
          placeholder="e.g. Sost"
          value={formData.album ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="year">Year (optional)</Label>
        <Input
          id="year"
          name="year"
          type="number"
          min={1900}
          max={new Date().getFullYear()}
          step="1"
          placeholder="e.g. 2023"
          value={formData.year ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" && (
          <LoaderCircle size={16} className="animate-spin" />
        )}
        <span>{status === "loading" ? "Updating..." : "Update Song"}</span>
      </Button>
    </Form>
  );
}
