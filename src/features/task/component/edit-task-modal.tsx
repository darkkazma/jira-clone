"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "@/features/task/hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "@/features/task/component/edit-task-modal-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />} 
    </ResponsiveModal>
  );
};
