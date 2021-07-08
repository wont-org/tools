import { emit, task, on } from 'gulp'
import { log } from './logger'

export function getTimeDiff(hrtime: [number, number]) {
    const [startTime, endTime] = hrtime
    const diffMS = Math.ceil((endTime - startTime * 1000 * 1000) / 1000)
    // console.log('hrtime :>> ', hrtime)
    if (diffMS >= 1000) {
        return `${Math.ceil(diffMS / 1000)}s`
    }
    return `${diffMS}ms`
}
// reference to https://github.com/ant-design/antd-tools/blob/master/lib/cli/run.js
export function runTask(taskName) {
    const metadata = {
        task: taskName,
        hrDuration: [0, 0] as [number, number],
    }
    // Gulp >= 4.0.0 (doesn't support events)
    const taskInstance = task(taskName)
    if (taskInstance === undefined) {
        emit('task_not_found', metadata)
        log.error({
            text: `${taskName} not found`,
        })
        return
    }
    const start = process.hrtime()
    emit('task_start', metadata)
    log.info({
        logType: 'Start:',
        text: `${taskName}...`,
    })
    try {
        taskInstance(taskName)
        emit('task_stop', metadata)
        emit('stop')
        metadata.hrDuration = process.hrtime(start)

        on('stop', (taskInfo = {}) => {
            const { name, branch } = taskInfo
            if (!branch) {
                log.ok({
                    text: `${name} done`,
                })
            }
        })
    } catch (err) {
        err.task = metadata.task
        emit('task_err', err)
        err.hrDuration = process.hrtime(start)
        const time = getTimeDiff(metadata.hrDuration)

        log.error({
            text: `${taskName} used ${time}, message is ${err}`,
        })
    }
}
