/**
 * The storage namespace
 * @descCN 存储命名空间
 */
declare namespace StorageType {
  /**
   * The local storage
   * @descCN 本地存储
   */
  interface Local {
    /**
     * The i18n language
     * @descCN 国际化语言
     */
    language: App.I18n.LangType;
    /**
     * The theme mode
     * @descCN 主题模式
     */
    themeMode: 'dark' | 'light' | 'system';
  }
}
