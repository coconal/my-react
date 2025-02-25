export type Heap<T extends Node> = Array<T>;

export type Node = {
	id: number;
	sortIndex: number;
};

export function peek<T extends Node>(heap: Heap<T>): T | null {
	return heap.length === 0 ? null : heap[0];
}

export function push<T extends Node>(heap: Heap<T>, node: T): void {
	const index = heap.length;

	heap.push(node);
	shift(heap, node, index);
}

export function pop<T extends Node>(heap: Heap<T>): T | null {
	if (heap.length === 0) {
		return null;
	}
	const first = heap[0];
	const last = heap.pop()!;

	if (first !== last) {
		heap[0] = last;
		shiftDown(heap, last, 0);
	}
	return first;
}

function shift<T extends Node>(heap: Heap<T>, node: T, i: number): void {
	let index = i;
	while (index > 0) {
		const parentIndex = index >>> 1;
		const parent = heap[parentIndex];
		if (compare(node, parent)) {
			heap[index] = parent;
			heap[parentIndex] = node;
			index = parentIndex;
		} else {
			return;
		}
	}
}

function shiftDown<T extends Node>(heap: Heap<T>, node: T, i: number): void {
	let index = i;
	const length = heap.length;
	const halfLength = length >>> 1;
	while (index < halfLength) {
		const leftIndex = index * 2 + 1;
		const left = heap[leftIndex];
		const rightIndex = leftIndex + 1;
		const right = heap[rightIndex];
		if (compare(left, node) < 0) {
			if (rightIndex < length && compare(right, left) < 0) {
				heap[index] = right;
				heap[rightIndex] = node;
				index = rightIndex;
			} else {
				heap[index] = left;
				heap[leftIndex] = node;
				index = leftIndex;
			}
		} else if (rightIndex < length && compare(right, node) < 0) {
			heap[index] = right;
			heap[leftIndex] = node;
			index = leftIndex;
		} else {
			return;
		}
	}
}

function compare(a: Node, b: Node) {
	const diff = a.sortIndex - b.sortIndex;
	return diff !== 0 ? diff : a.id - b.id;
}
