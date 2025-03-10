import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspace)[":workspaceId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.workspace)[":workspaceId"]["$patch"]>;

export const useUpdateWorkSpace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      console.log("update => ", form);
      const response = await client.api.workspace[":workspaceId"]["$patch"]({ form, param });
      if (!response.ok) {
        throw new Error("Failed to update workspace--");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("WorkSpace updated");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Filed to update WorkSacpe");
    },
  });

  return mutation;
};
