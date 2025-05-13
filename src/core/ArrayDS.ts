export class ArrayDS<T> {
  private data: T[];

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  // 获取所有元素
  getElements(): T[] {
    return [...this.data];
  }

  // 在指定索引处插入元素
  insert(index: number, element: T): boolean {
    if (index < 0 || index > this.data.length) {
      console.error("插入失败：索引越界");
      return false;
    }
    this.data.splice(index, 0, element);
    return true;
  }

  // 删除指定索引处的元素
  delete(index: number): T | null {
    if (index < 0 || index >= this.data.length) {
      console.error("删除失败：索引越界");
      return null;
    }
    return this.data.splice(index, 1)[0];
  }

  // 查找元素，返回其索引，未找到则返回 -1
  find(element: T): number {
    return this.data.indexOf(element);
  }

  // 更新指定索引处的元素
  update(index: number, element: T): boolean {
    if (index < 0 || index >= this.data.length) {
      console.error("更新失败：索引越界");
      return false;
    }
    this.data[index] = element;
    return true;
  }

  // 获取指定索引处的元素
  get(index: number): T | null {
    if (index < 0 || index >= this.data.length) {
      console.error("获取失败：索引越界");
      return null;
    }
    return this.data[index];
  }

  // 获取数组长度
  size(): number {
    return this.data.length;
  }

  // 清空数组
  clear(): void {
    this.data = [];
  }
}
