<script setup lang="ts">
import ArrayVisualizer from './components/ArrayVisualizer.vue';
import LinkedListVisualizer from './components/LinkedListVisualizer.vue';
import StackVisualizer from './components/StackVisualizer.vue';
import QueueVisualizer from './components/QueueVisualizer.vue';
import TutorialSection from './components/TutorialSection.vue'; // 引入教程组件
import { ref } from 'vue';

// 导入全局变量CSS
import './assets/styles/variables.css';

// 控制可视化器的显示状态
const activeVisualizer = ref<string>('array');

// 切换可视化器
const switchVisualizer = (visualizer: string) => {
  activeVisualizer.value = visualizer;
};
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="logo-container">
          <img alt="Data Structure Navigator logo" class="logo" src="./assets/vue.svg" width="48" height="48" />
          <h1>数构启航</h1>
        </div>
        <div class="header-nav">
          <span class="nav-item">首页</span>
          <span class="nav-item">关于</span>
          <span class="nav-item">帮助</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <section class="visualizer-section">
        <h2>交互式基础数据结构可视化器</h2>

        <div class="visualizer-tabs">
          <button
            class="tab-button"
            :class="{ active: activeVisualizer === 'array' }"
            @click="switchVisualizer('array')"
          >
            数组
          </button>
          <button
            class="tab-button"
            :class="{ active: activeVisualizer === 'linkedlist' }"
            @click="switchVisualizer('linkedlist')"
          >
            链表
          </button>
          <button
            class="tab-button"
            :class="{ active: activeVisualizer === 'stack' }"
            @click="switchVisualizer('stack')"
          >
            栈
          </button>
          <button
            class="tab-button"
            :class="{ active: activeVisualizer === 'queue' }"
            @click="switchVisualizer('queue')"
          >
            队列
          </button>
        </div>

        <div class="visualizer-container">
          <transition name="fade" mode="out-in">
            <component :is="activeVisualizer === 'array'
              ? ArrayVisualizer
              : activeVisualizer === 'linkedlist'
                ? LinkedListVisualizer
                : activeVisualizer === 'stack'
                  ? StackVisualizer
                  : QueueVisualizer"
              :key="activeVisualizer"
            />
          </transition>
        </div>
      </section>

      <section class="tutorial-section">
        <h2>核心概念与复杂度入门教程</h2>
        <TutorialSection /> <!-- 使用教程组件 -->
      </section>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2025 数构启航 - 数据结构学习平台</p>
        <div class="footer-links">
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">使用条款</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* 导入全局样式变量 */
@import './assets/styles/variables.css';

/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--neutral-800);
  background-color: var(--neutral-100);
}
</style>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--neutral-100);
}

.app-header {
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: var(--spacing-md);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.app-header h1 {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.header-nav {
  display: flex;
  gap: var(--spacing-xl);
}

.nav-item {
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: var(--transition-normal);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.app-main {
  flex-grow: 1;
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.visualizer-section, .tutorial-section {
  background-color: white;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.visualizer-section h2, .tutorial-section h2 {
  color: var(--primary-dark);
  margin-top: 0;
  border-bottom: 2px solid var(--neutral-200);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.visualizer-tabs {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--neutral-300);
  padding-bottom: var(--spacing-xs);
}

.tab-button {
  background: none;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--neutral-600);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  transition: var(--transition-normal);
  position: relative;
}

.tab-button:hover {
  color: var(--primary-color);
  background-color: var(--primary-bg);
}

.tab-button.active {
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
}

.visualizer-container {
  min-height: 400px;
  position: relative;
}

.app-footer {
  background-color: var(--neutral-800);
  color: white;
  padding: var(--spacing-lg) 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-link {
  color: var(--neutral-300);
  text-decoration: none;
  transition: var(--transition-normal);
}

.footer-link:hover {
  color: white;
  text-decoration: underline;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
