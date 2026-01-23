import { createFileRoute } from '@tanstack/react-router';
import ServerError from '@/components/common/server-error';

export const Route = createFileRoute('/(errors)/500')({
  component: ServerError,
});
