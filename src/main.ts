import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // 重新启用基础样式
import './assets/styles/variables.css' // 导入全局变量

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
