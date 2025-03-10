import { CreateWorkSpaceForm } from "@/features/workspace/components/create-workspace-form";
import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkSpaceForm />
    </div>
  );
};

export default WorkspaceCreatePage;
