import * as vscode from "vscode";

export class DebugView {
  constructor(context: vscode.ExtensionContext) {
    const view = vscode.window.createTreeView("laf-toolkit.views.debug", {
      treeDataProvider: myTreeDataProvider,
      showCollapseAll: true,
    });
    context.subscriptions.push(view);
  }
}

// 示例的树形视图数据提供程序
const myTreeDataProvider = {
  getChildren: async () => {
    return [{ label: "集合 1" }, { label: "集合 1" }];
  },
  getTreeItem: (element: { label: string | vscode.TreeItemLabel }) => {
    return new vscode.TreeItem(element.label);
  },
};
