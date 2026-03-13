import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import LocalePicker from '@/components/custom/locale-picker';
import SvgIcon from '@/components/custom/svg-icon';
import SwitchDark from '@/components/custom/switch-dark';
import LoginForm from './-components/login-form';

export const Route = createFileRoute('/(auth)/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex min-h-svh items-center justify-center bg-muted"
      style={{
        backgroundImage: 'url(/src/assets/svg-icon/login_bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="
        relative box-border flex h-[94vh] w-[96%] items-center justify-around overflow-hidden
        rounded-xl bg-background/80 px-5
      "
      >
        <div className="
          absolute top-4 left-4 z-20
          md:top-6 md:left-6
        "
        >
          <div className="flex cursor-pointer items-center gap-2 font-medium">
            <SvgIcon localIcon="icon-logo" className="size-6!" />
            <span>{t('system.title')}</span>
          </div>
        </div>

        <div className="
          absolute top-4 right-4 z-20 flex items-center gap-1.5
          md:top-6 md:right-6
        "
        >
          <LocalePicker />
          <SwitchDark />
        </div>

        <div className="
          hidden
          lg:flex lg:w-6/10 lg:items-center lg:justify-center lg:py-12
        "
        >
          <img
            src="/src/assets/images/welcome.png"
            alt="Welcome"
            className="relative z-10 size-full object-contain"
          />
        </div>

        <div className="mx-auto flex max-w-md flex-1 flex-col">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
