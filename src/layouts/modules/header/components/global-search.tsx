import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/custom/svg-icon';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Kbd, KbdGroup } from '@/components/ui/kbd';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

function SearchTrigger({ title, isWindows }: { title: string; isWindows: boolean }) {
  return (
    <div className="
      flex h-9 w-40 items-center justify-between rounded-sm border border-border px-2.5
    "
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <SvgIcon icon="mdi:magnify" className="size-4" />
        <span className="ml-1 text-xs font-normal">
          {title}
        </span>
      </div>
      <KbdGroup className="flex h-5 items-center justify-center">
        {isWindows
          ? <Kbd>Ctrl</Kbd>
          : (
              <Kbd>
                <SvgIcon icon="mdi:apple-keyboard-command" />
              </Kbd>
            )}
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  );
}

function SearchInput({ value, placeholder, onChange, onBlur }: SearchInputProps) {
  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <SvgIcon icon="mdi:magnify" className="size-5" />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="h-12"
      />
      <InputGroupAddon align="inline-end">
        <div className="
          flex h-4.5 items-center justify-center rounded-sm border border-border bg-background
          px-1.5 text-muted-foreground
          dark:bg-muted/50
        "
        >
          <SvgIcon icon="mdi:keyboard-return" className="size-4" />
        </div>
      </InputGroupAddon>
    </InputGroup>
  );
}

function GlobalSearch() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // 检测是否为 Windows 系统
  const isWindows = navigator.userAgent.includes('Windows');

  // 键盘快捷键处理
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const isCommandKey = isWindows ? event.ctrlKey : event.metaKey;

      // Cmd/Ctrl + K 打开搜索对话框
      if (isCommandKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
        return;
      }

      // TODO: 上下键的功能暂时未实现

      // 当搜索对话框打开时，处理 Escape 键关闭
      if (open && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open, isWindows]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value.trim());
  };

  const handleSearchBlur = () => {
    // 处理失焦逻辑
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <SearchTrigger
          title={t('theme.header.globalSearch.title')}
          isWindows={isWindows}
        />
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <SearchInput
          value={searchVal}
          placeholder={t('theme.header.globalSearch.placeholder')}
          onChange={handleSearch}
          onBlur={handleSearchBlur}
        />
        <DialogFooter>
          <div className="box-border flex w-full items-center gap-3.5 border-t pt-4.5 pb-1">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                <SvgIcon icon="mdi:keyboard-return" className="size-4" />
              </Kbd>
              <span className="ml-2 text-xs font-normal">{t('theme.header.globalSearch.selectKeyDown')}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                <SvgIcon icon="mdi:arrow-up" className="size-4" />
              </Kbd>
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                <SvgIcon icon="mdi:arrow-down" className="size-4" />
              </Kbd>
              <span className="ml-1 text-xs font-normal">{t('theme.header.globalSearch.switchKeyDown')}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Kbd data-icon="inline-end" className="translate-x-0.5">
                <SvgIcon icon="mdi:keyboard-esc" className="size-4" />
              </Kbd>
              <span className="ml-1 text-xs font-normal">{t('theme.header.globalSearch.exitKeyDown')}</span>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}

export default GlobalSearch;
