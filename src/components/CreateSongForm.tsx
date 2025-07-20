import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import type { RootState } from "@/store";
import { createSong } from "@/store/slices/songsSlice";
import type { CreateSongPayload } from "@/types";

const Form = styled.form`
  margin: ${({ theme }) => theme.spacing.xs} auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary.focus};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.muted.background};
  color: ${({ theme }) => theme.colors.muted.foreground};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.background};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background-color: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.primary.foreground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted.background};
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;

  &.success {
    color: ${({ theme }) => theme.colors.accent.foreground};
  }

  &.error {
    color: ${({ theme }) => theme.colors.destructive.background};
  }
`;

export default function CreateSongForm() {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.songs.status.createSong
  );
  const error = useSelector(
    (state: RootState) => state.songs.errors.createSong
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
        ...form,
        year: form.year ? parseInt(form.year.toString(), 10) : undefined,
      };
      dispatch(createSong(payload));
    } catch (err) {
      console.error("Error creating song:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
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
          value={form.year ?? ""}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Creating..." : "Create Song"}
      </Button>

      {status === "success" && (
        <Status className="success">Song created successfully!</Status>
      )}
      {status === "error" && (
        <Status className="error">{error || "Something went wrong."}</Status>
      )}
    </Form>
  );
}
