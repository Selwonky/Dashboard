import {
  workObjects,
  inboxItems,
  queueActions,
  outputs,
  orgChart,
  tools,
  departments,
  objectById as protoObjectById,
  objectsByDept as protoObjectsByDept,
  outputBySourceObject as protoOutputBySourceObject,
  deptLabel as protoDeptLabel,
  type WorkObject,
  type InboxItem,
  type QueueAction,
  type OutputRecord,
  type ToolConn,
  type OrgDepartment,
  type Department,
  type DepartmentId,
} from "@/lib/prototype-data";
import { deptCategories } from "@/lib/navigation";

export function getObjects(): WorkObject[] {
  return workObjects;
}

export function getObject(id: string): WorkObject | undefined {
  return protoObjectById(id);
}

export function getInbox(): InboxItem[] {
  return inboxItems;
}

export function getQueue(): QueueAction[] {
  return queueActions;
}

export function getOutputs(): OutputRecord[] {
  return outputs;
}

export function getOrgChart(): OrgDepartment[] {
  return orgChart;
}

export function getTools(): ToolConn[] {
  return tools;
}

export function getDepartments(): Department[] {
  return departments;
}

export function getDepartmentCategories(departmentId: string) {
  return deptCategories[departmentId as DepartmentId] ?? [];
}

export function getObjectsByDept(departmentId: string): WorkObject[] {
  return protoObjectsByDept(departmentId as DepartmentId);
}

export function getOutputBySourceObject(objectId: string): OutputRecord | undefined {
  return protoOutputBySourceObject(objectId);
}

export function getDeptLabel(id: string): string {
  return protoDeptLabel(id as DepartmentId);
}

export function search(q: string): WorkObject[] {
  const lower = q.toLowerCase();
  return workObjects.filter(
    (o) =>
      o.title.toLowerCase().includes(lower) ||
      o.preview?.toLowerCase().includes(lower) ||
      o.typeLabel.toLowerCase().includes(lower),
  );
}
