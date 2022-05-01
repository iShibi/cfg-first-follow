# cfg-first-follow

Calculate `FIRST` and `FOLLOW` set of a `Context Free Grammar` symbol.

## Context Free Grammar

```
S -> ACB | Cbb | Ba
A -> da | BC
B -> g | Є
C -> h | Є
```

```ts
const grammar: ContextFreeGrammar = {
	S: [
		['A', 'C', 'B'],
		['C', 'b', 'b'],
		['B', 'a'],
	],
	A: [
		['d', 'a'],
		['B', 'C'],
	],
	B: [['g'], null],
	C: [['h'], null],
};
```

## Usage

### Parser

```ts
import { Parser, type ContextFreeGrammar } from 'cfg-first-follow';

const grammar: ContextFreeGrammar = {
	S: [
		['A', 'C', 'B'],
		['C', 'b', 'b'],
		['B', 'a'],
	],
	A: [
		['d', 'a'],
		['B', 'C'],
	],
	B: [['g'], null],
	C: [['h'], null],
};

const parser = new Parser(grammar);
```

### First

```ts
const firstSetOfS = parser.first('S');
console.log(firstSetOfS); // Set(6) { 'd', 'g', 'h', null, 'b', 'a' }
```

### Follow

TODO
