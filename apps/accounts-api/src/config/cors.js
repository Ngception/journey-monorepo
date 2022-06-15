const origin = process.env['NX_ALLOWED_ORIGIN'];
const allowedHeaders = ['Content-Type', 'Set-Cookie'];
const methods = ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'];
const credentials = true;

export const corsConfig = {
  origin,
  methods,
  allowedHeaders,
  credentials,
};
