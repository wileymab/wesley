var activeWin = require('active-win');
var fs = require('fs');
var express = require('express');

(() => {

    var logDir = process.env.LOG_DIR || `${__dirname}/../logs`;
    var timeout = process.env.TIMEOUT || 2000;

    var messages = [];

    var restApi = (() => {

        var app = express();

        app.get('/messages', (reg, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(messages);
        });

        return app;

    })();

    var utils = {
        getFileStamp: () => {
            var d = new Date();

            var addLeadingZero = (val) => {
                if ( val < 10 ) {
                    return `0${val}`
                }
                return val
            }

            return `${ d.getFullYear() }${ addLeadingZero(d.getMonth()+1) }${ addLeadingZero(d.getDate()) }`;
        },
        normalizeTitleString: (titleString) => {
            // var fixedTitle = titleString
            //     .replace(/\s/g,'')
            //     .replace(/[\.]/g,'*')
            //     .replace(/http.*\:\/\//,'')
            //     .replace(/\:/,'_')
            //     .replace(/\//,'')
            //     ;
            // return ( fixedTitle.length > 0 ) ? fixedTitle : '___';
            return titleString;
        }
        
    }

    var lastTitle = '';

    var logFile = `${logDir}/wesley.${utils.getFileStamp()}.log`;

    if ( !fs.existsSync(logDir) ) {
        fs.mkdir(logDir);
    }

    var tryLog = (winInfo) => {
        // console.log(winInfo);
        winInfo.title = utils.normalizeTitleString(winInfo.title);
        if ( lastTitle !== winInfo.title ) {
            messages.unshift(winInfo);
            fs.appendFileSync(logFile, `${JSON.stringify(winInfo)}\n`);
            lastTitle = winInfo.title;
        }
        setTimeout(() => {
            checkWindow();
        }, timeout);
    }

    var checkWindow = () => {
        var info = {
            title: 'Desktop',
            timestamp: new Date().getTime()
        }
        try {
            var win = activeWin.sync();
            var info = {
                ...win,
                timestamp: new Date().getTime()
            }
        }
        catch(e) {}
        tryLog(info);
    }

    restApi.listen(5000);
    checkWindow();

    console.log('Wesley is hunting for rogue demons...');

})();