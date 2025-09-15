# AI Agent Web 应用

## 项目简介

AI Agent Web 是一个现代化的AI聊天应用，提供流畅的对话体验和直观的用户界面。该应用支持流式响应处理、历史会话管理和响应式设计，能够在不同设备上提供一致的用户体验。

## 技术栈

- **前端框架**: React 19
- **类型系统**: TypeScript
- **构建工具**: Vite 7
- **UI组件库**: Ant Design 5
- **样式框架**: Tailwind CSS 4
- **代码规范**: ESLint, Prettier

## 项目结构

```
├── src/
│   ├── App.tsx               # 主应用组件
│   ├── main.tsx              # 应用入口文件
│   ├── hooks/                # 自定义钩子
│   │   └── usePostStreamJSON.tsx  # 流式JSON请求处理
│   ├── components/           #  React组件
│   │   ├── chatInput.tsx     # 聊天输入组件
│   │   └── HistoryList.tsx   # 历史会话列表
│   ├── assets/               # 静态资源文件
│   └── index.css             # 全局样式
├── package.json              # 项目依赖和脚本
├── vite.config.ts            # Vite配置
├── tsconfig.json             # TypeScript配置
└── .gitignore                # Git忽略文件
```

## 核心功能

### 1. 流式响应处理

应用通过 `usePostStreamJSON` 自定义钩子实现了流式数据处理，能够实时接收并显示AI的回复，无需等待完整响应。

### 2. 历史会话管理

支持创建多个会话，所有会话历史都会保存在本地，并可以随时切换查看。

### 3. 响应式设计

应用会根据窗口大小自动调整布局，在移动设备上会自动折叠侧边栏，提供更优化的移动端体验。

### 4. 模型选择

支持选择不同的AI模型进行对话，当前默认配置为`qwen3:8b`。

## 安装与运行

### 前提条件

- Node.js 22+ 
- Yarn (推荐) 或 npm

### 安装依赖

```bash
# 使用yarn
$ yarn install

# 或使用npm
$ npm install
```

### 开发模式运行

```bash
# 使用yarn
$ yarn dev

# 或使用npm
$ npm run dev
```

应用将在 http://localhost:5173 启动开发服务器。

### 构建生产版本

```bash
# 使用yarn
$ yarn build

# 或使用npm
$ npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产版本

```bash
# 使用yarn
$ yarn preview

# 或使用npm
$ npm run preview
```

## 使用说明

1. **新建会话**: 点击侧边栏中的"新建会话"按钮创建新的聊天会话
2. **发送消息**: 在输入框中输入内容，按Enter发送（Shift+Enter换行）
3. **查看历史**: 在侧边栏中点击历史会话项可切换查看不同的会话内容
4. **折叠/展开侧边栏**: 点击侧边栏箭头可折叠或展开侧边栏

## 注意事项

- 应用默认连接本地API端点 `/api/generate`，在生产环境中可能需要配置为实际的后端API地址
- 当前版本的历史会话数据仅保存在内存中，刷新页面后会丢失
- 在移动设备上使用时，点击主内容区域会自动隐藏侧边栏以提供更大的内容显示空间

## 开发指南

### 代码规范

项目使用ESLint和Prettier进行代码规范检查和格式化，请在提交代码前确保通过这些检查：

```bash
# 使用yarn
$ yarn lint

# 或使用npm
$ npm run lint
```

### 提交代码

- 遵循常规提交信息格式
- 确保所有测试通过（如有）
- 提交前执行构建命令确保没有编译错误
        