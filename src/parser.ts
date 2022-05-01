import type { ContextFreeGrammar, NonTerminalSymbol, TerminalSymbol } from './typings';

export class Parser {
	#grammar: ContextFreeGrammar;
	#nonTerminals: Set<NonTerminalSymbol>;
	#terminals: Set<TerminalSymbol | null>;

	constructor(grammar: ContextFreeGrammar) {
		this.#grammar = grammar;
		this.#nonTerminals = new Set(Object.keys(this.#grammar));
		this.#terminals = new Set(
			Object.values(this.#grammar)
				.flat(2)
				.filter(symbol => symbol && !this.#nonTerminals.has(symbol)),
		);
	}

	get grammar() {
		return this.#grammar;
	}

	get nonTerminals() {
		return this.#nonTerminals;
	}

	get terminals() {
		return this.#terminals;
	}

	/**
	 * Finds the `FIRST` set of a given grammar symbol.
	 * @param symbol The grammar symbol whose `FIRST` set is to be calculated
	 */
	first(symbol: TerminalSymbol | NonTerminalSymbol): Set<TerminalSymbol | null> {
		const firstSet = new Set<TerminalSymbol | null>();
		const productions = this.#grammar[symbol];
		// symbol is a terminal if it has no productions
		if (!productions) return firstSet.add(symbol);
		for (const production of productions) {
			if (!production) {
				// symbol has an epsilon production
				firstSet.add(null);
				continue;
			}
			let pointer = 0;
			let flag = true;
			while (flag) {
				const startSymbol = production[pointer];
				// this should never be true for the first iteration of the while loop
				if (!startSymbol) {
					// current production is reducible to an epsilon production
					firstSet.add(null);
					flag = false;
				} else if (this.#terminals.has(startSymbol)) {
					// production begins with a terminal
					firstSet.add(startSymbol);
					flag = false;
				} else {
					// production begins with a non-terminal
					const firstOfStartSymbol = this.first(startSymbol);
					// add all terminals except epsilon (if it exists) from the first-set of current startSymbol into first-set of given symbol
					firstOfStartSymbol.forEach(e => e && firstSet.add(e));
					if (firstOfStartSymbol.has(null)) {
						// move pointer to next symbol in production if current start symbol has epsilon in its first-set (it can vanish and cease to be the start symbol)
						pointer++;
					} else {
						flag = false;
					}
				}
			}
		}
		return firstSet;
	}

	follow(symbol: TerminalSymbol | NonTerminalSymbol) {
		// TODO
	}
}
