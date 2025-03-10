"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkSpaceForm } from "@/features/workspace/components/create-workspace-form";
import { useCreateWorkspaceModal } from "@/features/workspace/hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkSpaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
