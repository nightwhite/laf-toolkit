import * as vscode from "vscode";
import * as utils from "./utils/index";

const login = vscode.commands.registerCommand(
  "laf-toolkit.user.login",
  async () => {
    vscode.window.showInformationMessage("登录成功");
    utils.log("登录日志", "Info");
  }
);

const commands = [login];
export default commands;
