import * as vscode from "vscode";
import { get } from "./utils/http";
import * as fs from "fs";
import * as path from "path";
import * as utils from "./utils/index";
const outputChannel = vscode.window.createOutputChannel("Laf-Toolkit");
outputChannel.show(true);

async function checkPath(): Promise<boolean | string> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage('根目录文件为空或者不存在，请检查后重试！！！');
    throw new Error("No workspace folder found.");
  }
  const fsPath = workspaceFolders[0].uri.fsPath;
  const vscodeFolderPath = path.join(fsPath, "laf-cloud");
  const lafPath = path.join(vscodeFolderPath, ".laf");
  const lafJsonPath = path.join(lafPath, "laf.json");
  const lafExecJsonPath = path.join(lafPath, "laf-exec.json");

  try {
    // 检查文件是否存在
    const filesExist = await Promise.all([
      fs.promises.access(lafJsonPath, fs.constants.F_OK).then(() => true).catch(() => false),
      fs.promises.access(lafExecJsonPath, fs.constants.F_OK).then(() => true).catch(() => false)
    ]);

    if (!filesExist.every((exists) => exists)) {
      vscode.window.showErrorMessage('文件.laf/laf.json|laf-exec.json为空或者不存在，请检查或者重新初始化！！！');
      return false;
    }
    return true;
  } catch (error:any) {
    vscode.window.showErrorMessage('文件查找失败，请检查后重试！！！');
    return error.message;
  }
}

// 直接运行本函数
const funcExec = vscode.commands.registerCommand(
  "laf-toolkit.funcs.exec",
  async () => {
    vscode.window.setStatusBarMessage("开始执行云函数");
    // 检查文件是否存在
    // await checkPath();
    vscode.window.setStatusBarMessage("执行云函数");
  }
);

// 初始化云环境
const systemInit = vscode.commands.registerCommand(
  "laf-toolkit.system.init",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 发布全部云函数
const funcPushAll = vscode.commands.registerCommand(
  "laf-toolkit.funcs.pushAll",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 下载全部云函数
const funcPullAll = vscode.commands.registerCommand(
  "laf-toolkit.funcs.pullAll",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 发布单个云函数
const funcPush = vscode.commands.registerCommand(
  "laf-toolkit.funcs.push",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 下载单个云函数
const funcPull = vscode.commands.registerCommand(
  "laf-toolkit.funcs.pull",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 同步线上依赖
const funcDepSync = vscode.commands.registerCommand(
  "laf-toolkit.funcs.depSync",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

// 新增云函数
const funcAddFunc = vscode.commands.registerCommand(
  "laf-toolkit.funcs.addFunc",
  async () => {
    vscode.window.setStatusBarMessage("");
  }
);

const commands = [
  funcExec,
  systemInit,
  funcPushAll,
  funcPullAll,
  funcPush,
  funcPull,
  funcDepSync,
  funcAddFunc,
];
export default commands;
