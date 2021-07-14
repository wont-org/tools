import chalk from 'chalk'

interface LogParams {
    logType?: 'Info:' | 'Success:' | 'Error:' | string
    text: string
}

export const log = {
    info: (params: LogParams) => {
        const { logType = 'Info:', text } = params
        console.log(`\n${chalk.blue.bold(logType)} ${chalk.gray(text)}`)
    },
    ok: (params: LogParams) => {
        const { logType = 'Success:', text } = params
        console.log(`\n${chalk.green.bold(logType)} ${chalk.cyan(text)}`)
    },
    error: (params: LogParams) => {
        const { logType = 'Error:', text } = params
        console.log(`\n${chalk.red.bold(logType)} ${chalk.red(text)}`)
    },
}
