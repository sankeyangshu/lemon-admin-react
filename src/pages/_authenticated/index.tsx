import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/home" />;
}
