import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/custom/svg-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function LoginForm({
  className,
  ...props
}: ComponentProps<'div'>) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent>
          <form className="
            p-6
            md:p-8
          "
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('login.title')}</h1>
                <p className="text-balance text-muted-foreground">
                  {t('login.subTitle')}
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">{t('login.form.userName')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.placeholder.username')}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('login.form.password')}</FieldLabel>
                  <a
                    href="#"
                    className="
                      ml-auto text-sm text-primary underline-offset-2
                      hover:underline
                    "
                  >
                    {t('login.forgetPwd')}
                  </a>
                </div>
                <Input id="password" type="password" placeholder={t('login.placeholder.password')} required />
              </Field>
              <Field>
                <Button type="submit">{t('login.btnText')}</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {t('login.otherSignIn')}
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <SvgIcon icon="mdi:google" className="size-5!" />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <SvgIcon icon="mdi:wechat" className="size-5!" />
                  <span className="sr-only">Login with Wechat</span>
                </Button>
                <Button variant="outline" type="button">
                  <SvgIcon icon="mdi:github" className="size-5!" />
                  <span className="sr-only">Login with Github</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                {t('login.noAccount')}
                <a href="#" className="ml-1">{t('login.register')}</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
