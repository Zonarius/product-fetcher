import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'stderr' }
  },
  categories: {
    default: { appenders: ["out"], level: "info" }
  }
});
export const logger = log4js.getLogger();
