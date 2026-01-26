import { createFileRoute } from '@tanstack/react-router';
import ServerError from '@/components/common/server-error';

export const Route = createFileRoute('/(errors)/500')({
  staticData: {
    title: '500',
    i18nKey: 'system.serverError',
  },
  component: ServerError,
});
