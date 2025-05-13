# 数构启航 (Data Structure Navigator)

[English](README_EN.md) | 简体中文

一个交互式数据结构学习平台，帮助初学者理解和掌握基础数据结构的概念和操作。

## 项目简介

数构启航是一个基于 Vue 3 + TypeScript + Vite 开发的 Web 应用，旨在通过可视化和交互式操作帮助用户学习基础数据结构。本项目提供了四种常见数据结构的可视化操作界面：

- **数组 (Array)**: 展示索引访问、插入、删除、查找等操作
- **链表 (Linked List)**: 展示节点连接、插入、删除等操作
- **栈 (Stack)**: 展示后进先出 (LIFO) 特性，包括入栈、出栈操作
- **队列 (Queue)**: 展示先进先出 (FIFO) 特性，包括入队、出队操作

除了交互式可视化外，项目还包含数据结构的基础知识和时间/空间复杂度分析，帮助用户深入理解各种数据结构的特点和适用场景。

## 功能特点

- 直观的数据结构可视化界面
- 实时交互操作与动画效果
- 详细的操作结果反馈
- 完整的数据结构理论知识
- 时间与空间复杂度分析
- 响应式设计，支持不同设备

## 技术栈

- **前端框架**: Vue 3
- **编程语言**: TypeScript
- **构建工具**: Vite
- **样式设计**: CSS 变量与自定义样式
- **动画效果**: Vue Transition 组件

## 开发与构建

### 环境要求

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── assets/         # 静态资源
│   └── styles/     # 样式文件
├── components/     # 组件
│   ├── ArrayVisualizer.vue       # 数组可视化组件
│   ├── LinkedListVisualizer.vue  # 链表可视化组件
│   ├── StackVisualizer.vue       # 栈可视化组件
│   ├── QueueVisualizer.vue       # 队列可视化组件
│   └── TutorialSection.vue       # 教程组件
├── core/           # 核心数据结构实现
│   ├── ArrayDS.ts              # 数组数据结构
│   ├── LinkedListDS.ts         # 链表数据结构
│   ├── StackDS.ts              # 栈数据结构
│   └── QueueDS.ts              # 队列数据结构
├── App.vue         # 应用主组件
└── main.ts         # 应用入口
```

## 贡献指南

欢迎对本项目提出改进建议或贡献代码。请通过 Issues 或 Pull Requests 参与项目开发。

## 许可证

[MIT License](LICENSE)
