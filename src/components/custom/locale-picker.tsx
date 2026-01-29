import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/provider/locale';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import SvgIcon from './svg-icon';

function LocalePicker({ className }: { className?: string }) {
  const { locale, localeOptions, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: App.I18n.LangType) => {
    setLocale(value);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        openOnHover
        delay={10}
        closeDelay={100}
        render={(
          <Button variant="ghost" className="cursor-pointer">
            <SvgIcon
              icon="mdi:translate"
              className={cn('size-6!', className)}
            />
          </Button>
        )}
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={handleValueChange}
          >
            {localeOptions.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.text}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LocalePicker;
