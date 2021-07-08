import rimraf from 'rimraf'
import { OUTPUT } from '../utils/const'

export async function clean() {
    rimraf.sync(OUTPUT.es)
    rimraf.sync(OUTPUT.cjs)
}
