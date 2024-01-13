import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("lafjs", "恭喜你，你的插件已激活！");

  const lafjsExec = vscode.commands.registerCommand("laf-toolkit.exec", async () => {
  
    vscode.window.setStatusBarMessage("");
  });


  context.subscriptions.push(lafjsExec);
}
// This method is called when your extension is deactivated
export function deactivate() {}
