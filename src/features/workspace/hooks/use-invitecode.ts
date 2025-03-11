import { useParams } from "next/navigation";

export const useInvitecode = () => {
  const params = useParams();
  return params.inviteCode as string;
};
