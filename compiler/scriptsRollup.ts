import { rollup } from 'rollup'
import { getRollupConfig } from '../config/rollup.config'
import { log } from '../utils/logger'

async function rollupCompile(config) {
    const { output } = config
    log.info({
        logType: 'Start: ',
        text: `compile ${output.format}...`,
    })
    const bundle = await rollup(config)
    await bundle.write(output)
    log.ok({
        text: `compile ${output.format} done`,
    })
}

export async function rollupCompileAll() {
    const rollupConfig = getRollupConfig()
    Promise.all(
        rollupConfig.map(async (config) => {
            await rollupCompile(config)
        })
    )
        .then(() => {
            log.ok({
                text: `rollup compile done`,
            })
        })
        .catch((err) => {
            log.error({
                text: `rollup compile fail: ${err}`,
            })
            process.exit(1)
        })
}
