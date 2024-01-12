import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("lafjs", "恭喜你，你的插件已激活！");

  // 创建一个 WebviewPanel 实例，用于显示侧边栏视图
  const panel = vscode.window.createWebviewPanel(
    "lafjs", // 唯一标识侧边栏视图
    "Laf Toolkit", // 侧边栏视图的标题
    vscode.ViewColumn.One, //vscode.ViewColumn.,Beside // 给新 的webview 面板一个编辑器视图 // 侧边栏视图的显示位置
    {
      enableScripts: true, // 允许在 Webview 中执行脚本
    }
  );

  const lafjsExec = vscode.commands.registerCommand(
    "laf-toolkit.exec",
    async () => {
      vscode.window.setStatusBarMessage("");
    }
  );

  context.subscriptions.push(lafjsExec);
}
// This method is called when your extension is deactivated
export function deactivate() {}
