import * as vscode from "vscode";

export function debugInit(context: vscode.ExtensionContext) {
  vscode.window.registerWebviewViewProvider(
    "laf-toolkit.views.terminal",
    {
      resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext<unknown>,
        token: vscode.CancellationToken
      ): void | Thenable<void> {
        webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: sans-serif; display: flex; height: 100vh; }
            #request-form { flex: 1; padding: 10px; }
            #log { flex: 2; overflow-y: scroll; padding: 10px; background-color: #f0f0f0; }
            .hidden { display: none; }
          </style>
        </head>
        <body>
          <div id="request-form">
            <h3>HTTP Request</h3>
            <select id="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
            <div id="get-params" class="request-params">
              <input type="text" id="get-key" placeholder="Key" />
              <input type="text" id="get-value" placeholder="Value" />
            </div>
            <div id="post-params" class="request-params hidden">
              <textarea id="post-body" placeholder="Enter POST body"></textarea>
            </div>
            <button id="send">Send</button>
          </div>
          <div id="log">
            <h3>Logs</h3>
          </div>
          <script>
            const methodSelect = document.getElementById('method');
            const getParamsDiv = document.getElementById('get-params');
            const postParamsDiv = document.getElementById('post-params');
            const logEl = document.getElementById('log');
            const sendButton = document.getElementById('send');
            
            methodSelect.onchange = function() {
              if (this.value === 'GET') {
                getParamsDiv.classList.remove('hidden');
                postParamsDiv.classList.add('hidden');
              } else {
                getParamsDiv.classList.add('hidden');
                postParamsDiv.classList.remove('hidden');
              }
            };
  
            sendButton.onclick = function() {
              const method = methodSelect.value;
              let url = '您的目标 URL'; // 这里设置您的目标 URL
              let body = null;
  
              if (method === 'GET') {
                const key = document.getElementById('get-key').value;
                const value = document.getElementById('get-value').value;
                url += \`?\${encodeURIComponent(key)}=\${encodeURIComponent(value)}\`;
              } else {
                body = document.getElementById('post-body').value;
              }
  
              fetch(url, { method, body })
                .then(response => response.text())
                .then(data => {
                  logEl.innerHTML += \`<div>\${data}</div>\`;
                })
                .catch(error => {
                  logEl.innerHTML += \`<div>Error: \${error}</div>\`;
                });
            };
          </script>
        </body>
        </html>
        `;
      },
    },
    { webviewOptions: { retainContextWhenHidden: true } }
  );
}