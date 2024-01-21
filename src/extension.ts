import * as vscode from "vscode";
import commands from "./commands";
import * as utils from "./utils/index";
import { FuncsView } from "./views/funcs";
import { DatabaseView } from "./views/database";
let outputChannel: any;

export async function activate(context: vscode.ExtensionContext) {
  utils.setGlobalContext(context);
  utils.log("laf-toolkit 已激活", "Info");
  for (const command of commands) {
    context.subscriptions.push(command);
  }

  new FuncsView(context);
  new DatabaseView(context);
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}

