interface entry {
  xlsxDir: string
  files: Array<file>
}
interface generateConfig {
  xlsxDirs: Array<entry>
}
interface file {
  key: string
  value: string
  outPutFileDir: string
}

function defineGenerateConfig(config: generateConfig) {
  return config
}

export {
  defineGenerateConfig,
}
