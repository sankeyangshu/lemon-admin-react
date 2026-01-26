/**
 * The global namespace for the app
 * @descCN 应用全局类型
 */
declare namespace App {
  /**
   * I18n namespace
   * @descCN 国际化命名空间
   */
  namespace I18n {
    /**
     * Language type
     * @descCN 语言类型
     */
    type LangType = 'en-US' | 'zh-CN';

    /**
     * Language option
     * @descCN 语言选项
     */
    interface LangOption {
      value: LangType;
      text: string;
    }

    /**
     * i18n scheme
     * @descCN i18n key
     */
    interface I18nScheme {
      system: {
        checkUrl: string;
        errorFallback: string;
        forbidden: string;
        goHome: string;
        loading: string;
        notFound: string;
        refreshAgain: string;
        serverError: string;
        title: string;
        updateCancel: string;
        updateConfirm: string;
        updateContent: string;
        updateTitle: string;
        themeMode: string;
        systemTheme: string;
        confirm: string;
        cancel: string;
        noMore: string;
      };
      login: {
        title: string;
        subTitle: string;
        form: {
          userName: string;
          password: string;
        };
        placeholder: {
          username: string;
          password: string;
        };
        rememberPwd: string;
        forgetPwd: string;
        btnText: string;
        otherSignIn: string;
        noAccount: string;
        register: string;
      };
    }
  }
}
