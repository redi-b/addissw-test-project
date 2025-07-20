import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { createSong } from "@/store/slices/songsSlice";
import type { CreateSongPayload } from "@/types";
import { LoaderCircle } from "lucide-react";
import { Button, Form, FormGroup, Input, Label } from "@/components/Form";

export default function CreateSongForm() {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.songs.status.createSong
  );

  const [form, setForm] = useState<CreateSongPayload>({
    title: "",
    artist: "",
    album: undefined,
    year: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload: CreateSongPayload = {
        title: form.title.trim(),
        artist: form.artist.trim(),
        album: form.album?.trim() || undefined,
        year: form.year ? parseInt(form.year.toString(), 10) : undefined,
      };
      dispatch(createSong(payload));
    } catch (err) {
      console.error("Error creating song:", err);
    }
  };

  useEffect(() => {
    if (status === "success") {
      setForm({ title: "", artist: "", album: undefined, year: undefined });
    }
  }, [status]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Sema"
          value={form.title}
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
          value={form.artist}
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
          value={form.album ?? ""}
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
          placeholder="e.g. 2018"
          value={form.year ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" disabled={status === "loading"}>
          {status === "loading" && <LoaderCircle size={16} className="animate-spin" />}
          <span>{status === "loading" ? "Creating..." : "Create Song"}</span>
      </Button>
    </Form>
  );
}
