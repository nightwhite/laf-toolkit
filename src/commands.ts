import * as vscode from "vscode";
import * as utils from "./utils/index";
import { FuncsView } from "./views/funcs";
import * as fs from "fs";
import * as path from "path";

const login = vscode.commands.registerCommand(
  "laf-toolkit.user.login",
  async () => {
    vscode.window.showInformationMessage("登录成功");
    utils.log("登录日志", "Info");
  }
);

// 右键第一个按钮，发布云函数
const push = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.right-click.push",
  async (event) => {
    console.log(event);
    utils.log("右键第一个按钮", "Info");
  }
);

// 刷新本地云函数列表
const refresh = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.refresh",
  async (event) => {
    utils.log("刷新", "Info");
    new FuncsView(utils.globalContext);
  }
);

// 删除云函数
const del = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.right-click.del",
  async (event) => {
    // 删除前确认
    const confirm = await vscode.window.showInformationMessage(
      "确认删除云函数？",
      "确认",
      "取消"
    );
    if (confirm === "确认") {
      utils.log("删除云函数", "Info");
      // 拼接完整路径
      const fullPath = vscode.workspace.workspaceFolders
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : "";
      console.log(fullPath);
      const rootPath = path.join(fullPath, "laf-cloud/functions");
      // 删除文件
      fs.unlinkSync(path.join(rootPath, event.key));
      // 删除 yaml 文件
      fs.unlinkSync(path.join(rootPath, event.key.replace(/.ts$/, ".yaml")));
      // 刷新视图
      new FuncsView(utils.globalContext);
    }
  }
);

const commands = [login, push];
export default commands;
