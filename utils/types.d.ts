import { FRAME } from './const'

export type ModuleType = 'esm' | 'cjs' | 'umd'
export type Frame = typeof FRAME.list[number]
