import path from 'path'
import { writeFileSync } from 'fs'
import { ENTRY, DESC } from './const'

export function resolve(pathStr) {
    return path.resolve(__dirname, pathStr)
}

export function join(pathStr) {
    return path.join(__dirname, pathStr)
}

export function getFileName(pathStr: string, ext: string) {
    return path.basename(pathStr, ext)
}

export function getDirName(pathStr: string) {
    return path.basename(path.dirname(pathStr))
}

export async function genEntry() {
    let exportVars = ''
    let exportScripts = ''
    ENTRY.tsx.forEach((pathStr) => {
        const name = getDirName(pathStr)
        const Name = name.charAt(0).toUpperCase() + name.slice(1)
        exportScripts += `import ${Name} from './${name}'\n`
        exportVars += `    ${Name},\n`
    })
    exportScripts += `\nexport {\n${exportVars}}\n`
    writeFileSync(ENTRY.INDEX, DESC + exportScripts)
}

export async function genUtilsEntry() {
    let exportVars = ''
    let exportScripts = ''
    ENTRY.ts.forEach((pathStr) => {
        const name = getDirName(pathStr)
        exportScripts += `import { ${name} } from './${name}/${name}'\n`
        exportVars += `    ${name},\n`
    })
    exportScripts += `\nexport {\n${exportVars}}\n`
    writeFileSync(ENTRY.INDEX, DESC + exportScripts)
}

export const toPosixPath = (filePath: string) =>{
    const isWindows = process.platform === 'win32';
    if (isWindows) {
        // 转换 Windows 路径为 POSIX 格式
        return filePath.split(path.sep).join(path.posix.sep);
    }
    return filePath;
}
