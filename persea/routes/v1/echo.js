const { Request, Response } = require('@persea/persea');

module.exports.index = () => {
	Response.send({ body: 'hello world\n' });
}

module.exports.create = () => {
	Response.send({ json: Request.json });
}

module.exports.show = (id) => {
	Response.send({ json: { id } });
}
