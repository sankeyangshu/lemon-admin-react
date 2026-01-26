import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/common/not-found';

export const Route = createFileRoute('/(errors)/404')({
  staticData: {
    title: '404',
    i18nKey: 'system.notFound',
  },
  component: NotFound,
});
