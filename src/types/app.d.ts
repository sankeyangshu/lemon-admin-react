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
      api: {
        errMsg400: string;
        errMsg401: string;
        errMsg403: string;
        errMsg404: string;
        errMsg405: string;
        errMsg408: string;
        errMsg500: string;
        errMsg501: string;
        errMsg502: string;
        errMsg503: string;
        errMsg504: string;
        errMsg505: string;
        errMsgDefault: string;
        requestCancelled: string;
        networkError: string;
        requestConfigError: string;
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

  /**
   * The storage namespace
   * @descCN 存储命名空间
   */
  namespace Storage {
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
}
