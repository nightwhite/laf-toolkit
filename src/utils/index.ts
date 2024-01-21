import * as vscode from "vscode";

/**
 * 输出日志
 * @param outputChannel 输出通道
 * @param logData 日志数据
 * @param logLevel 日志级别
 */
const log = (logData: string, logLevel: string) => {
  let outputChannel = getOutputChannel();
  const date = new Date().toLocaleString();
  outputChannel.appendLine(`${date} [${logLevel}] ${logData}`);
};

/**
 * 全局上下文
 */
let globalContext: vscode.ExtensionContext;
const setGlobalContext = (context: vscode.ExtensionContext) => {
  globalContext = context;
};

let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
  if (!_channel) {
    _channel = vscode.window.createOutputChannel("laf-toolkit");
    _channel.show();
  }
  return _channel;
}

export { log, globalContext, setGlobalContext };
