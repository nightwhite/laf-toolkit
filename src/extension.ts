import * as vscode from "vscode";
import * as utils from "./utils/index";
let outputChannel: any;

export async function activate(context: vscode.ExtensionContext) {
  await utils.gitExtensionCheck();
  outputChannel = vscode.window.createOutputChannel("Laf-Toolkit");
  outputChannel.show(true);
  utils.log(outputChannel, "laf-toolkit is now active", "Info");
  const lafjsExec = vscode.commands.registerCommand(
    "laf-toolkit.exec",
    async () => {
      vscode.window.setStatusBarMessage("");
    }
  );

  context.subscriptions.push(lafjsExec);
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}