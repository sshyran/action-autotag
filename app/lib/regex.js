import fs from 'fs'
import path from 'path'

export default class Regex {
  constructor (root = null, pattern) {
    root = path.join(process.env.GITHUB_WORKSPACE, root)

    if (fs.statSync(root).isDirectory()) {
      throw new Error(`${root} is a directory. The Regex tag identification strategy requires a file.`)
    }

    if (!fs.existsSync(root)) {
      throw new Error(`"${root}" does not exist.`)
    }

    this.content = fs.readFileSync(root).toString()

    let content = pattern.exec(this.content)
    if (!content) {
      this._version = null
      // throw new Error(`Could not find pattern matching "${pattern.toString()}" in "${root}".`)
    } else {
      this._version = content[1]
    }
  }

  get version () {
    return this._version
  }

  get versionFound () {
    return this._version !== null
  }
}
