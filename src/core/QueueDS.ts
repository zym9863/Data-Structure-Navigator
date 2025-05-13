export class QueueDS<T> {
  private data: T[];

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  // 入队 (在数组末尾添加元素)
  enqueue(element: T): void {
    this.data.push(element);
  }

  // 出队 (移除并返回数组头部的元素)
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      console.error("出队失败：队列为空");
      return undefined;
    }
    return this.data.shift(); // shift() 移除并返回第一个元素
  }

  // 查看队首元素 (不移除)
  front(): T | undefined {
    if (this.isEmpty()) {
      console.error("查看队首失败：队列为空");
      return undefined;
    }
    return this.data[0];
  }

  // 查看队尾元素 (不移除) - 可选
  rear(): T | undefined {
    if (this.isEmpty()) {
      console.error("查看队尾失败：队列为空");
      return undefined;
    }
    return this.data[this.data.length - 1];
  }

  // 检查队列是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 获取队列的大小
  size(): number {
    return this.data.length;
  }

  // 清空队列
  clear(): void {
    this.data = [];
  }

  // 获取所有元素 (主要用于可视化或调试)
  getElements(): T[] {
    return [...this.data];
  }
}
