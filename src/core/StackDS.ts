export class StackDS<T> {
  private data: T[];

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  // 入栈 (在数组末尾添加元素)
  push(element: T): void {
    this.data.push(element);
  }

  // 出栈 (移除并返回数组末尾的元素)
  pop(): T | undefined {
    if (this.isEmpty()) {
      console.error("出栈失败：栈为空");
      return undefined;
    }
    return this.data.pop();
  }

  // 查看栈顶元素 (不移除)
  peek(): T | undefined {
    if (this.isEmpty()) {
      console.error("查看栈顶失败：栈为空");
      return undefined;
    }
    return this.data[this.data.length - 1];
  }

  // 检查栈是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 获取栈的大小
  size(): number {
    return this.data.length;
  }

  // 清空栈
  clear(): void {
    this.data = [];
  }

  // 获取所有元素 (主要用于可视化或调试)
  getElements(): T[] {
    return [...this.data];
  }
}
