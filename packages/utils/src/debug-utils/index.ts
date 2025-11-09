/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-console */
export class DebugUtils {
  public static isAllowDebug() {
    return process.env.NODE_ENV === 'development' || typeof window === 'undefined';
  }

  public static logS(params?: any) {
    if (this.isAllowDebug()) {
      this.debug('=======================================>');
      this.debug(params);
      this.debug('=======================================>');
    }
  }

  public static debug(_params?: any) {
    if (this.isAllowDebug()) {
      console.log(_params);
    }
  }

  public static dir(_params?: any) {
    if (this.isAllowDebug()) {
      console.dir(_params);
    }
  }
}
