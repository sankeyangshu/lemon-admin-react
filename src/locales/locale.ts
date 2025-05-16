import enUsTrans from './modules/en-US';
import zhCnTrans from './modules/zh-CN';

const resources = {
  'en-US': { translation: enUsTrans },
  'zh-CN': { translation: zhCnTrans },
} as const;

export default resources;
