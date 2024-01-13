import * as vscode from "vscode";
import commands from "./commands";
import * as utils from "./utils/index";
let outputChannel: any;

export async function activate(context: vscode.ExtensionContext) {
  await utils.gitExtensionCheck();
  outputChannel = vscode.window.createOutputChannel("Laf-Toolkit");
  outputChannel.show(true);
  utils.log(outputChannel, "laf-toolkit is now active", "Info");
  for (const command of commands) {
    context.subscriptions.push(command);
  }
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}
