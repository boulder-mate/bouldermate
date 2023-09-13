enum LoggingLevel {
  SILLY = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

export class Logger {
  private name: string;
  private level: LoggingLevel = LoggingLevel.DEBUG;

  constructor(name: string) {
    this.name = name;
  }

  public static of(arg: Function): Logger {
    return new Logger(arg.name);
  }

  public silly(content: any) {
    if (this.level > LoggingLevel.SILLY) {
      return;
    }

    var str = `${new Date().toISOString()} silly [${this.name}] ${content}`;
    console.log(str);
  }

  public debug(content: any) {
    if (this.level > LoggingLevel.DEBUG) {
      return;
    }
    var str = `${new Date().toISOString()} debug  [${this.name}] ${content}`;
    console.log(str);
  }

  public info(content: any) {
    if (this.level > LoggingLevel.INFO) {
      return;
    }
    var str = `${new Date().toISOString()} info  [${this.name}] ${content}`;
    console.log(str);
  }

  public warn(content: any) {
    if (this.level > LoggingLevel.WARN) {
      return;
    }
    var str = `${new Date().toISOString()} warn  [${this.name}] ${content}`;
    console.log(str);
  }

  public error(content: any) {
    if (this.level > LoggingLevel.ERROR) {
      return;
    }
    var str = `${new Date().toISOString()} error [${this.name}] ${content}`;
    console.log(str);
  }

  public fatal(content: any) {
    var str = `${new Date().toISOString()} fatal [${this.name}] ${content}`;
    console.log(str);
  }
}
