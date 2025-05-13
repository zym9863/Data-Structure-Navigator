<template>
  <div class="tutorial-section-container">
    <div class="introduction">
      <h3>数据结构导论</h3>
      <p>数据结构是计算机存储、组织数据的方式。它意味着接口或抽象数据类型 (ADT) 的集合，这些接口定义了数据结构可以执行的操作以及这些操作的计算复杂度。选择合适的数据结构可以提高算法效率和程序性能。</p>
      <h4>重要性:</h4>
      <ul>
        <li><strong>效率:</strong> 合适的数据结构可以显著提高数据存取和操作的效率。</li>
        <li><strong>问题解决:</strong> 很多复杂问题可以通过选择恰当的数据结构来简化。</li>
        <li><strong>代码可维护性:</strong> 清晰的数据结构有助于编写更易于理解和维护的代码。</li>
      </ul>
      <h4>常见分类:</h4>
      <ul>
        <li><strong>线性结构:</strong> 数据元素之间存在一对一的关系 (如: 数组, 链表, 栈, 队列)。</li>
        <li><strong>非线性结构:</strong> 数据元素之间存在一对多或多对多的关系 (如: 树, 图)。</li>
      </ul>
    </div>

    <hr />

    <div class="complexity-overview">
      <h3>时间与空间复杂度概览</h3>
      <p>在评估算法和数据结构时，我们通常关注其时间和空间复杂度。</p>
      <ul>
        <li><strong>时间复杂度:</strong> 描述算法执行时间随输入规模增长而变化的趋势 (常用大O表示法)。</li>
        <li><strong>空间复杂度:</strong> 描述算法执行过程中所需存储空间随输入规模增长而变化的趋势。</li>
      </ul>
    </div>

    <hr />

    <div class="data-structure-details">
      <h3>各数据结构复杂度分析</h3>
      <div v-for="ds in dataStructuresInfo" :key="ds.name" class="ds-info-card">
        <h4>{{ ds.name }}</h4>
        <p><strong>定义:</strong> {{ ds.definition }}</p>
        <table class="complexity-table">
          <thead>
            <tr>
              <th>操作</th>
              <th>平均时间复杂度</th>
              <th>最坏时间复杂度</th>
              <th>空间复杂度 (辅助)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="op in ds.operations" :key="op.name">
              <td>{{ op.name }}</td>
              <td><code>{{ op.avgTime }}</code></td>
              <td><code>{{ op.worstTime }}</code></td>
              <td><code>{{ op.space }}</code></td>
            </tr>
          </tbody>
        </table>
        <p v-if="ds.notes"><strong>备注:</strong> {{ ds.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dataStructuresInfo = ref([
  {
    name: '数组 (Array)',
    definition: '一组连续的内存位置，用于存储相同类型的元素。通过索引直接访问元素。',
    operations: [
      { name: '访问 (Access)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '查找 (Search)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' },
      { name: '插入 (Insert)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' }, // 平均和最坏都是因为可能需要移动元素
      { name: '删除 (Delete)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' }, // 同上
    ],
    notes: '插入/删除到末尾且无需扩容时为 O(1)。动态数组扩容可能导致某些操作的摊还复杂度变化。'
  },
  {
    name: '链表 (Linked List)',
    definition: '一系列节点，每个节点包含数据和指向下一个节点的引用 (单向链表)。',
    operations: [
      { name: '访问 (Access by index)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' },
      { name: '查找 (Search)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' },
      { name: '插入 (Insert at beginning)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '插入 (Insert at end - if tail pointer exists)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '插入 (Insert at middle)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' }, // 需要先找到位置
      { name: '删除 (Delete at beginning)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '删除 (Delete at end - if tail pointer and doubly linked)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '删除 (Delete at middle)', avgTime: 'O(n)', worstTime: 'O(n)', space: 'O(1)' }, // 需要先找到位置
    ],
    notes: '对于单向链表，删除尾节点需要 O(n) 来找到前驱。双向链表在某些操作上更优。'
  },
  {
    name: '栈 (Stack)',
    definition: '一种后进先出 (LIFO) 的数据结构，所有操作都在结构的一端（栈顶）进行。',
    operations: [
      { name: '入栈 (Push)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' }, // 基于数组实现时，若数组需扩容则为 O(n) 摊还
      { name: '出栈 (Pop)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '查看栈顶 (Peek)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
    ],
    notes: '通常基于数组或链表实现。上述复杂度基于高效实现。'
  },
  {
    name: '队列 (Queue)',
    definition: '一种先进先出 (FIFO) 的数据结构，元素从一端（队尾）进入，从另一端（队首）离开。',
    operations: [
      { name: '入队 (Enqueue)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' }, // 基于链表或优化数组（如循环队列）
      { name: '出队 (Dequeue)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
      { name: '查看队首 (Front/Peek)', avgTime: 'O(1)', worstTime: 'O(1)', space: 'O(1)' },
    ],
    notes: '基于普通数组实现时，出队可能为 O(n)。循环队列或链表实现可达到 O(1)。'
  }
]);
</script>

<style scoped>
.tutorial-section-container {
  padding: var(--spacing-lg);
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.introduction, .complexity-overview, .data-structure-details {
  margin-bottom: var(--spacing-xl);
}

h3 {
  color: var(--primary-color);
  border-bottom: 2px solid var(--neutral-200);
  padding-bottom: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

h4 {
  color: var(--primary-dark);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

ul {
  list-style-type: disc;
  padding-left: var(--spacing-xl);
  line-height: var(--line-height-loose);
  margin-bottom: var(--spacing-md);
}

li {
  margin-bottom: var(--spacing-sm);
  position: relative;
}

li::marker {
  color: var(--primary-color);
}

strong {
  color: var(--neutral-700);
  font-weight: var(--font-weight-bold);
}

hr {
  border: none;
  border-top: 1px solid var(--neutral-200);
  margin: var(--spacing-xl) 0;
}

.ds-info-card {
  background-color: var(--neutral-100);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--neutral-200);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.ds-info-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.ds-info-card h4 {
  color: var(--primary-color);
  margin-top: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
}

.ds-info-card h4::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  margin-right: var(--spacing-sm);
}

.complexity-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: var(--spacing-md) 0;
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.complexity-table th, .complexity-table td {
  border: 1px solid var(--neutral-300);
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
}

.complexity-table th {
  background-color: var(--primary-bg);
  color: var(--primary-dark);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  font-size: var(--font-size-xs);
  letter-spacing: 0.5px;
}

.complexity-table tr:nth-child(even) {
  background-color: var(--neutral-100);
}

.complexity-table tr:hover {
  background-color: var(--primary-bg);
}

.complexity-table td code {
  background-color: var(--neutral-200);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  font-family: 'Courier New', Courier, monospace;
  color: var(--primary-dark);
  font-weight: var(--font-weight-medium);
}

.ds-info-card p {
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-normal);
  color: var(--neutral-700);
}

.ds-info-card p strong {
  color: var(--neutral-800);
  font-weight: var(--font-weight-bold);
}

/* 添加响应式设计 */
@media (max-width: 768px) {
  .complexity-table {
    font-size: var(--font-size-xs);
  }

  .complexity-table th, .complexity-table td {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .ds-info-card {
    padding: var(--spacing-md);
  }
}
</style>
