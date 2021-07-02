import rimraf from 'rimraf'
import { OUTPUT } from '../utils/const'

export function clean() {
    rimraf.sync(OUTPUT.es)
    rimraf.sync(OUTPUT.cjs)
}
