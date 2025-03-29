# Wilbur

一个可以直接替代 Cirrus 的应用。

Wilbur 是一个小型中间应用程序，位于流媒体服务器（streamers）和其他客户端（peers）之间。它处理初始连接协商以及客户端之间的一些小型控制消息，同时还充当一个简单的 Web 服务器，用于提供 前端 Web 应用程序。

与旧版 Cirrus 的行为差异可以在 这里 查看。

---

## 构建

构建由 `npm` 和 `tsc` 处理。然而，最简单的安装和构建方法是运行以下命令：

```
.\SignallingWebServer\platform_scripts\cmd\start.bat --dev
```

这将安装并构建所有必需的组件。

---

## 手动构建

如果你希望手动构建（或构建其他配置），需要执行以下步骤：

```bash
npm install
npm run build
# 或 npm run build-dev
```

在 common、Signalling 和 SignallingWebServer 目录中（按此顺序）运行这些命令。

每个目录的构建文件将输出到 `build` 或 `dist` 目录中。

---

## 运行

在构建服务器后，你可以通过 `node` 或 `npm start` 脚本运行它：

```
npm start -- [参数]
```

或

```
node dist/index.js [参数]
```

运行 `npm start -- --help` 或 `node dist/index.js --help` 将显示配置选项：

```
用法: node dist/index.js [选项]

一个用于 Unreal Engine Pixel Streaming 应用程序的基础信令服务器应用程序。

选项：
  -V, --version                 输出版本号
  --log_folder <path>           设置日志文件的路径。（默认值："logs"）
  --log_level_console <level>   设置控制台消息的日志级别。（可选值："debug", "info", "warning", "error"，默认值："info"）
  --log_level_file <level>      设置日志文件的日志级别。（可选值："debug", "info", "warning", "error"，默认值："info"）
  --console_messages [detail]   在控制台显示传入和传出的信令消息。（可选值："basic", "verbose", "formatted"，默认值："verbose"）
  --streamer_port <port>        设置流媒体服务器连接的监听端口。（默认值："8888"）
  --player_port <port>          设置播放器连接的监听端口。（默认值："80"）
  --sfu_port <port>             设置 SFU 连接的监听端口。（默认值："8889"）
  --max_players <number>        设置每个流媒体服务器的最大订阅者数量。0 = 无限制。（默认值："0"）
  --serve                       在 player_port 上启用 Web 服务器。（默认值：true）
  --http_root <path>            设置 Web 服务器根目录的路径。（默认值："D:\\PixelStreamingInfrastructure\\SignallingWebServer\\www"）
  --homepage <filename>         设置 Web 服务器的默认 HTML 文件。（默认值："player.html"）
  --https                       在 https_port 上启用 Web 服务器并启用 SSL。（默认值：false）
  --https_port <port>           设置 HTTPS 服务器的监听端口。（默认值：443）
  --ssl_key_path <path>         设置 SSL 密钥文件的路径。（默认值："certificates/client-key.pem"）
  --ssl_cert_path <path>        设置 SSL 证书文件的路径。（默认值："certificates/client-cert.pem"）
  --https_redirect              启用 HTTP 到 HTTPS 的连接重定向。如果未设置，Web 服务器将仅监听 https_port。播放器 WebSocket 仍将监听 player_port。（默认值：true）
  --rest_api                    启用 REST API 接口，可通过 <server_url>/api/api-definition 访问。（默认值：false）
  --peer_options <json-string>  在配置消息的 peerConnectionOptions 中发送的附加 JSON 数据。（默认值：""）
  --log_config                  在启动时打印程序配置。（默认值：true）
  --stdin                       允许在运行时通过标准输入交互。（默认值：false）
  --save                        在解析参数后，将当前配置保存到 config.json 文件中。（默认值：false）
  -h, --help                    显示帮助文本。
```

这些命令行选项也可以通过 `config.json` 文件描述（默认配置文件路径可通过 `--config_file` 覆盖），只需在 JSON 对象中指定命令选项名称和值，例如：

```json
{
	"log_folder": "logs",
	"log_level_console": "info",
	"log_level_file": "info",
	"streamer_port": "8888",
	"player_port": "80",
	"sfu_port": "8889",
	"serve": true,
	"http_root": "www",
	"homepage": "player.html",
	"log_config": false,
	"stdin": false
}
```

根据这些选项，如果你想以最接近旧版 Cirrus 的行为启动服务器，可以运行以下命令：

```
npm start -- --console_messages --https_redirect verbose --serve --log_config --http_root www --homepage player.html
```
```
npm start -- --console_messages --https_redirect verbose --serve --log_config --http_root www_react --homepage index.html 
```
注意，`www` 作为 HTTP 根目录假设你的前端位于该目录中。

---

## 开发

此实现基于 Signalling 库构建，该库是用于开发信令应用程序的库。有关更多信息，请访问其 文档。

项目中提供了一个开发模式，可以监视库、前端和源代码的更改。要使用此模式，可以运行 `npm run develop`。这将启动一系列监视器，监视信令服务器和前端的各个组件的更改，并自动构建和重启信令服务器；如果前端发生更改，则重新部署前端以供信令服务器提供服务。

#### 注意
默认情况下，当信令服务器以此模式启动时，访问前端的端口会更改为 1025，因此你需要访问 `http://localhost:1025` 来访问前端。这是为了避免需要提升权限来使用端口 80。

---

### 自签名证书

在开发过程中，使用自签名 SSL 证书可能会很有用（例如，某些功能如 XR 和麦克风使用需要 HTTPS）。可以按照以下步骤生成自签名证书：

1. 导航到 SignallingWebServer 目录。
2. 创建一个名为 `certificates` 的子目录。
3. 打开 Git Bash 或你喜欢的终端。
4. 运行以下命令：
   ```
   openssl req -x509 -newkey rsa:4096 -keyout client-key.pem -out client-cert.pem -sha256 -nodes
   ```
5. 确保你的 `config.json` 包含以下内容：

```json
"ssl_key_path": "certificates/client-key.pem",
"ssl_cert_path": "certificates/client-cert.pem",
```

---

## 更多文档

- 协议消息
- 协议协商