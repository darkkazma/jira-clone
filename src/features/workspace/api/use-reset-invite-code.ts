import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspace)[":workspaceId"]["reset-invite-code"]["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspace)[":workspaceId"]["reset-invite-code"]["$post"]>;

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[":workspaceId"]["reset-invite-code"]["$post"]({ param });
      if (!response.ok) {
        throw new Error("Failed to reset invite code--");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("reset invite code");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Filed to reset invite code");
    },
  });

  return mutation;
};
