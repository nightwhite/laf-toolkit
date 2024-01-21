import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import * as utils from "../utils/index";

const nodes: any = {};

export class FuncsView {
  constructor(private context: vscode.ExtensionContext) {
    const view = vscode.window.createTreeView("laf-toolkit.views.funcs", {
      treeDataProvider: this.aNodeWithIdTreeDataProvider(),
      showCollapseAll: true,
    });
    context.subscriptions.push(view);

    view.onDidChangeSelection(
      (event: vscode.TreeViewSelectionChangeEvent<{ key: string }>) => {
        utils.log("打开云函数：" + event.selection[0].key, "Info");
        openFile(event.selection[0].key);
      }
    );

    // 右键第一个按钮
    vscode.commands.registerCommand(
      "laf-toolkit.views.funcs.right-click.push",
      async (event) => {
        console.log(event);
        utils.log("右键第一个按钮", "Info");
      }
    );
  }

  private aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{
    key: string;
  }> {
    return {
      getChildren: (element: { key: string }): { key: string }[] => {
        const res = this.getChildren(element ? element.key : undefined).map(
          (key) => this.getNode(key)
        );
        console.log(3123123, res);
        return res;
      },
      getTreeItem: (element: { key: string }): vscode.TreeItem => {
        const treeItem = this.getTreeItem(element.key);
        console.log(3123123111, treeItem);
        treeItem.id = element.key;
        return treeItem;
      },
      getParent: ({ key }: { key: string }): { key: string } | undefined => {
        const parentKey = path.dirname(key);
        return parentKey !== "." ? { key: parentKey } : undefined;
      },
    };
  }

  private getChildren(key: string | undefined): string[] {
    const fullPath = key
      ? path.join("laf-cloud/functions", key)
      : "laf-cloud/functions";
    return this.readDirectory(fullPath).map((subPath) =>
      key ? path.join(key, subPath) : subPath
    );
  }

  private getTreeItem(key: string): vscode.TreeItem {
    const rootPath = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : "";
    const fullPath = path.join(rootPath, "laf-cloud/functions", key);
    let isDirectory = false;
    let label = path.basename(key);

    try {
      isDirectory = fs.statSync(fullPath).isDirectory();
    } catch (error) {
      console.error(`Error accessing: ${fullPath}`, error);
    }

    const treeItem = new vscode.TreeItem(
      label,
      isDirectory
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );
    treeItem.tooltip = new vscode.MarkdownString(`$(file-code) ${key}`, true);

    // 为目录添加图标
    if (isDirectory) {
      treeItem.iconPath = new vscode.ThemeIcon("folder");
      // 给树形结构添加属性以便于判断是文件夹还是云函数文件
      treeItem.contextValue = "folderItem";
    } else if (path.extname(label) === ".ts") {
      // 移除.ts 文件的扩展名
      label = path.basename(label, ".ts");
      // 给树形结构添加属性以便于判断是文件夹还是云函数文件
      treeItem.contextValue = "fileItem";
      treeItem.label = label;
      treeItem.iconPath = {
        light: this.context.asAbsolutePath(
          path.join("resources", "light", "ts.svg")
        ),
        dark: this.context.asAbsolutePath(
          path.join("resources", "dark", "ts.svg")
        ),
      };
    }

    return treeItem;
  }

  private readDirectory(dirPath: string): string[] {
    const rootPath = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : "";
    const fullPath = path.join(rootPath, dirPath);
    if (!fs.existsSync(fullPath)) {
      console.log("Directory does not exist.");
      return [];
    }
    const items = fs.readdirSync(fullPath);

    // 分离文件夹和 ts 文件
    const directories = items.filter((item) => {
      const itemFullPath = path.join(fullPath, item);
      return fs.statSync(itemFullPath).isDirectory();
    });

    const tsFiles = items.filter((item) => {
      const itemFullPath = path.join(fullPath, item);
      return !fs.statSync(itemFullPath).isDirectory() && item.endsWith(".ts");
    });

    // 对文件夹和 ts 文件排序
    directories.sort();
    tsFiles.sort();

    return [...directories, ...tsFiles];
  }

  private getNode(key: string): { key: string } {
    if (!nodes[key]) {
      // 如果节点不存在，则创建它并添加到 nodes 对象中
      nodes[key] = new Key(key);
    }

    return nodes[key];
  }
}

/**
 * 点击云函数文件时，打开文件
 */
const openFile = (fileName: string) => {
  console.log(fileName);
  const rootPath = vscode.workspace.workspaceFolders
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : "";
  const filePath = path.join(rootPath, "laf-cloud/functions", fileName);
  console.log(3123123, filePath);
  vscode.workspace.openTextDocument(filePath).then((document) => {
    vscode.window.showTextDocument(document);
  });
};

class Key {
  constructor(readonly key: string) {}
}
