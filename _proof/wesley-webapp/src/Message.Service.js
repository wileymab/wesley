import request from 'request';
import crypto from 'crypto';

class Rejection {
    constructor(err, res, body) {
        this.error = err;
        this.response = res;
        this.body = body;
    }
}

export class MessageService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getAllMessages() {
        console.log('Getting all messages.')
        return new Promise((resolve, reject) => {
            request(`${this.url}/messages`, (err, res, body) => {
                // console.log('err', err);
                // console.log('res', res);
                // console.log('body', body);
                if ( res && res.statusCode === 200 ) {
                    resolve(body);
                }
                else {
                    reject(new Rejection(err,res,body));
                }
            });
        });
    }

    getAllDurations() {
        console.log('Collecting durations.')
        return new Promise((resolve, reject) => {
            this.getAllMessages()
            .then((messageArrayString) => {
                var messageArray = JSON.parse(messageArrayString);
                if ( messageArray.length > 1 ) {
                    var idx = 1;
                    var durations = [];
                    for ( var d = idx; d < messageArray.length; d++ ) {
                        var duration = {}

                        var messageAtStart = messageArray[d];
                        if ( messageAtStart.title === 'Desktop' ) {
                            messageAtStart['owner'] = {};
                            messageAtStart['owner']['bundleId'] = 'desktop'
                        }

                        var messageAtEnd = messageArray[d-1];
                        if ( messageAtEnd.title === 'Desktop' ) {
                            messageAtEnd['owner'] = {};
                            messageAtEnd['owner']['bundleId'] = 'desktop'
                        }
                        // console.dir({
                        //     start: messageAtStart,
                        //     end: messageAtEnd
                        // });

                        duration['bundleId'] = messageAtStart.owner.bundleId;
                        duration['title'] = messageAtStart.title;
                        duration['startedAt'] = messageAtStart.timestamp;
                        duration['milliseconds'] = messageAtEnd.timestamp - messageAtStart.timestamp;

                        durations.push(duration);
                    }
                    resolve(durations);
                }
                else {
                    reject(new Rejection('Too few log entries to measure. Wait a little bit.',null,null));
                }

            })
            .catch(rejection => reject(rejection));
        });
    }

    getDurationTree() {
        return new Promise((resolve, reject) => {
            this.getAllDurations().then((durations) => {
                
                const hash = (data) => crypto.createHash('md5').update(data).digest("hex");

                const randomColor = () => { 
                    return [
                        { bundle: '#358aea', window: '#6CA9EF' },
                        { bundle: '#60aeea', window: '#A8D2F3' },
                        { bundle: '#7de080', window: '#B8EEB9' },
                        { bundle: '#d9754c', window: '#EAB39D' },
                        { bundle: '#8ce4ea', window: '#C0F0F3' }
                    ][Math.floor(Math.random()*5)]
                }

                const bundleColorsMap = {}
                const getBundleColors = (bundleHash) => {
                    if ( !bundleColorsMap[bundleHash] ) {
                        bundleColorsMap[bundleHash] = randomColor();
                    }
                    return bundleColorsMap[bundleHash];
                }

                var bundles = {}

                durations.forEach(duration => {

                    const bundleHash = hash(duration.bundleId);
                    const windowTitleHash = hash(duration.title);

                    const colors = getBundleColors(bundleHash);

                    if ( !bundles[bundleHash] ) {
                        bundles[bundleHash] = {
                            title: duration.bundleId,
                            color: colors.bundle,
                            windows: {}
                        };
                    }

                    if ( !bundles[bundleHash].windows[windowTitleHash] ) {
                        bundles[bundleHash].windows[windowTitleHash] = {
                            title: duration.title,
                            color: colors.window,
                            size: duration.milliseconds
                        };
                    }
                    else {
                        bundles[bundleHash].windows[windowTitleHash].size += duration.milliseconds;
                    }

                });

                // console.log(bundles);

                var rootChildren = [];
                for ( var id in bundles ) {
                    // console.log(id)
                    var bundleNode = {
                        title: bundles[id].title,
                        color: bundles[id].color,
                        children: []
                    }

                    for ( var windowTitle in bundles[id].windows ) {
                        // console.log(id, windowTitle)

                        // console.log('bundle', bundles[id])
                        // console.log('window', bundles[id].windows[windowTitle])

                        var titleNode = {
                            title: bundles[id].windows[windowTitle].title,
                            color: bundles[id].windows[windowTitle].color,
                            size: bundles[id].windows[windowTitle].size
                        }

                        bundleNode.children.push(titleNode);
                    }
                    rootChildren.push(bundleNode);
                }

                resolve({
                    title: 'wesley',
                    children: rootChildren
                });
            })
        });
    }

}