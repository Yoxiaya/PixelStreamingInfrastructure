# 5.5 版本中实验性的 Pixel Streaming 2 插件发布

从 UE 5.5 开始，Epic Games 引入了一个层，使得内部维护 WebRTC 更加容易。由于原始的 Pixel Streaming 插件直接使用了 WebRTC，这一变化意味着我们必须引入一个新的插件，以确保为那些在 Pixel Streaming 插件基础上开发了自定义解决方案的开发者提供更好的过渡期。目前，原始的 Pixel Streaming 插件和 Pixel Streaming 2 插件都将随 Unreal Engine 一起发布，以便用户有时间进行迁移。

我们创建了一个 [迁移指南](/Docs/pixel-streaming-2-migration-guide.md)，以确保所有使用该插件的许可用户能够顺利过渡，并突出两个插件之间的所有主要变化。

# 仓库健康检查和操作

| 健康检查                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-libraries.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-libraries.yml)                           |
| [![平台脚本](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-platform-scripts.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-platform-scripts.yml)       |
| [![信令协议](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-signalling-protocol.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-signalling-protocol.yml) |
| [![信令服务器镜像](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-image-wilbur.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-image-wilbur.yml)         |
| [![SFU Docker 镜像](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-image-sfu.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-image-sfu.yml)              |
| [![文档链接](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-markdown-links.yml/badge.svg?branch=master)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/healthcheck-markdown-links.yml)           |

| 操作       | UE5.5                                                                                                                                                                                                                                                                              | UE5.4                                                                                                                                                                                                                                                                      | UE5.3                                                                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 通用库     | [![发布通用库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml/badge.svg?branch=UE5.5)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml)         | [![发布通用库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml/badge.svg?branch=UE5.4)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml) | [![发布通用库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml/badge.svg?branch=UE5.3)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml) |
| 信令库     | [![发布信令库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-signalling-library-to-npm.yml/badge.svg?branch=UE5.5)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-signalling-library-to-npm.yml) |                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                            |
| 发布容器   | [![发布容器镜像](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/container-images.yml/badge.svg)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/container-images.yml)                                              |                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                            |
| 前端库     | [![发布前端库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml/badge.svg?branch=UE5.5)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml)                       | [![发布前端库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml/badge.svg?branch=UE5.4)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml)               | [![发布前端库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml/badge.svg?branch=UE5.3)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml)               |
| 前端 UI 库 | [![发布 UI 库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml/badge.svg?branch=UE5.5)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml)                 | [![发布 UI 库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml/badge.svg?branch=UE5.4)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml)         | [![发布 UI 库](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml/badge.svg?branch=UE5.3)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml)         |
| 发布       | [![发布](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml/badge.svg?branch=UE5.5)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml)                                       | [![发布](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml/badge.svg?branch=UE5.4)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml)                               | [![发布](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml/badge.svg?branch=UE5.3)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml)                               |

# Pixel Streaming 服务器和前端的官方主页！

Unreal Pixel Streaming 的前端和 Web 服务器组件（以前位于 `Samples/PixelStreaming/WebServers`）现在位于此仓库中，供所有人贡献。它们被称为 **Pixel Streaming 基础设施**。

## 入门

要**构建**并**运行**连接到 Pixel Streaming 插件所需的所有内容，只需在 `PixelStreamingInfrastructure` 目录的根目录中运行以下命令：

**Windows**

```
.\SignallingWebServer\platform_scripts\cmd\start.bat
```

**Linux 或 Mac**

```
./SignallingWebServer/platform_scripts/bash/start.sh
```

如果你想在此 monorepo 中处理某个特定的库，请 `cd` 进入该目录并运行：

`npm install`
`npm run build-all`

如果你想安装所有依赖项并清除现有的 `node_modules`，请进入仓库的根目录并运行：

`npm install`

这之所以有效，是因为此 monorepo 使用了 [NPM 工作区](https://docs.npmjs.com/cli/v7/using-npm/workspaces?v=true)。使用 NPM 工作区意味着：

- monorepo 中的每个子工作区没有自己的 `package-lock.json`，只有一个位于根目录的单一文件。
- 公共依赖项会被提升到根目录的 `node_modules` 目录中。
- 一些子工作区不会有 `node_modules` 目录，因为它们的所有依赖项都存在于根目录的 `node_modules` 中。
- 当在 monorepo 中本地工作时，子工作区的依赖项会首先尝试使用本地 `symlink` 来解析这些依赖项，而不是从 NPM 下载已发布的包。例如，`pixelstreaming-frontend` 依赖于 `pixelstreaming-common`，在此仓库中工作时，该依赖项将首先尝试使用本地的 `./Common` 目录来解析。

## 目标

此仓库的目标是：

- 提高 Pixel Streaming 服务器的发布频率（以更快应对浏览器的破坏性变化）。
- 鼓励 Unreal Engine 许可用户更轻松地贡献这些组件。
- 促进更标准的 Web 发布机制。
- 授予分发和修改此代码的宽松许可证（MIT 许可证）。

## 贡献

如果你想为我们的仓库做出贡献，请参考我们的 [贡献指南](CONTRIBUTING.md)。感谢你的时间和努力！

## 内容

Pixel Streaming 基础设施包含运行像素流应用程序所需的所有组件的参考实现。它们被构建为独立的项目，这些项目可以协同工作，但设计为模块化，并与其他使用 WebRTC 技术的实现互操作。这些实现包括：

- 一个名为 Cirrus 的信令 Web 服务器，位于 [`SignallingWebServer/`](SignallingWebServer/)。
- 一个 SFU（选择性转发单元），位于 [`SFU/`](SFU/)。
- 一个用于前端应用程序的通用库，位于 [`Common/`](Common/)。
- 多个用于 WebRTC 播放器和输入的前端项目，位于 [`Frontend/`](Frontend/)：
    - 用于 [通信](Frontend/library/) 和 [UI](Frontend/ui-library/) 功能的共享库
    - 使用不同技术（如 TypeScript 或 React/JSX）的独立 [实现](Frontend/implementations/)
    - 详细信息请参阅 [/frontend](/Frontend/)。
- 一个信令协议测试应用程序，用于验证信令协议的实现，位于 [`Extras/SS_Test/`](Extras/SS_Test/)。

## 发布

我们在此仓库下发布了多个不同的组件，具体包括：

- 信令服务器的容器镜像
- 前端的 NPM 包
- 此仓库的源代码发布，包含作为最小化 js 包构建的参考前端

### 容器镜像

以下容器镜像是从此仓库构建的：

- [[非官方] pixel-streaming-signalling-server](https://hub.docker.com/r/pixelstreamingunofficial/pixel-streaming-signalling-server/tags)
- [[非官方] pixel-streaming-sfu](https://hub.docker.com/r/pixelstreamingunofficial/pixel-streaming-sfu/tags)

### NPM 包

以下是 `非官方` 的 NPM 包（官方包即将推出）：

| NPM 包     | 5.5                                                                                                                    | 5.4                                                                                                                    | 5.3                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 前端库     | [lib-pixelstreamingfrontend-ue5.5](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ue5.5)       | [lib-pixelstreamingfrontend-ue5.4](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ue5.4)       | [lib-pixelstreamingfrontend-ue5.3](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ue5.3)       |
| 前端 UI 库 | [lib-pixelstreamingfrontend-ui-ue5.5](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.5) | [lib-pixelstreamingfrontend-ui-ue5.4](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4) | [lib-pixelstreamingfrontend-ui-ue5.3](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.3) |
| 信令库     | [lib-pixelstreamingsignalling-ue5.5](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingsignalling-ue5.5)   | `N/A`                                                                                                                  | `N/A`                                                                                                                  |
| 通用库     | [lib-pixelstreamingcommon-ue5.5](https://www.npmjs.com/package/@epicgames-ps/lib-pixelstreamingcommon-ue5.5)           | `N/A`                                                                                                                  | `N/A`                                                                                                                  |

### NPM 入门

```bash
# 前端（核心库）
npm i @epicgames-ps/lib-pixelstreamingfrontend-ue5.5
# 前端 UI
npm i @epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.5
```

## 文档

- [通用文档](/Docs/README.md)
- [前端文档](/Frontend/README.md)
- [信令服务器文档](/SignallingWebServer/README.md)
- [SFU 文档](/SFU/README.md)

### 标记的源代码发布 + 构建的 TypeScript 前端

[Github 发布](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/releases)

## 版本

我们维护与现有和开发中的 Unreal Engine 版本兼容的服务器和前端版本。

:warning: **不同 UE 版本之间存在破坏性更改 - 因此请确保获取正确的版本**。:warning:

<ins>有关版本之间的主要更改列表，请参阅 [更新日志](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/CHANGELOG.md)。</ins>

此仓库包含以下跟踪 Unreal Engine 版本的分支：

| 分支                                                                               | 状态     |
| ---------------------------------------------------------------------------------- | -------- |
| [Master](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/master) | 开发     |
| [UE5.5](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/UE5.5)   | 当前     |
| [UE5.4](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/UE5.4)   | 支持     |
| [UE5.3](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/UE5.3)   | 终止支持 |
| [UE5.2](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/UE5.2)   | 不支持   |

| 图例     | 含义                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| 开发     | 这是我们的开发分支，旨在与 [ue5-main](https://github.com/EpicGames/UnrealEngine/tree/ue5-main) 配对 - 实验性。 |
| 预发布   | 此处的代码将与下一个 UE 版本配对，我们会定期从 `master` 更新此分支。                                           |
| 当前     | 支持，并且这是跟踪 **最新发布** UE 版本的分支。                                                                |
| 支持     | 我们将接受此版本的错误修复/问题。                                                                              |
| 终止支持 | 一旦下一个 UE 版本发布，我们将不再支持此版本。                                                                 |
| 不支持   | 我们将不再为此版本提供错误修复支持。                                                                           |

## 法律

© 2004-2024, Epic Games, Inc. Unreal 及其徽标是 Epic 在美国及其他地区的商标或注册商标。
