import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getProject } from "@/features/projects/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { TaskViewSwitcher } from "@/features/task/component/task-view-switcher";

interface ProjectIdPageProps {
  params: { projectId: string };
}
const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValue = await getProject({
    projectId: params.projectId,
  });

  if (!initialValue) {
    throw new Error("Project not found");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValue.name}
            image={initialValue.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValue.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValue.workspaceId}/projects/${initialValue.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};

export default ProjectIdPage;
