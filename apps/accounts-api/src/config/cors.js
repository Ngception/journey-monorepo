const origin = process.env['NX_ALLOWED_ORIGIN'];
const methods = ['GET', 'PATCH', 'POST', 'DELETE'];

export const corsConfig = {
  origin,
  methods,
};

module.exports = corsConfig;
