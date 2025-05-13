<template>
  <div class="stack-visualizer">
    <h3>栈可视化器</h3>
    <div class="controls">
      <input type="number" v-model.number="inputValue" placeholder="值" />
      <button @click="handlePush">入栈 (Push)</button>
      <button @click="handlePop">出栈 (Pop)</button>
      <button @click="handlePeek">查看栈顶 (Peek)</button>
      <button @click="handleClear">清空</button>
    </div>
    <div class="visualization-area">
      <div class="stack-container">
        <div class="stack-base">栈底</div>
        <transition-group name="stack-item-animation" tag="div" class="stack-items">
          <div
            v-for="(element, index) in displayedStackElements"
            :key="element.id"
            class="stack-element"
            :class="{ 'highlighted': highlightedElementId === element.id, 'peeked': peekedElementId === element.id }"
            :style="{ 'bottom': (index * 45) + 'px' }"
          >
            {{ element.value }}
          </div>
        </transition-group>
        <div v-if="stackDS.isEmpty()" class="empty-message">栈为空</div>
      </div>
      <div class="stack-top-indicator" v-if="!stackDS.isEmpty()">
        <span>➔ 栈顶</span>
      </div>
    </div>
    <div class="output">
      <p>操作结果: {{ operationResult }}</p>
      <p>栈大小: {{ stackDS.size() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { StackDS } from '../core/StackDS';

interface StackElementItem<T> {
  id: number; // Unique ID for animation key
  value: T;
}

let nextId = 0; // For unique IDs

const stackDS = reactive(new StackDS<number>());
const inputValue = ref<number | null>(null);
const operationResult = ref<string | number | null | undefined>(null);
const highlightedElementId = ref<number | null>(null); // For push/pop animation
const peekedElementId = ref<number | null>(null); // For peek animation

// Create a computed property for elements with unique IDs for transitions
const displayedStackElements = computed(() => {
  return stackDS.getElements().map((val, index) => ({
    // Attempt to find an existing ID or assign a new one.
    // This is a simplified ID management for animations.
    // A more robust solution might involve mapping values to persistent IDs if values are unique,
    // or managing IDs more explicitly within StackDS for visualization purposes.
    // For now, we'll use a temporary approach that might not be perfect for all scenarios.
    id: index, // Using index as ID for simplicity, might need adjustment for complex animations
    value: val
  })).reverse(); // Reverse for typical stack display (top at the end of array, visually on top)
});


const animateOperation = (elementId?: number, type: 'highlight' | 'peek' = 'highlight') => {
  highlightedElementId.value = null;
  peekedElementId.value = null;
  if (elementId !== undefined) {
    if (type === 'peek') {
      peekedElementId.value = elementId;
    } else {
      highlightedElementId.value = elementId;
    }
    setTimeout(() => {
      highlightedElementId.value = null;
      peekedElementId.value = null;
    }, 700); // Animation duration
  }
};

const handlePush = () => {
  if (inputValue.value === null) {
    operationResult.value = "请输入要入栈的值";
    return;
  }
  const newId = nextId++;
  // For animation, we'd ideally know the ID of the element *before* it's added
  // This requires a bit more complex state management or assumptions.
  // Let's assume the new element will be at the "top" (end of array, visually top).
  stackDS.push(inputValue.value);
  // Find the ID of the pushed element. Since we use index as ID in displayedStackElements,
  // and it's reversed, the top element (last pushed) will have index 0 in displayedStackElements.
  const topElementForAnimation = displayedStackElements.value[0];
  if (topElementForAnimation) {
    animateOperation(topElementForAnimation.id);
  }
  operationResult.value = `元素 ${inputValue.value} 已入栈`;
  inputValue.value = null;
};

const handlePop = () => {
  if (stackDS.isEmpty()) {
    operationResult.value = "栈为空，无法出栈";
    return;
  }
  // Get the ID of the element about to be popped
  const topElementForAnimation = displayedStackElements.value[0];
  if (topElementForAnimation) {
     animateOperation(topElementForAnimation.id);
  }
  const poppedValue = stackDS.pop();
  operationResult.value = `元素 ${poppedValue} 已出栈`;
};

const handlePeek = () => {
  if (stackDS.isEmpty()) {
    operationResult.value = "栈为空，无法查看栈顶";
    return;
  }
  const peekedValue = stackDS.peek();
  const topElementForAnimation = displayedStackElements.value[0];
   if (topElementForAnimation) {
    animateOperation(topElementForAnimation.id, 'peek');
  }
  operationResult.value = `栈顶元素是 ${peekedValue}`;
};

const handleClear = () => {
  stackDS.clear();
  operationResult.value = "栈已清空";
  highlightedElementId.value = null;
  peekedElementId.value = null;
};

</script>

<style scoped>
.stack-visualizer {
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
  border-color: var(--stack-color);
  box-shadow: 0 0 0 3px var(--stack-bg);
  outline: none;
}

.controls button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--stack-color);
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
  background-color: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.controls button:active {
  transform: translateY(0);
}

.visualization-area {
  display: flex;
  align-items: flex-end;
  min-height: 280px;
  position: relative;
  padding: var(--spacing-md);
  border: 2px solid var(--stack-border);
  border-radius: var(--border-radius-md);
  background-color: var(--neutral-100);
}

.stack-container {
  position: relative;
  width: 120px;
  min-height: 240px;
  border: 2px solid var(--neutral-400);
  border-top: none;
  background-color: white;
  margin-right: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: var(--shadow-sm);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
}

.stack-base {
  text-align: center;
  padding: var(--spacing-sm);
  color: var(--neutral-600);
  font-size: var(--font-size-sm);
  border-top: 2px dashed var(--neutral-300);
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--neutral-100);
  font-weight: var(--font-weight-medium);
}

.stack-items {
  position: relative;
  width: 100%;
  flex-grow: 1;
}

.stack-element {
  background-color: var(--stack-bg);
  border: 2px solid var(--stack-color);
  color: var(--neutral-800);
  padding: var(--spacing-sm);
  margin: 0 auto 5px auto;
  width: 80%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
  text-align: center;
  font-weight: var(--font-weight-bold);
  position: absolute;
  left: 10%;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.3s, border-color 0.3s;
  box-shadow: var(--shadow-sm);
  font-size: var(--font-size-md);
}

.stack-element.highlighted {
  background-color: var(--success-color);
  border-color: var(--secondary-dark);
  color: white;
  transform: scale(1.1);
  z-index: 10;
  box-shadow: var(--shadow-md);
}

.stack-element.peeked {
  background-color: var(--info-color);
  border-color: var(--primary-dark);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.4);
}

.empty-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--neutral-500);
  font-style: italic;
  text-align: center;
  width: 100%;
}

.stack-top-indicator {
  position: absolute;
  bottom: var(--spacing-md);
  left: 140px;
  display: flex;
  align-items: center;
  font-size: var(--font-size-lg);
  color: var(--stack-color);
  font-weight: var(--font-weight-bold);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.stack-top-indicator span {
  position: absolute;
  bottom: calc(var(--stack-size, 0) * 45px + 10px);
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Animation for stack items */
.stack-item-animation-enter-active,
.stack-item-animation-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.stack-item-animation-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}

.stack-item-animation-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

.output {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--neutral-100);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--stack-color);
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
    flex-direction: column;
    align-items: center;
  }

  .stack-container {
    margin-right: 0;
    margin-bottom: var(--spacing-lg);
  }

  .stack-top-indicator {
    position: relative;
    left: auto;
    bottom: auto;
    margin-top: var(--spacing-sm);
  }
}
</style>
