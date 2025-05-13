// 定义链表节点
class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedListDS<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private count: number;

  constructor(initialData: T[] = []) {
    this.head = null;
    this.tail = null;
    this.count = 0;
    initialData.forEach(item => this.append(item));
  }

  // 获取所有元素
  getElements(): T[] {
    const elements: T[] = [];
    let current = this.head;
    while (current) {
      elements.push(current.value);
      current = current.next;
    }
    return elements;
  }

  // 在链表尾部添加元素
  append(element: T): void {
    const newNode = new ListNode(element);
    if (!this.head) { // 如果链表为空
      this.head = newNode;
      this.tail = newNode;
    } else { // 链表不为空
      this.tail!.next = newNode; // tail is guaranteed to exist if head exists and count > 0
      this.tail = newNode;
    }
    this.count++;
  }

  // 在指定索引处插入元素
  insert(index: number, element: T): boolean {
    if (index < 0 || index > this.count) {
      console.error("插入失败：索引越界");
      return false;
    }

    if (index === this.count) { // 插入到尾部
      this.append(element);
      return true;
    }

    const newNode = new ListNode(element);
    if (index === 0) { // 插入到头部
      newNode.next = this.head;
      this.head = newNode;
      // 如果原链表为空, tail 已经在 append 中处理 (index === this.count 会先命中)
      // 此处 index === 0 且 index < this.count 意味着链表非空
    } else { // 插入到中间
      let previousNode = this.head;
      // 遍历到插入位置的前一个节点
      for (let i = 0; i < index - 1; i++) {
        if (!previousNode) { // 不应该发生，因为 index < this.count
          console.error("插入失败：遍历时出现意外错误");
          return false;
        }
        previousNode = previousNode.next;
      }
      
      if (!previousNode) { // 不应该发生
        console.error("插入失败：无法找到插入点的前一个节点");
        return false;
      }
      newNode.next = previousNode.next;
      previousNode.next = newNode;
    }
    this.count++;
    return true;
  }

  // 删除指定索引处的元素
  delete(index: number): T | null {
    if (index < 0 || index >= this.count || !this.head) {
      console.error("删除失败：索引越界或链表为空");
      return null;
    }

    let removedValue: T | null = null;

    if (index === 0) { // 删除头节点
      removedValue = this.head.value;
      this.head = this.head.next;
      if (!this.head) { // 如果删除后链表为空
        this.tail = null;
      }
    } else { // 删除中间或尾部节点
      let previousNode = this.head;
      // 遍历到要删除节点的前一个节点
      for (let i = 0; i < index - 1; i++) {
        if (!previousNode || !previousNode.next) { // 不应该发生
          console.error("删除失败：遍历时无法找到目标节点的前驱");
          return null;
        }
        previousNode = previousNode.next;
      }

      // previousNode 是要删除节点的前一个节点
      if (!previousNode || !previousNode.next) { // 不应该发生
        console.error("删除失败：目标节点或其前驱不存在");
        return null;
      }
      
      removedValue = previousNode.next.value;
      previousNode.next = previousNode.next.next; // 执行删除

      if (!previousNode.next) { // 如果删除的是尾节点，更新 tail
        this.tail = previousNode;
      }
    }

    this.count--;
    return removedValue;
  }

  // 查找元素，返回其索引，未找到则返回 -1
  find(element: T): number {
    let current = this.head;
    let idx = 0;
    while (current) {
      if (current.value === element) {
        return idx;
      }
      current = current.next;
      idx++;
    }
    return -1;
  }

  // 获取指定索引处的元素
  get(index: number): T | null {
    if (index < 0 || index >= this.count) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) { // 不应该发生，因为 index < this.count
        return null;
      }
      current = current.next;
    }
    return current ? current.value : null; // current 此时指向目标节点
  }

  // 获取链表长度
  size(): number {
    return this.count;
  }

  // 清空链表
  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  // (可选) 获取头节点，用于可视化
  getHead(): ListNode<T> | null {
    return this.head;
  }
}
