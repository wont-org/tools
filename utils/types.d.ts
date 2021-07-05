import { FRAME } from './const'

export type ModuleType = 'esm' | 'cjs'
export type Frame = typeof FRAME.list[number]
