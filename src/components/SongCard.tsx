import { Suspense, useState, lazy } from "react";
import { useDispatch } from "react-redux";
import { Edit2, Trash2 } from "lucide-react";
import styled from "@emotion/styled";

import { Song } from "@/types";
import { AppDispatch } from "@/store";
import { deleteSong } from "@/store/slices/songsSlice";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal/Modal";
import FormSkeleton from "@/components/FormSkeleton";

const EditSongForm = lazy(() => import("@/components/EditSongForm"));

type SongCardProps = {
  song: Song;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.card.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.colors.card.hover};
  }
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6b7280, #4b5563);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.card.foreground};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.25rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function SongCard({ song }: SongCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImagePlaceholder>{song.title.charAt(0).toUpperCase()}</ImagePlaceholder>
      <Content>
        <Title>{song.title}</Title>
        <Subtitle>
          {song.artist}
          {` • ${song.album ? song.album : "Unknown Album"}`}
          {` • ${song.year ? song.year : "Unknown Year"}`}
        </Subtitle>
      </Content>
      {isHovered && (
        <Actions>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            title="Edit song"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            variant="destructive"
            size="md"
            onClick={() => dispatch(deleteSong({ id: song.id }))}
            title="Delete song"
          >
            <Trash2 size={18} />
          </Button>
        </Actions>
      )}
      <Modal
        open={isEditing}
        onOpenChange={setIsEditing}
        title="Edit Song"
        showCloseButton
      >
        <Suspense fallback={<FormSkeleton />}>
          <EditSongForm song={song} />
        </Suspense>
      </Modal>
    </Card>
  );
}
