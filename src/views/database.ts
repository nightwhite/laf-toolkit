import * as vscode from "vscode";

export class DatabaseView {
  constructor(context: vscode.ExtensionContext) {
    const view = vscode.window.createTreeView("laf-toolkit.views.database", {
      treeDataProvider: myTreeDataProvider,
      showCollapseAll: false,
    });
    context.subscriptions.push(view);
  }
}

// 示例的树形视图数据提供程序
const myTreeDataProvider = {
  getChildren: async () => {
    const isInitSuccessful = true; // 假设初始化 成功
    if (!isInitSuccessful) {
      return [{ label: "集合 1" }, { label: "集合 1" }];
    }
    // 根据业务逻辑的结果来设置条件的值
    await vscode.commands.executeCommand(
      "setContext",
      "laf-toolkit.app.init",
      isInitSuccessful
    );
    return [];
  },
  getTreeItem: (element: { label: string | vscode.TreeItemLabel }) => {
    return new vscode.TreeItem(element.label);
  },
};
