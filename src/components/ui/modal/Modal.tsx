import * as Dialog from "@radix-ui/react-dialog";
import {
  Overlay,
  Content,
  CloseButton,
  Title,
  Description,
} from "./Modal.styles";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
};

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true,
}: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Overlay />
      <Content>
        {showCloseButton && (
          <CloseButton aria-label="Close">
            <X />
          </CloseButton>
        )}
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Content>
    </Dialog.Portal>
  </Dialog.Root>
);
