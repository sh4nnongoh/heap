# Heap

[![npm version](https://img.shields.io/npm/v/@sh4nnongoh/heap)](https://www.npmjs.com/package/@sh4nnongoh/heap)
[![codecov](https://codecov.io/gh/sh4nnongoh/heap/branch/main/graph/badge.svg)](https://codecov.io/gh/sh4nnongoh/heap)
[![Socket Badge](https://badge.socket.dev/npm/package/@sh4nnongoh/heap)](https://socket.dev/npm/package/%40sh4nnongoh%2Fheap)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/@sh4nnongoh/heap)](https://bundlephobia.com/result?p=@sh4nnongoh/heap)
[![Known Vulnerabilities](https://snyk.io/test/npm/@sh4nnongoh/heap/badge.svg)](https://snyk.io/test/npm/@sh4nnongoh/heap)
[![Dependency Graph](https://img.shields.io/badge/npmgraph-Dependency%20Graph-blue)](https://npmgraph.js.org/?q=%40sh4nnongoh%2Fheap)

Heap is a npm library for adding heap functionality to your Javascript / Typescript application; inspired by [Go's heap implementation](https://pkg.go.dev/container/heap).

## Installation

```bash
npm i @sh4nnongoh/heap
```

## Example

Finding the median value in a data stream: 
https://neetcode.io/problems/find-median-in-a-data-stream

```ts
import { heap, type Heap } from "@sh4nnongoh/heap";

interface MyHeap extends Heap {
  Peek(): any
}

const NewHeap = (elements: number[] = [], isMinHeap: boolean): MyHeap => {
  const lessFunc = (i: number, j: number): boolean => {
    if (isMinHeap) {
      return elements[i] < elements[j];
    }
    return elements[j] < elements[i];
  };
  const myHeap = {
    Peek(): any {
      return elements[0];
    },
    Len(): number {
      return elements.length;
    },
    Less(i: number, j: number): boolean {
      return lessFunc(i, j);
    },
    Swap(i: number, j: number) {
      [elements[i], elements[j]] = [elements[j], elements[i]];
    },
    Push(val: any) {
      elements.push(val as number);
    },
    Pop(): any {
      const val = elements.at(-1);
      elements = elements.slice(0, elements.length - 1);
      return val;
    },
  }
  heap.Init(myHeap);
  return myHeap;
}

class MedianFinder {

  firstHalf: MyHeap
  secondHalf: MyHeap

  constructor() {
    this.firstHalf = NewHeap([], false);
    this.secondHalf = NewHeap([], true);
  }

  addNum(num: number): void {
    heap.Push(this.firstHalf, num);
    heap.Push(this.secondHalf, heap.Pop(this.firstHalf));
    while (this.secondHalf.Len() > this.firstHalf.Len()) {
      heap.Push(this.firstHalf, heap.Pop(this.secondHalf));
    }
  }

  findMedian(): number {
    if (this.firstHalf.Len() === this.secondHalf.Len()) {
      // Even
      return (this.firstHalf.Peek() as number + this.secondHalf.Peek() as number) / 2
    }
    return this.firstHalf.Peek() as number;
  }
}

const finder = new MedianFinder();
finder.addNum(3);
finder.addNum(2);
finder.addNum(1);
console.log(finder.findMedian());
```