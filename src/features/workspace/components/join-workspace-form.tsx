"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useJoinWorkspace } from "@/features/workspace/api/use-join-workspace";
import { useInvitecode } from "@/features/workspace/hooks/use-invitecode";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}
export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInvitecode();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7">
          <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
            <Button disabled={isPending} variant="secondary" type="button" asChild size="lg" className="w-full lg:w-fit">
              <Link href="/">Cancel</Link>
            </Button>
            <Button onClick={onSubmit} disabled={isPending} size="lg" type="button" className="w-full lg:w-fit">
              Join Workspace
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
