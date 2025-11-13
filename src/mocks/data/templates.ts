/* eslint-disable @typescript-eslint/no-unused-vars */
import { WorkflowTemplate } from "../../types/workspace";

export const mockTemplates: WorkflowTemplate[] = [];

export function getTemplates(
  _category?: string,
  _featured?: boolean,
  _search?: string
): WorkflowTemplate[] {
  return [];
}

export function getTemplateById(
  _templateId: string
): WorkflowTemplate | undefined {
  return undefined;
}
