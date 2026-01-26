import { useLocale } from '@/provider/locale';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import SvgIcon from './svg-icon';

function LocalePicker() {
  const { locale, localeOptions, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={(
        <Button variant="ghost" className="cursor-pointer">
          <SvgIcon
            icon="mdi:translate"
            className="size-6!"
          />
        </Button>
      )}
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={setLocale}
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
