import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/common/not-found';

export const Route = createFileRoute('/(errors)/404')({
  component: NotFound,
});
