import * as vscode from "vscode";

/**
 * 输出日志
 * @param outputChannel 输出通道
 * @param logData 日志数据
 * @param logLevel 日志级别
 */
const log = (outputChannel: any, logData: string, logLevel: string) => {
  const date = new Date().toLocaleString();
  outputChannel.appendLine(`${date} [${logLevel}] ${logData}`);
};

const gitExtensionCheck = async () => {
  try {
    const vs_git = vscode.extensions.getExtension("vscode.git");
    console.log(vs_git);
    if (void 0 !== vs_git) {
      return (
        vs_git.isActive ? vs_git.exports : await vs_git.activate()
      ).getAPI(1);
    }
  } catch (e) {
    console.log("vscode.git not installed!!");
  }
};

export { log, gitExtensionCheck };
