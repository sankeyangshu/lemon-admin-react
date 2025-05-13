import enUsTrans from './modules/en-US.json';
import zhCnTrans from './modules/zh-CN.json';

const resources = {
  'en-US': { translation: enUsTrans },
  'zh-CN': { translation: zhCnTrans },
} as const;

export default resources;
