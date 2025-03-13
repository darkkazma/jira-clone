import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DatePicker } from "@/components/date-picker";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const projectOptions = projects?.documents.map(project => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map(member => ({
    value: member.$id,
    label: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers;

  const [{
    status,
    assigneeId,
    projectId,
    dueDate
  }, setFilters] = useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : value as TaskStatus });
  }

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : value as TaskStatus });
  }

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : value as TaskStatus });
  }

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined} onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="전체 진행" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 진행</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>기록</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>진행 중</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>리뷰 중</SelectItem>
          <SelectItem value={TaskStatus.TODO}>할일</SelectItem>
          <SelectItem value={TaskStatus.DONE}>완료</SelectItem>
        </SelectContent>
      </Select>

{/* Assignee */}
      <Select
        defaultValue={assigneeId ?? undefined} onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="전체 담당자" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 담당자</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

{/*  Project */}
      <Select
        defaultValue={projectId ?? undefined} onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <FolderIcon className="size-4 mr-2" />
            <SelectValue placeholder="전체 프로젝트" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 프로젝트</SelectItem>
          <SelectSeparator />
          {projectOptions?.map((project) => (
            <SelectItem key={project.value} value={project.value}>
              {project.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 

{/*  Date */}
      <DatePicker placeholder="종료일" className="h-8 w-full lg:w-auto" value={dueDate ? new Date(dueDate) : undefined} onChange={(date) => {
        setFilters({ dueDate: date ? date.toISOString() : null})
      }} />
    </div>
  );
};
