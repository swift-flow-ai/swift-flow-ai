/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkflowExecution } from "../../types/workspace";

export const mockExecutions: WorkflowExecution[] = [];

export function getExecutionsByWorkspace(
  _workflowId?: string,
  _status?: string
): WorkflowExecution[] {
  return [];
}

export function getExecutionById(
  _executionId: string
): WorkflowExecution | undefined {
  return undefined;
}
