import * as vscode from "vscode";
import * as utils from "../utils/index";

export function showLogin() {
  const panel = vscode.window.createWebviewPanel(
    "formWebview", // Identifies the type of the webview. Used internally
    "登录 API Server", // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true, // Enables JavaScript in the webview
    }
  );

  panel.webview.html = getWebviewContent(); // Function to get the HTML content of the webview
  // 设置消息监听器
  panel.webview.onDidReceiveMessage(
    (message) => {
      switch (message.command) {
        case "submit":
          handleFormSubmit(message.pat, message.api_url);
          break;
      }
    },
    undefined,
    utils.globalContext.subscriptions
  );
}

function handleFormSubmit(pat: any, api_url: string) {
  // 在这里处理表单提交的数据
  console.log(`pat info: ${pat}, api address: ${api_url}`);
}

function getWebviewContent() {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Form</title>
      </head>
      <body>
          <form id="myForm">
              <label for="pat">pat:</label><br>
              <input type="text" id="pat" name="pat"><br>
              <label for="api_url">api_url:</label><br>
              <input type="text" id="api_url" name="api_url"><br><br>
              <input type="button" value="提交登录" onclick="submitForm()">
          </form>
          
          <script>
              const vscode = acquireVsCodeApi();
              
              function submitForm() {
                  const pat = document.getElementById('pat').value;
                  const api_url = document.getElementById('api_url').value;
                  vscode.postMessage({
                      command: 'submit',
                      pat: pat,
                      api_url: api_url
                  });
              }
          </script>
      </body>
      </html>`;
}
