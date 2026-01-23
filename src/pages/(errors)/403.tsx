import { createFileRoute } from '@tanstack/react-router';
import Forbidden from '@/components/common/forbidden';

export const Route = createFileRoute('/(errors)/403')({
  component: Forbidden,
});
