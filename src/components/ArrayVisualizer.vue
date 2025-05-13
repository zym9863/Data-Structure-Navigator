<template>
  <div class="array-visualizer">
    <h3>数组可视化器</h3>
    <div class="controls">
      <input type="number" v-model.number="inputValue" placeholder="值" />
      <input type="number" v-model.number="inputIndex" placeholder="索引 (可选)" />
      <button @click="handleInsert">插入</button>
      <button @click="handleDelete">删除 (按索引)</button>
      <button @click="handleFind">查找 (按值)</button>
      <button @click="handleUpdate">更新 (按索引)</button>
      <button @click="handleGet">获取 (按索引)</button>
      <button @click="handleClear">清空</button>
    </div>
    <div class="visualization">
      <div
        v-for="(element, index) in arrayDS.getElements()"
        :key="index"
        class="array-element"
        :class="{ 'highlighted': highlightedIndex === index, 'found': foundIndex === index }"
      >
        <span class="index">{{ index }}</span>
        <span class="value">{{ element }}</span>
      </div>
      <p v-if="arrayDS.size() === 0">数组为空</p>
    </div>
    <div class="output">
      <p>操作结果: {{ operationResult }}</p>
      <p>数组大小: {{ arrayDS.size() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ArrayDS } from '../core/ArrayDS';

const arrayDS = reactive(new ArrayDS<number>([10, 20, 30, 40, 50]));
const inputValue = ref<number | null>(null);
const inputIndex = ref<number | null>(null);
const operationResult = ref<string | number | null>(null);
const highlightedIndex = ref<number | null>(null);
const foundIndex = ref<number | null>(null);

const resetHighlights = () => {
  highlightedIndex.value = null;
  foundIndex.value = null;
};

const animateOperation = (index?: number) => {
  resetHighlights();
  if (index !== undefined) {
    highlightedIndex.value = index;
    setTimeout(() => {
      highlightedIndex.value = null;
    }, 1000); // 动画持续1秒
  }
};

const handleInsert = () => {
  resetHighlights();
  if (inputValue.value === null) {
    operationResult.value = "请输入要插入的值";
    return;
  }
  const indexToInsert = inputIndex.value === null ? arrayDS.size() : inputIndex.value;
  animateOperation(indexToInsert);
  const success = arrayDS.insert(indexToInsert, inputValue.value);
  operationResult.value = success ? `在索引 ${indexToInsert} 插入 ${inputValue.value} 成功` : `插入失败`;
  inputValue.value = null;
  inputIndex.value = null;
};

const handleDelete = () => {
  resetHighlights();
  if (inputIndex.value === null) {
    operationResult.value = "请输入要删除的索引";
    return;
  }
  animateOperation(inputIndex.value);
  const deletedValue = arrayDS.delete(inputIndex.value);
  operationResult.value = deletedValue !== null ? `删除索引 ${inputIndex.value} 的元素 ${deletedValue} 成功` : `删除失败`;
  inputIndex.value = null;
};

const handleFind = () => {
  resetHighlights();
  if (inputValue.value === null) {
    operationResult.value = "请输入要查找的值";
    return;
  }
  const index = arrayDS.find(inputValue.value);
  operationResult.value = index !== -1 ? `元素 ${inputValue.value} 在索引 ${index}` : `未找到元素 ${inputValue.value}`;
  if (index !== -1) {
    foundIndex.value = index;
  }
  inputValue.value = null;
};

const handleUpdate = () => {
  resetHighlights();
  if (inputIndex.value === null || inputValue.value === null) {
    operationResult.value = "请输入索引和要更新的值";
    return;
  }
  animateOperation(inputIndex.value);
  const success = arrayDS.update(inputIndex.value, inputValue.value);
  operationResult.value = success ? `更新索引 ${inputIndex.value} 的元素为 ${inputValue.value} 成功` : `更新失败`;
  inputValue.value = null;
  inputIndex.value = null;
};

const handleGet = () => {
  resetHighlights();
  if (inputIndex.value === null) {
    operationResult.value = "请输入要获取的索引";
    return;
  }
  animateOperation(inputIndex.value);
  const value = arrayDS.get(inputIndex.value);
  operationResult.value = value !== null ? `索引 ${inputIndex.value} 的元素是 ${value}` : `获取失败`;
  inputIndex.value = null;
};

const handleClear = () => {
  resetHighlights();
  arrayDS.clear();
  operationResult.value = "数组已清空";
};
</script>

<style scoped>
.array-visualizer {
  padding: var(--spacing-lg);
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.controls {
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.controls input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--neutral-300);
  border-radius: var(--border-radius-md);
  background-color: white;
  transition: all var(--transition-normal);
  width: 100px;
}

.controls input:focus {
  border-color: var(--array-color);
  box-shadow: 0 0 0 3px var(--array-bg);
  outline: none;
}

.controls button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--array-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.controls button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.controls button:active {
  transform: translateY(0);
}

.visualization {
  display: flex;
  align-items: flex-start;
  min-height: 100px;
  padding: var(--spacing-md);
  border: 2px solid var(--array-border);
  border-radius: var(--border-radius-md);
  background-color: var(--neutral-100);
  overflow-x: auto;
  position: relative;
}

.array-element {
  border: 2px solid var(--array-color);
  background-color: var(--array-bg);
  padding: var(--spacing-sm);
  margin-right: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  text-align: center;
  min-width: 60px;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.array-element:last-child {
  margin-right: 0;
}

.array-element .index {
  font-size: var(--font-size-xs);
  color: var(--neutral-600);
  margin-bottom: var(--spacing-xs);
  background-color: var(--neutral-200);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.array-element .value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-800);
}

.array-element.highlighted {
  background-color: var(--accent-bg);
  border-color: var(--accent-color);
  transform: scale(1.1);
  z-index: 10;
  box-shadow: var(--shadow-md);
}

.array-element.found {
  background-color: var(--success-color);
  border-color: var(--secondary-dark);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.4);
}

.array-element.found .index {
  background-color: var(--secondary-dark);
  color: white;
}

.output {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--neutral-100);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--array-color);
}

.output p {
  margin: var(--spacing-xs) 0;
  color: var(--neutral-700);
}

/* 添加响应式设计 */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls input {
    width: 100%;
  }

  .controls button {
    width: 100%;
  }
}
</style>
