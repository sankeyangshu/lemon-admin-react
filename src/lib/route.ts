import { isNil, isNotNil, sortBy } from 'es-toolkit';
import { i18n } from '@/locales';

/** 路由节点的运行时形状（只取菜单转换需要的字段） */
interface RouteNode {
  /** 路由 ID */
  id: App.Global.RouteId;
  /** 路由跳转路径 */
  to: App.Global.RoutePath;
  /** 路由选项 */
  options?: {
    staticData?: App.Global.RouteStaticData;
  };
  children?: Record<string, RouteNode>;
}

/**
 * 从路由树中提取菜单配置
 * @param parentRoute 父路由节点（routeTree 或其子节点）
 */
export function getMenusFromRoutes<T extends { children?: object }>(parentRoute: T) {
  const children = Object.values(parentRoute.children ?? {}) as RouteNode[];

  return children.reduce<App.Global.Menu[]>((menus, route) => {
    const { title, i18nKey, icon, label, caption, order, hideInMenu, disabled } = route.options?.staticData ?? {};

    const childMenus = isNotNil(route.children) && Object.keys(route.children).length > 0
      ? getMenusFromRoutes(route)
      : [];

    // 没有 title 的路由（如 _authenticated）不生成菜单项，将子菜单提升
    if (isNil(title) || title === '') {
      menus.push(...childMenus);

      return menus;
    }

    const menu: App.Global.Menu = {
      key: route.id,
      title,
      routeId: route.id,
      routePath: route.to,
      i18nKey,
      icon,
      label,
      caption,
      order,
      hideInMenu,
      disabled,
    };

    if (childMenus.length > 0) {
      menu.children = childMenus;
    }

    menus.push(menu);

    return menus;
  }, []);
}

/**
 * 菜单排序
 * @param menus 菜单配置列表
 */
export function sortMenusByOrder(menus: App.Global.Menu[]) {
  const sorted = sortBy(menus, [(menu) => menu.order ?? 0]);

  sorted.forEach((menu) => {
    if (isNotNil(menu.children) && menu.children.length > 0) {
      menu.children = sortMenusByOrder(menu.children);
    }
  });

  return sorted;
}

/**
 * 将菜单配置转换为运行时菜单项
 * - 过滤 hideInMenu
 * - 翻译 i18nKey
 */
export function transformConfigsToMenus(configs: App.Global.Menu[]) {
  const menus: App.Global.Menu[] = [];

  for (const config of configs) {
    if (config.hideInMenu)
      continue;

    const title = isNotNil(config.i18nKey) ? i18n.t(config.i18nKey) : config.title;
    const menu: App.Global.Menu = { ...config, title };

    if (isNotNil(config.children) && config.children.length > 0) {
      menu.children = transformConfigsToMenus(config.children);
    }

    menus.push(menu);
  }

  return menus;
}

/**
 * 将树形菜单扁平化为搜索菜单列表
 * @param menus 菜单配置列表
 */
export function flattenToSearchMenus(menus: App.Global.Menu[]) {
  const result: Omit<App.Global.Menu, 'children'>[] = [];

  for (const menu of menus) {
    const { children, ...rest } = menu;
    result.push(rest);

    if (isNotNil(children) && children.length > 0) {
      result.push(...flattenToSearchMenus(children));
    }
  }

  return result;
}
