/**
 * Heap interface that clients need to implement in order to use this library.
 *
 * @example
 * let elements = [3,2,1];
 * const myHeap = {
 *   Len(): number {
 *     return elements.length;
 *   },
 *   Less(i: number, j: number): boolean {
 *    return elements[i] < elements[j]; // min-heap
 *   },
 *   Swap(i: number, j: number) {
 *     [elements[i], elements[j]] = [elements[j], elements[i]];
 *   },
 *   Push(val: any) {
 *     elements.push(val as number);
 *   },
 *   Pop(): any {
 *     const val = elements.at(-1);
 *     elements = elements.slice(0, elements.length - 1);
 *     return val;
 *   },
 * }
 * heap.Init(myHeap);
 */
export interface Heap {
  Len(): number
  Less(i: number, j: number): boolean
  Swap(i: number, j: number): void
  Push(val: unknown): void
  Pop(): unknown
}

const up = (heapObj: Heap, index: number) => {
  let i = index;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (!heapObj.Less(i, parent)) {
      break;
    }
    heapObj.Swap(i, parent);
    i = parent;
  }
};

const down = (heapObj: Heap, index: number): boolean => {
  const deriveChild = (i: number): [number, number, boolean] => {
    const left = 2 * i + 1;
    const right = left + 1;
    if (left >= heapObj.Len()) {
      return [-1, -1, false];
    }
    let child = left;
    if (right < heapObj.Len() && heapObj.Less(right, child)) {
      child = right;
    }
    return [i, child, true];
  };
  let [curr, child, isValid] = deriveChild(index);
  while (isValid && heapObj.Less(child, curr)) {
    heapObj.Swap(curr, child);
    curr = child;
    [curr, child, isValid] = deriveChild(curr);
  }
  return curr > index;
};

export const heap = {
  /**
   * Heapify the input object.
   *
   * @param heapObj - The object that implements the Heap interface.
   *
   * @example
   * let elements = [3,2,1];
   * const myHeap = {
   *   Len(): number {
   *     return elements.length;
   *   },
   *   Less(i: number, j: number): boolean {
   *    return elements[i] < elements[j]; // min-heap
   *   },
   *   Swap(i: number, j: number) {
   *     [elements[i], elements[j]] = [elements[j], elements[i]];
   *   },
   *   Push(val: any) {
   *     elements.push(val as number);
   *   },
   *   Pop(): any {
   *     const val = elements.at(-1);
   *     elements = elements.slice(0, elements.length - 1);
   *     return val;
   *   },
   * }
   * heap.Init(myHeap);
   */
  Init(heapObj: Heap) {
    const midIndex = Math.floor(heapObj.Len() / 2) - 1;
    for (let i = midIndex; i >= 0; i -= 1) {
      down(heapObj, i);
    }
  },
  /**
   * Pushes a new element into the heap.
   *
   * @param heapObj - The object that implements the Heap interface.
   * @param val - The new element that is to be added to the heap.
   *
   * @example
   * heap.Push(myHeap, -1);
   */
  Push(heapObj: Heap, val: unknown) {
    heapObj.Push(val);
    up(heapObj, heapObj.Len() - 1);
  },
  /**
   * Pops the top element out of the heap.
   *
   * @param heapObj - The object that implements the Heap interface.
   * @returns - The element that is removed from the heap.
   *
   * @example
   * console.log(heap.Pop(myHeap)); // -1
   */
  Pop(heapObj: Heap) {
    heapObj.Swap(0, heapObj.Len() - 1);
    const val = heapObj.Pop();
    down(heapObj, 0);
    return val;
  },
};
