// @flow
import * as fs from 'fs'
import IFrameWriter from './IFrameWriter'

export default class LocalWriter extends IFrameWriter {

    outDir: string;

    constructor(config: any) {
        super();
        this.outDir = config.logDirectory;
    }

}
