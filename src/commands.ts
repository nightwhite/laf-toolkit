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

// 拉取全部云函数
const pullAll = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.pullAll",
  async (event) => {
    // 删除前确认
    const confirm = await vscode.window.showInformationMessage(
      "确认拉取全部云函数？将会覆盖本地全部云函数！",
      "确认",
      "取消"
    );
    if (confirm === "确认") {
      utils.log("拉取全部云函数", "Info");
      // 拉取逻辑 todo
    }
  }
);

// 发布全部云函数
const pushAll = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.pushAll",
  async (event) => {
    // 删除前确认
    const confirm = await vscode.window.showInformationMessage(
      "确认发布全部云函数？将会覆盖云端全部云函数！",
      "确认",
      "取消"
    );
    if (confirm === "确认") {
      utils.log("发布全部云函数", "Info");
      // 全部逻辑 todo
    }
  }
);

// 新增云函数
const add = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.add",
  async (event) => {
    // 新增云函数名称弹出填写
    const name = await vscode.window.showInputBox({
      prompt: "函数唯一标识，如 get-user，可以使用 user/get-user 的形式来创建文件夹。可用符号：a-z A-Z 0-9 _ - / .",
      placeHolder: "请输入云函数名称",
      ignoreFocusOut: true,
    });
    if (name) {
      utils.log("新增云函数：" + name, "Info");
      // 新增逻辑 todo
    }
  }
);

//  查看帮助文档
const help = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.help",
  async (event) => {
    // 跳转到帮助文档
    utils.log("查看帮助文档", "Info");
    vscode.env.openExternal(
      vscode.Uri.parse("https://github.com/nightwhite/laf-toolkit")
    );
  }
);

//  同步云端依赖
const syncDep = vscode.commands.registerCommand(
  "laf-toolkit.views.funcs.syncDep",
  async (event) => {
    // 删除前确认
    const confirm = await vscode.window.showInformationMessage(
      "确认同步云端依赖？！",
      "确认",
      "取消"
    );
    if (confirm === "确认") {
      utils.log("同步云端依赖", "Info");
      // 同步云端依赖 todo 拉取后，弹出 npm 框让用户自己手动安装
    }
  }
);

const commands = [login, push, pullAll, pushAll, refresh, del, add, help, syncDep];
export default commands;
