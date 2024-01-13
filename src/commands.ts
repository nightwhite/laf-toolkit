import * as vscode from "vscode";

// 直接运行本函数
const funcExec = vscode.commands.registerCommand(
  "laf-toolkit.funcs.exec",
  async () => {
    vscode.window.setStatusBarMessage("");
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
