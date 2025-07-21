import { useState, lazy, Suspense } from "react";
import { css } from "@emotion/react";
import { Plus } from "lucide-react";

import { Modal } from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/Button";
import FormSkeleton from "@/components/FormSkeleton";

const CreateSongForm = lazy(() => import("@/components/CreateSongForm"));

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
        <Suspense fallback={<FormSkeleton />}>
          <CreateSongForm />
        </Suspense>
      </Modal>
    </>
  );
};

export default AddSongModal;
