const origin = [
  process.env['NX_ORIGIN_ACCOUNTS_UI'],
  process.env['NX_ORIGIN_JOURNEY_UI'],
];
const allowedHeaders = ['Content-Type', 'Set-Cookie'];
const methods = ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'];
const credentials = true;

export const corsConfig = {
  origin,
  methods,
  allowedHeaders,
  credentials,
};
