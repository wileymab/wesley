// @flow
import IFrameWriter from './IFrameWriter';

import { generateFileDateStamp } from 'wesley-common';



class WesleyService {

    constructor(writer: IFrameWriter) {
        writer.write({test:"hello, world!"})
    }

}

export default WesleyService;
