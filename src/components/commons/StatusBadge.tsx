import { Badge } from "@/components/ui/badge";
import { statusVariant, type StatusKind } from "@/lib/commons/prototype-data";

export function StatusBadge({
  kind,
  label,
}: {
  kind: StatusKind;
  label: string;
}) {
  return <Badge variant={statusVariant[kind]}>{label}</Badge>;
}
