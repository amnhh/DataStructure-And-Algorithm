/**
 * fileBundle 的主类
 */
// import AlgorithmFileBundle from './AlgorithmFileBundle'
// import DataStructureFileBundle from './DsFileBundle'
// import QuestionFileBundle from './QuestionFileBundle'
import { DataStructureKeys, FileBundleConfig, FileBundleTypes } from '../../types/interface'
import { config } from '../config'
import * as path from 'path'
import {
    resolveTemplateFileName,
    getNotesFilepath
} from '../utils/path-lang';
import { getFileValue } from '../utils/fs-lang'

// export type FileBundleBundlesType = DataStructureFileBundle | QuestionFileBundle

export default class FileBundle {
    // 目录路径, 会默认读取目录下的 config.json
    dirpath: string

    // 配置
    configPath: string = ''

    // 配置数据
    config: FileBundleConfig = <FileBundleConfig>{}

    // 模板路径
    templateFilePath: string = ''

    // 模板
    templateValue: string = ''

    // 当前 bundle 的名字
    type: FileBundleTypes = ''

    // 英文名
    name: string = ''

    // 中文名
    cname: string = ''

    // 时间
    date: string = ''

    // 笔记
    notes: string = ''

    constructor(dirpath: string) {
        this.dirpath = dirpath
        this.readConfigAndInitInfo()
    }

    /**
     * 读取入口文件的配置信息
     */
    readConfigAndInitInfo(): void {
        const entryPath: string = path.resolve(this.dirpath, config.entryFileName)

        const configRet: FileBundleConfig = require(entryPath).default

        this.configPath = entryPath
        this.config = configRet

        const { name, cname, date } = this.config

        if (!name || !cname || !date) {
            throw new Error(`${entryPath} 下必要信息缺失`)
            process.exit(0)
        }

        this.name = name
        this.cname = cname
        this.date = date
    }

    /**
     * 绑定模板路径
     */
    bindTemplatePath(): void {
        this.templateFilePath = path.resolve(config.templatesDir, resolveTemplateFileName(this.type))
    }

    /**
     * 读取相应的笔记
     */
    readNotes(): void {
        const notePath: string = getNotesFilepath(this.dirpath)
        this.notes = getFileValue(notePath)
    }
}
