import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/app';
import Appearance from './modules/appearance';
import General from './modules/general';
import Layout from './modules/layout';

function ThemeDrawer() {
  const { t } = useTranslation();

  const showThemeDrawer = useAppStore((state) => state.systemConfig.showThemeDrawer);
  const toggleThemeDrawer = useAppStore((state) => state.toggleThemeDrawer);

  return (
    <Sheet open={showThemeDrawer} onOpenChange={toggleThemeDrawer}>
      <SheetContent side="right" className="z-100" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{t('theme.drawer.title')}</SheetTitle>
        </SheetHeader>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="h-10 w-full">
              <TabsTrigger value="appearance">{t('theme.drawer.tabs.appearance')}</TabsTrigger>
              <TabsTrigger value="layout">{t('theme.drawer.tabs.layout')}</TabsTrigger>
              <TabsTrigger value="general">{t('theme.drawer.tabs.general')}</TabsTrigger>
            </TabsList>
            <TabsContent value="appearance">
              <Appearance />
            </TabsContent>
            <TabsContent value="layout">
              <Layout />
            </TabsContent>
            <TabsContent value="general">
              <General />
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button className="flex-1">{t('theme.drawer.footer.copyConfig')}</Button>
          <Button variant="outline" className="flex-1">
            {t('theme.drawer.footer.resetConfig')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ThemeDrawer;
