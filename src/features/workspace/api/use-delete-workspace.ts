import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspace)[":workspaceId"]["$delete"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspace)[":workspaceId"]["$delete"]>;

export const useDeleteWorkSpace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[":workspaceId"]["$delete"]({ param });
      if (!response.ok) {
        throw new Error("Failed to delete workspace--");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("WorkSpace deleted");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Filed to delete WorkSacpe");
    },
  });

  return mutation;
};
