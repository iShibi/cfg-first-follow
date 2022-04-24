export type NonTerminalSymbol = string;
export type TerminalSymbol = string;
export type ProductionHead = NonTerminalSymbol;
export type ProductionExpression = Array<NonTerminalSymbol | TerminalSymbol> | null;

/**
 * An object that contains production rules for a `Context Free Grammar`
 * @example
 * ```ts
 * const grammar: ContextFreeGrammar = {
 *  // E  ->  TE`
 *  E: [['T', 'E`']],
 *  // E` ->  *TE` | epsilon
 *  'E`': [['*', 'T', 'E`'], null],
 *  // T  ->  FT`
 *  T: [['F', 'T`']],
 *  // T` ->  epsilon | +FT`
 *  'T`': [null, ['+', 'F', 'T`']],
 *  // F  ->  id | (E
 *  F: [['id'], ['(', 'E']],
 * }
 * ```
 */
export interface ContextFreeGrammar {
	[key: ProductionHead]: Array<ProductionExpression>;
}
