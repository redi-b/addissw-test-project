import { useState } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import CreateSongForm from "./CreateSongForm";
import { Button } from "@/components/ui/Button";
import { css } from "@emotion/react";
import { Plus } from "lucide-react";

const AddSongModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            font-weight: 600;
          `}
        >
          <Plus size={20} />
          <span>Add Song</span>
        </div>
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Add New Song"
        showCloseButton
      >
        <CreateSongForm />
      </Modal>
    </>
  );
};

export default AddSongModal;
