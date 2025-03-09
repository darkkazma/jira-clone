import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspace)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspace)["$post"]>;

export const useCreateWorkSpace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspace["$post"]({ form });
      if (!response.ok) {
        throw new Error("Failed to create workspace--");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("WorkSpace created");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Filed to create WorkSacpe");
    },
  });

  return mutation;
};
