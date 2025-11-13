/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkflowComment } from "../../types/collaboration";

export const mockComments: WorkflowComment[] = [];

export function getWorkflowComments(_workflowId: string): WorkflowComment[] {
  return [];
}

export function getNodeComments(
  _workflowId: string,
  _nodeId: string
): WorkflowComment[] {
  return [];
}

export function getUnresolvedCommentCount(_workflowId: string): number {
  return 0;
}

export function getTotalCommentCount(_workflowId: string): number {
  return 0;
}

export function getUserMentions(_userId: string): WorkflowComment[] {
  return [];
}
