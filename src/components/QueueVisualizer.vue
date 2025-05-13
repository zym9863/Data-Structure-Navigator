<template>
  <div class="queue-visualizer">
    <h3>队列可视化器</h3>
    <div class="controls">
      <input type="number" v-model.number="inputValue" placeholder="值" />
      <button @click="handleEnqueue">入队 (Enqueue)</button>
      <button @click="handleDequeue">出队 (Dequeue)</button>
      <button @click="handleFront">查看队首 (Front)</button>
      <button @click="handleRear">查看队尾 (Rear)</button>
      <button @click="handleClear">清空</button>
    </div>
    <div class="visualization-area">
      <div class="queue-label front-label" v-if="!queueDS.isEmpty()">队首 ➔</div>
      <div class="queue-container">
        <transition-group name="queue-item-animation" tag="div" class="queue-items">
          <div
            v-for="element in displayedQueueElements"
            :key="element.id"
            class="queue-element"
            :class="{
              'highlighted-dequeue': highlightedDequeueId === element.id,
              'highlighted-enqueue': highlightedEnqueueId === element.id,
              'peeked-front': peekedFrontId === element.id,
              'peeked-rear': peekedRearId === element.id
            }"
          >
            {{ element.value }}
          </div>
        </transition-group>
        <div v-if="queueDS.isEmpty()" class="empty-message">队列为空</div>
      </div>
      <div class="queue-label rear-label" v-if="!queueDS.isEmpty()">➔ 队尾</div>
    </div>
    <div class="output">
      <p>操作结果: {{ operationResult }}</p>
      <p>队列大小: {{ queueDS.size() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { QueueDS } from '../core/QueueDS';

interface QueueElementItem<T> {
  id: number; // Unique ID for animation key
  value: T;
}

let nextId = 0; // For unique IDs

const queueDS = reactive(new QueueDS<number>());
const inputValue = ref<number | null>(null);
const operationResult = ref<string | number | null | undefined>(null);

const highlightedDequeueId = ref<number | null>(null);
const highlightedEnqueueId = ref<number | null>(null);
const peekedFrontId = ref<number | null>(null);
const peekedRearId = ref<number | null>(null);

// Create a computed property for elements with unique IDs for transitions
const displayedQueueElements = computed(() => {
  // Assign temporary IDs for animation. A more robust system might be needed for complex cases.
  return queueDS.getElements().map((val, index) => ({
    id: index, // Using index as ID for simplicity
    value: val
  }));
});

const resetHighlights = () => {
  highlightedDequeueId.value = null;
  highlightedEnqueueId.value = null;
  peekedFrontId.value = null;
  peekedRearId.value = null;
};

const animateOperation = (elementId?: number, type: 'enqueue' | 'dequeue' | 'peek-front' | 'peek-rear' = 'enqueue') => {
  resetHighlights();
  if (elementId !== undefined) {
    switch (type) {
      case 'enqueue':
        highlightedEnqueueId.value = elementId;
        break;
      case 'dequeue':
        highlightedDequeueId.value = elementId;
        break;
      case 'peek-front':
        peekedFrontId.value = elementId;
        break;
      case 'peek-rear':
        peekedRearId.value = elementId;
        break;
    }
    setTimeout(() => {
      resetHighlights();
    }, 700); // Animation duration
  }
};

const handleEnqueue = () => {
  if (inputValue.value === null) {
    operationResult.value = "请输入要入队的值";
    return;
  }
  queueDS.enqueue(inputValue.value);
  // For enqueue, the new element is at the end.
  // Its ID (index) will be queueDS.size() - 1 after push.
  const newElementId = displayedQueueElements.value.length -1;
  animateOperation(newElementId, 'enqueue');
  operationResult.value = `元素 ${inputValue.value} 已入队`;
  inputValue.value = null;
};

const handleDequeue = () => {
  if (queueDS.isEmpty()) {
    operationResult.value = "队列为空，无法出队";
    return;
  }
  // The element to be dequeued is at the front (index 0).
  const frontElementId = displayedQueueElements.value[0]?.id; // Get ID before it's removed
  if (frontElementId !== undefined) {
     animateOperation(frontElementId, 'dequeue');
  }
  const dequeuedValue = queueDS.dequeue();
  operationResult.value = `元素 ${dequeuedValue} 已出队`;
};

const handleFront = () => {
  if (queueDS.isEmpty()) {
    operationResult.value = "队列为空，无法查看队首";
    return;
  }
  const frontValue = queueDS.front();
  const frontElementId = displayedQueueElements.value[0]?.id;
  if (frontElementId !== undefined) {
    animateOperation(frontElementId, 'peek-front');
  }
  operationResult.value = `队首元素是 ${frontValue}`;
};

const handleRear = () => {
  if (queueDS.isEmpty()) {
    operationResult.value = "队列为空，无法查看队尾";
    return;
  }
  const rearValue = queueDS.rear();
  const rearElementId = displayedQueueElements.value[displayedQueueElements.value.length - 1]?.id;
   if (rearElementId !== undefined) {
    animateOperation(rearElementId, 'peek-rear');
  }
  operationResult.value = `队尾元素是 ${rearValue}`;
};

const handleClear = () => {
  queueDS.clear();
  operationResult.value = "队列已清空";
  resetHighlights();
};

</script>

<style scoped>
.queue-visualizer {
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
  border-color: var(--queue-color);
  box-shadow: 0 0 0 3px var(--queue-bg);
  outline: none;
}

.controls button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--queue-color);
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

.visualization-area {
  display: flex;
  align-items: center;
  min-height: 120px;
  position: relative;
  padding: 0 var(--spacing-2xl);
  border: 2px solid var(--queue-border);
  border-radius: var(--border-radius-md);
  background-color: var(--neutral-100);
}

.queue-container {
  display: flex;
  align-items: center;
  min-height: 80px;
  width: 100%;
  background-color: white;
  overflow-x: auto;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm) inset;
}

