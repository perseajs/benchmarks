const { randomBytes } = require('crypto');

const { Request, context } = require('@persea/persea');

module.exports.before = function before () {
    const requestId = randomBytes(16).toString('hex');
    context.set('requestId', requestId);
    console.log(`${new Date().toISOString()} ${requestId} -> ${Request.method} ${Request.url}`);
};

module.exports.after = function after () {
    const requestId = context.get('requestId');
    console.log(`${new Date().toISOString()} ${requestId} <- ${Request.method} ${Request.url}`);
 };
