# Pixel Streaming 前端

**前端** 指的是在网页浏览器中运行的 HTML、CSS、图片和 JavaScript/TypeScript 代码，它们允许浏览器连接到 Unreal Engine 的 Pixel Streaming 应用程序并与之交互。前端库是开发者可以修改和扩展的基础，以满足其 Pixel Streaming 体验的需求。

前端由两个包组成：

1. [lib-pixelstreamingfrontend](/Frontend/library/)：核心的 Pixel Streaming 前端库，用于 WebRTC、设置、输入和通用功能。
2. [lib-pixelstreamingfrontend-ui](/Frontend/ui-library/)：UI 库，用户可以选择性地应用在核心库之上，或基于此进行开发。
3. [reference-pixelstreamingfrontend](/Frontend/implementations/typescript/)：Pixel Streaming 前端的参考实现（随插件一起发布的版本）。

这些库以 [NPM 包](/README.md#npm-packages) 的形式发布，支持作为 ES6 模块、CommonJS 使用，并包含类型定义和源映射。

## 文档

- [设置面板](Docs/Settings%20Panel.md)
- [自定义播放器网页](Docs/Customizing%20the%20Player%20Webpage.md)
- [HTML 页面要求](Docs/HTML%20Page%20Requirements.md)
    - [播放器文件位置和 URL](Docs/HTML%20Page%20Requirements.md)
- [自定义播放器输入选项](Docs/Customizing%20Player%20Input%20Options.md)
    - [禁用用户输入](Docs/Customizing%20Player%20Input%20Options.md)
- [自定义播放器小部件样式](Docs/Customizing%20the%20Player%20Widget%20Style.md)
- [访问 Pixel Streaming 蓝图 API](Docs/Accessing%20the%20Pixel%20Streaming%20Blueprint%20API.md)
- [从播放器页面与 UE5 通信](Docs/Communicating%20from%20the%20Player%20Page%20to%20UE5.md)
    - [使用 emitCommand 函数](Docs/Communicating%20from%20the%20Player%20Page%20to%20UE5.md)
    - [使用 emitUIInteraction 函数](Docs/Communicating%20from%20the%20Player%20Page%20to%20UE5.md)
- [从 UE5 与播放器页面通信](Docs/Communicating%20from%20UE5%20to%20the%20Player%20Page.md)
- [超时处理非活跃连接](Docs/Timing%20Out%20Inactive%20Connections.md)

## 将库集成到项目中

TypeScript 库以 [NPM](https://www.npmjs.com/settings/epicgames-ps/packages) 包和 [UMD](https://github.com/umdjs/umd) 模块（通过 [unpkg](https://unpkg.com/) 提供）的形式提供，便于从 TypeScript 代码或普通 JavaScript 代码中使用，支持现代 Web 开发工具和工作流。

## 从源代码使用

在开发自己的 Pixel Streaming 体验时，建议从此库开始，并通过其公共 API 进行扩展。我们在 [implementations/typescript](/Frontend/implementations/typescript) 中提供了此工作流程的示例，这是一个前端库的实现，并包含如何打包/压缩最终应用 JavaScript 的工作示例。

## 贡献

如果库的某些部分未公开，而您希望扩展它，请在您自己的分支中进行扩展，并提交拉取请求以供我们考虑。

## 开发

⚠️ 仅官方支持 NodeJS LTS 18.17.0，某些较新的 NodeJS 版本 **会导致构建失败** ⚠️

### 本地开发先决条件

- 在系统中安装 NodeJS LTS 18.17.0。
- 使用以下命令全局安装 npm：`npm install npm -g`（是的，这是必需的）

### 构建库

对库的更改发生在 [/library](/Frontend/library) 目录中，要求您在开发环境中安装 NodeJS。安装 NodeJS 后：

- `cd library`
- `npm install`
- `npm run build-all`

### 构建 UI 库

用户界面库位于 [/ui-library](/Frontend/ui-library) 目录中。您可以使用它或提供自己的用户界面。构建步骤：

- 首先按照构建库的步骤操作
- `cd ui-library`
- `npm install`
- `npm run build-all`

### 构建默认 UI

默认用户界面位于 [/implementations/typescript](/Frontend/implementations/typescript) 目录下。构建步骤：

- 首先按照构建库和 UI 库的步骤操作
- `cd implementations/typescript`
- `npm install`
- `npm run build-all`

这将在 `SignallingWebServer/Public` 目录下生成 `player.html` 和 `player.js`，这是默认的 UI。

### 创建自己的 UI

建议研究 [/ui-library](/Frontend/ui-library) 和 [player.ts](/Frontend/implementations/typescript/src/player.ts)/[player.html](/Frontend/implementations/typescript/src/player.html)，或者参考 [implementations/react](/Frontend/implementations/react) 中的 React 示例实现。然后，一旦您复制并修改了 [package.json](/Frontend/implementations/typescript/package.json) 和 `.ts` 文件到您自己的 `implementation/your_implementation` 目录中，过程类似：

- `cd implementation/your_implementation`
- `npm run build-all`

## 单元测试

[/library](/Frontend/library) 项目包含单元测试，用于测试 Pixel Streaming 功能与模拟连接的交互。要手动运行测试，请执行：

- `cd library`
- `npm install`
- `npm run test`

## 法律

版权所有 &copy; 2025, Epic Games。根据 MIT 许可证授权，详见 [LICENSE](/LICENSE.md) 文件。