.queue-items {
  display: flex;
  align-items: center;
  height: 100%;
  padding: var(--spacing-xs) 0;
}

.queue-element {
  background-color: var(--queue-bg);
  border: 2px solid var(--queue-color);
  color: var(--neutral-800);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-right: var(--spacing-sm);
  min-width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
  text-align: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  transition: all 0.5s ease, transform 0.3s ease, background-color 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.queue-element:last-child {
  margin-right: 0;
}

.queue-element.highlighted-enqueue {
  background-color: var(--accent-bg);
  border-color: var(--accent-color);
  transform: scale(1.1);
  z-index: 10;
  box-shadow: var(--shadow-md);
}

.queue-element.highlighted-dequeue {
  background-color: var(--error-color);
  border-color: var(--accent-dark);
  color: white;
  transform: scale(0.8);
  opacity: 0.7;
}

.queue-element.peeked-front {
  background-color: var(--success-color);
  border-color: var(--secondary-dark);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.4);
}

.queue-element.peeked-rear {
  background-color: var(--info-color);
  border-color: var(--primary-dark);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.4);
}

.empty-message {
  width: 100%;
  text-align: center;
  color: var(--neutral-500);
  font-style: italic;
  padding: var(--spacing-md);
}

.queue-label {
  font-size: var(--font-size-md);
  color: var(--queue-color);
  font-weight: var(--font-weight-bold);
  position: absolute;
  background-color: var(--neutral-100);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  z-index: 5;
}

.front-label {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse-left 2s infinite;
}

.rear-label {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  animation: pulse-right 2s infinite;
}

@keyframes pulse-left {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(5px); }
  100% { transform: translateY(-50%) translateX(0); }
}

@keyframes pulse-right {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(-5px); }
  100% { transform: translateY(-50%) translateX(0); }
}

/* Animation for queue items */
.queue-item-animation-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.queue-item-animation-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.queue-item-animation-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.8);
}

.queue-item-animation-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.8);
}

.output {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--neutral-100);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--queue-color);
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

  .visualization-area {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .queue-label {
    position: relative;
    transform: none;
    display: inline-block;
    margin-bottom: var(--spacing-xs);
  }

  .front-label, .rear-label {
    animation: none;
  }
}
</style>
