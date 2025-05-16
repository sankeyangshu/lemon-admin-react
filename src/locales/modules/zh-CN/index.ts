import theme from './theme';

const local = {
  theme,
  layoutHeader: {
    menuExpandTooltip: '展开菜单',
    menuCollapseTooltip: '折叠菜单',
    langTooltip: '切换语言',
    fullScreenTooltip: '全屏',
    exitFullScreenTooltip: '退出全屏',
    themeTooltip: '主题配置',
  },
  api: {
    errMsg400: '请求失败！请您稍后重试',
    errMsg401: '登录失效！请您重新登录',
    errMsg403: '当前账号无权限访问！',
    errMsg404: '你所访问的资源不存在！',
    errMsg405: '请求方式错误！请您稍后重试',
    errMsg408: '请求超时！请您稍后重试',
    errMsg500: '服务异常！',
    errMsg501: '网络未实现！',
    errMsg502: '网络错误！',
    errMsg503: '服务不可用，服务器暂时过载或维护！',
    errMsg504: '网络超时！',
    errMsgDefault: '请求失败！',
  },
  system: {
    title: 'Galaxy 管理系统',
    goHome: '回到首页',
    checkUrl: '请检查URL地址是否正确, 或点击回到首页。',
    forbidden: '您没有访问权限！',
    notFound: '页面不存在！',
    serverError: '服务器出小差了，请稍后再试！',
    errorFallback: '抱歉，出错了，请稍后再试！',
    refreshAgain: '刷新重试',
  },
};

export default local;
