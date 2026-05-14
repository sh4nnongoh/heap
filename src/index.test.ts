import { heap, type Heap } from './index.ts';

type TestHeap = Heap & { elements: number[] };

function createMinHeap(initialElements: number[] = []): TestHeap {
  const elements = [...initialElements];
  return {
    elements,
    Len: () => elements.length,
    Less: (i: number, j: number) => elements[i] < elements[j],
    Swap: (i: number, j: number) => { [elements[i], elements[j]] = [elements[j], elements[i]]; },
    Push: (val: unknown) => { elements.push(val as number); },
    Pop: () => elements.pop(),
  };
}

function createMaxHeap(initialElements: number[] = []): TestHeap {
  const elements = [...initialElements];
  return {
    elements,
    Len: () => elements.length,
    Less: (i: number, j: number) => elements[i] > elements[j], // > for max‑heap
    Swap: (i: number, j: number) => { [elements[i], elements[j]] = [elements[j], elements[i]]; },
    Push: (val: unknown) => { elements.push(val as number); },
    Pop: () => elements.pop(),
  };
}

describe('heap', () => {
  describe('Init', () => {
    it('should heapify an arbitrary array into a valid min‑heap', () => {
      const h = createMinHeap([3, 1, 4, 1, 5, 9, 2]);
      heap.Init(h);
      // After Init, the smallest element should be at index 0
      expect(h.elements[0]).toBe(1); // min is 1
      // Additional heap property check: for every parent i, child should be >= parent
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] <= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] <= h.elements[right]).toBe(true);
        }
      }
    });

    it('should heapify into a valid max‑heap', () => {
      const h = createMaxHeap([3, 1, 4, 1, 5, 9, 2]);
      heap.Init(h);
      expect(h.elements[0]).toBe(9); // max is 9
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] >= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] >= h.elements[right]).toBe(true);
        }
      }
    });

    it('should handle empty array', () => {
      const h = createMinHeap([]);
      heap.Init(h);
      expect(h.elements).toEqual([]);
    });

    it('should handle single element', () => {
      const h = createMinHeap([42]);
      heap.Init(h);
      expect(h.elements).toEqual([42]);
    });
  });

  describe('Push', () => {
    it('should insert element and maintain min‑heap property', () => {
      const h = createMinHeap([10, 20, 30]);
      heap.Init(h);
      heap.Push(h, 5);
      expect(h.elements[0]).toBe(5);
      // Verify heap property after push
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] <= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] <= h.elements[right]).toBe(true);
        }
      }
    });

    it('should insert element and maintain max‑heap property', () => {
      const h = createMaxHeap([10, 20, 30]);
      heap.Init(h);
      heap.Push(h, 25);
      expect(h.elements[0]).toBe(30); // root unchanged
      // Check heap property
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] >= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] >= h.elements[right]).toBe(true);
        }
      }
    });

    it('should push multiple elements and keep heap order', () => {
      const h = createMinHeap();
      heap.Push(h, 5);
      heap.Push(h, 3);
      heap.Push(h, 8);
      heap.Push(h, 1);
      // The heap should always have the smallest at root
      expect(h.elements[0]).toBe(1);
    });
  });

  describe('Pop', () => {
    it('should remove and return the minimum element from min‑heap', () => {
      const h = createMinHeap([5, 3, 8, 1]);
      heap.Init(h);
      const popped = heap.Pop(h);
      expect(popped).toBe(1);
      expect(h.elements[0]).toBe(3); // next smallest becomes root
      // Heap property still holds
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] <= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] <= h.elements[right]).toBe(true);
        }
      }
    });

    it('should remove and return the maximum element from max‑heap', () => {
      const h = createMaxHeap([5, 3, 8, 1]);
      heap.Init(h);
      const popped = heap.Pop(h);
      expect(popped).toBe(8);
      expect(h.elements[0]).toBe(5); // new root
      for (let i = 0; i < h.elements.length; i += 1) {
        const left = 2 * i + 1;
        const right = left + 1;
        if (left < h.elements.length) {
          expect(h.elements[i] >= h.elements[left]).toBe(true);
        }
        if (right < h.elements.length) {
          expect(h.elements[i] >= h.elements[right]).toBe(true);
        }
      }
    });

    it('should pop elements in sorted order (min‑heap)', () => {
      const h = createMinHeap([9, 4, 7, 2, 5, 1, 6]);
      heap.Init(h);
      const sorted: number[] = [];
      while (h.elements.length > 0) {
        sorted.push(heap.Pop(h) as number);
      }
      expect(sorted).toEqual([1, 2, 4, 5, 6, 7, 9]);
    });

    it('should pop elements in sorted order (max‑heap)', () => {
      const h = createMaxHeap([9, 4, 7, 2, 5, 1, 6]);
      heap.Init(h);
      const sorted: number[] = [];
      while (h.elements.length > 0) {
        sorted.push(heap.Pop(h) as number);
      }
      expect(sorted).toEqual([9, 7, 6, 5, 4, 2, 1]);
    });

    it('should pop from single‑element heap', () => {
      const h = createMinHeap([42]);
      heap.Init(h);
      expect(heap.Pop(h)).toBe(42);
      expect(h.elements).toEqual([]);
    });

    it('should pop and push interleaved', () => {
      const h = createMinHeap();
      heap.Push(h, 10);
      heap.Push(h, 5);
      expect(heap.Pop(h)).toBe(5);
      heap.Push(h, 3);
      expect(heap.Pop(h)).toBe(3);
      expect(heap.Pop(h)).toBe(10);
    });
  });

  describe('Edge cases', () => {
    it('should work with duplicate values', () => {
      const h = createMinHeap([3, 1, 3, 1]);
      heap.Init(h);
      expect(heap.Pop(h)).toBe(1);
      expect(heap.Pop(h)).toBe(1);
      expect(heap.Pop(h)).toBe(3);
      expect(heap.Pop(h)).toBe(3);
    });

    it('should work with negative numbers', () => {
      const h = createMinHeap([-5, -10, 0, -1]);
      heap.Init(h);
      expect(heap.Pop(h)).toBe(-10);
      expect(heap.Pop(h)).toBe(-5);
      expect(heap.Pop(h)).toBe(-1);
      expect(heap.Pop(h)).toBe(0);
    });
  });
});
