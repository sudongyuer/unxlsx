import * as path from 'path'
import { cwd } from 'process'
import chalk from 'chalk'
import fs from 'fs-extra'
import { loadConfig } from 'unconfig'
import xlsx from 'xlsx'

interface file {
  key: string
  value: string
  outPutFileDir: string
}

interface entry {
  xlsxDir: string
  files: Array<file>
}

interface generateConfig {
  xlsxDirs: Array<entry>
}

const { config } = await loadConfig<generateConfig>({
  sources: [
    {
      files: 'generate.config',
      extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
    },
  ],
})

const { xlsxDirs } = config

for (let i = 0; i < xlsxDirs.length; i++) {
  const {
    xlsxDir,
    files,
  } = xlsxDirs[i]
  const data = getXlsxData(xlsxDir)
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const {
      key,
      value,
      outPutFileDir,
    } = file
    const result = {}
    const resultKeys = {}
    data.forEach((item: any) => {
      result[item[key]] = item[value]
      resultKeys[item[key]] = item[key]
    })
    const fileName = outPutFileDir.slice(outPutFileDir.lastIndexOf('/') === -1 ? 0 : outPutFileDir.lastIndexOf('/') + 1, outPutFileDir.lastIndexOf('.'))
    let str = `const ${fileName} = ${JSON.stringify(result, null, 2)}\n`
    str += `const ${fileName}Keys = ${JSON.stringify(resultKeys, null, 2)}\n`
    str += `const get${fileName} = (key:string,...slots:Array<string>)=>{
 if (slots && slots.length > 0) {
    let i = 0
    // @ts-expect-error
    return ${fileName}[key].replace(/{[^{}]*}/g, () => {
      return slots[i++]
    })
  }
  else {
    // @ts-expect-error
    return ${fileName}[key]
  }
}\n`
    str += `export {${fileName}Keys,get${fileName}}\n`
    str += `export default ${fileName}\n`
    fs.outputFileSync(path.resolve(cwd(), `${outPutFileDir}`), str)
  }
}

function getXlsxData(xlsxDir) {
  const workbook = xlsx.readFile(path.resolve(cwd(), xlsxDir))
  const sheetNames = workbook.SheetNames
  const sheet = workbook.Sheets[sheetNames[0]]
  return xlsx.utils.sheet_to_json(sheet)
}

console.warn(chalk.bgCyan('Generate Success ✨ ✨ ✨'))
process.exit(0)

