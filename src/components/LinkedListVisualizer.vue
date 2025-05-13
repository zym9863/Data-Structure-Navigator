<template>
  <div class="linked-list-visualizer">
    <h3>链表可视化器</h3>
    <div class="controls">
      <input type="number" v-model.number="inputValue" placeholder="值" />
      <input type="number" v-model.number="inputIndex" placeholder="索引 (可选)" />
      <button @click="handleAppend">追加 (到尾部)</button>
      <button @click="handleInsert">插入 (按索引)</button>
      <button @click="handleDelete">删除 (按索引)</button>
      <button @click="handleFind">查找 (按值)</button>
      <button @click="handleGet">获取 (按索引)</button>
      <button @click="handleClear">清空</button>
    </div>
    <div class="visualization">
      <div v-if="linkedListDS.size() === 0" class="empty-message">链表为空</div>
      <div v-else class="nodes-container">
        <template v-for="(node, index) in displayedNodes" :key="index">
          <div
            class="list-node"
            :class="{ 'highlighted': highlightedNodeIndex === index, 'found': foundNodeIndex === index }"
          >
            <span class="value">{{ node.value }}</span>
          </div>
          <div v-if="node.next" class="arrow">➔</div>
          <div v-else-if="index < displayedNodes.length -1" class="arrow">➔</div> <!-- Ensure arrow for last actual node if not truly null -->
           <div v-if="!node.next && index === displayedNodes.length - 1" class="null-pointer">∅</div>
        </template>
      </div>
    </div>
    <div class="output">
      <p>操作结果: {{ operationResult }}</p>
      <p>链表大小: {{ linkedListDS.size() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { LinkedListDS } from '../core/LinkedListDS';

interface DisplayNode<T> {
  value: T;
  next: boolean; // Simplified for display: does it have a next?
}

const linkedListDS = reactive(new LinkedListDS<number>([10, 20, 30]));
const inputValue = ref<number | null>(null);
const inputIndex = ref<number | null>(null);
const operationResult = ref<string | number | null>(null);
const highlightedNodeIndex = ref<number | null>(null);
const foundNodeIndex = ref<number | null>(null);

// Compute a display-friendly version of the list
const displayedNodes = computed(() => {
  const nodes: DisplayNode<number>[] = [];
  let current = linkedListDS.getHead();
  while (current) {
    nodes.push({ value: current.value, next: !!current.next });
    current = current.next;
  }
  return nodes;
});

const resetHighlights = () => {
  highlightedNodeIndex.value = null;
  foundNodeIndex.value = null;
};

const animateOperation = (index?: number) => {
  resetHighlights();
  if (index !== undefined) {
    highlightedNodeIndex.value = index;
    setTimeout(() => {
      highlightedNodeIndex.value = null;
    }, 1000); // Animation duration
  }
};

const handleAppend = () => {
  resetHighlights();
  if (inputValue.value === null) {
    operationResult.value = "请输入要追加的值";
    return;
  }
  animateOperation(linkedListDS.size()); // Highlight the position where it will be added
  linkedListDS.append(inputValue.value);
  operationResult.value = `追加元素 ${inputValue.value} 成功`;
  inputValue.value = null;
};

const handleInsert = () => {
  resetHighlights();
  if (inputValue.value === null || inputIndex.value === null) {
    operationResult.value = "请输入值和索引";
    return;
  }
  animateOperation(inputIndex.value);
  const success = linkedListDS.insert(inputIndex.value, inputValue.value);
  operationResult.value = success ? `在索引 ${inputIndex.value} 插入 ${inputValue.value} 成功` : `插入失败`;
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
  const deletedValue = linkedListDS.delete(inputIndex.value);
  operationResult.value = deletedValue !== null ? `删除索引 ${inputIndex.value} 的元素 ${deletedValue} 成功` : `删除失败`;
  inputIndex.value = null;
};

const handleFind = () => {
  resetHighlights();
  if (inputValue.value === null) {
    operationResult.value = "请输入要查找的值";
    return;
  }
  const index = linkedListDS.find(inputValue.value);
  operationResult.value = index !== -1 ? `元素 ${inputValue.value} 在索引 ${index}` : `未找到元素 ${inputValue.value}`;
  if (index !== -1) {
    foundNodeIndex.value = index;
    animateOperation(index); // Also highlight found node
  }
  inputValue.value = null;
};

const handleGet = () => {
  resetHighlights();
  if (inputIndex.value === null) {
    operationResult.value = "请输入要获取的索引";
    return;
  }
  animateOperation(inputIndex.value);
  const value = linkedListDS.get(inputIndex.value);
  operationResult.value = value !== null ? `索引 ${inputIndex.value} 的元素是 ${value}` : `获取失败`;
  inputIndex.value = null;
};

const handleClear = () => {
  resetHighlights();
  linkedListDS.clear();
  operationResult.value = "链表已清空";
};

</script>

<style scoped>
.linked-list-visualizer {
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
  border-color: var(--linkedlist-color);
  box-shadow: 0 0 0 3px var(--linkedlist-bg);
  outline: none;
}

.controls button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--linkedlist-color);
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
  background-color: var(--secondary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.controls button:active {
  transform: translateY(0);
}

.visualization {
  display: flex;
  align-items: center;
  min-height: 100px;
  padding: var(--spacing-md);
  border: 2px solid var(--linkedlist-border);
  border-radius: var(--border-radius-md);
  background-color: var(--neutral-100);
  overflow-x: auto;
  position: relative;
}

.empty-message {
  color: var(--neutral-500);
  font-style: italic;
  width: 100%;
  text-align: center;
  padding: var(--spacing-md);
}

.nodes-container {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
}

.list-node {
  border: 2px solid var(--linkedlist-color);
  background-color: var(--linkedlist-bg);
  padding: var(--spacing-md);
  margin-right: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  text-align: center;
  min-width: 60px;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.list-node .value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-800);
}

.arrow {
  font-size: var(--font-size-xl);
  color: var(--linkedlist-color);
  margin: 0 var(--spacing-sm);
  user-select: none;
  transition: var(--transition-normal);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.7; transform: scale(1); }
}

.null-pointer {
  font-size: var(--font-size-xl);
  color: var(--neutral-500);
  margin-left: var(--spacing-sm);
  user-select: none;
  font-weight: var(--font-weight-bold);
}

.list-node.highlighted {
  background-color: var(--accent-bg);
  border-color: var(--accent-color);
  transform: scale(1.1);
  z-index: 10;
  box-shadow: var(--shadow-md);
}

.list-node.found {
  background-color: var(--info-color);
  border-color: var(--primary-dark);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.4);
}

.output {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--neutral-100);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--linkedlist-color);
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
