import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { EditWorkSpaceForm } from "@/features/workspace/components/edit-workspace-form";
import { getWorkspace } from "@/features/workspace/queries";
import { Workspace } from "@/features/types";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}
const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkSpaceForm initialValues={initialValues as Workspace} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
