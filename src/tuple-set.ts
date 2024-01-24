export default class TupleSet {
  private data: Map<number, Set<number>>;
  private count: number;

  public constructor() {
    this.data = new Map();
    this.count = 0;
  }

  public add([first, second]: [any, any]) {
    if (!this.data.has(first)) {
      this.data.set(first, new Set());
    }

    this.data.get(first).add(second);
    this.count++;
    return this;
  }

  public has([first, second]: [any, any]): boolean {
    return this.data.has(first) && this.data.get(first).has(second);
  }

  public delete([first, second]: [any, any]): boolean {
    if (!this.data.has(first) || !this.data.get(first).has(second)) {
      return false;
    }

    this.data.get(first).delete(second);
    if (this.data.get(first).size === 0) {
      this.data.delete(first);
    }
    this.count--;
    return true;
  }

  public empty(): boolean {
    return this.count == 0;
  }
}
