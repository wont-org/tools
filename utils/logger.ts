import chalk from 'chalk'

export const log = {
    info: ({ logType = 'Info:', text }) => {
        console.log(`\n${chalk.yellow.bold(logType)} ${chalk.yellow(text)}`)
    },
    ok: ({ logType = 'Success:', text }) => {
        console.log(`\n${chalk.green.bold(logType)} ${chalk.cyan(text)}`)
    },
    error: ({ logType = 'Error:', text }) => {
        console.log(`\n${chalk.red.bold(logType)} ${chalk.red(text)}`)
    },
}
