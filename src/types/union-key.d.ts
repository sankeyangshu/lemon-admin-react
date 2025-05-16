declare namespace UnionKey {
  /**
   * The layout mode(主题布局模式)
   *
   * - vertical: 垂直菜单
   * - 'vertical-mix': 分栏布局
   * - horizontal: 经典布局
   * - 'horizontal-mix': 横向菜单
   */
  type ThemeLayoutMode = 'vertical' | 'vertical-mix' | 'horizontal' | 'horizontal-mix';

  /**
   * The scroll mode when content overflow(内容溢出时滚动模式)
   *
   * - Wrapper: the layout component's wrapper element has a scrollbar
   * - Content: the layout component's content element has a scrollbar
   */
  type LayoutScrollMode = 'content' | 'wrapper';
}
