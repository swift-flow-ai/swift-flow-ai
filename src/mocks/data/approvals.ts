import { Approval } from "../../types/workspace";

export const mockApprovals: Approval[] = [];

export function getApprovalsByWorkspace(): Approval[] {
  return mockApprovals.filter((a) => a.status === "pending");
}

export function getApprovalById(approvalId: string): Approval | undefined {
  return mockApprovals.find((a) => a.id === approvalId);
}
