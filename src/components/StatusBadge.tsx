import { Badge } from "@jofrom/design-system/ui";
import { statusBadge, type StatusKind } from "@/lib/prototype-data";

export function StatusBadge({
  kind,
  label,
}: {
  kind: StatusKind;
  label: string;
}) {
  const { variant, color } = statusBadge[kind];
  return (
    <Badge variant={variant} color={color} size="sm">
      {label}
    </Badge>
  );
}
