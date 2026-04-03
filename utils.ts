import os from 'os';

const ID_RE = /^[a-z0-9-_]+$/i;

/**
 * Validates whether a scale identifier uses an allowed format.
 *
 * @param id - Candidate identifier string.
 * @returns `true` when the identifier length is within 255 characters and only
 * contains letters, numbers, underscores, or dashes.
 */
export function validateId(id: unknown) {
  if (typeof id !== 'string') {
    return false;
  }
  if (id.length > 255) {
    return false;
  }
  return Boolean(id.match(ID_RE));
}

/**
 * Lists externally reachable IPv4 URLs for the current machine and port.
 *
 * @param port - Server port to include in each URL.
 * @returns A list of `http://` URLs for non-internal network interfaces.
 */
export function getNetworkUrls(port) {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push(`http://${net.address}:${port}`);
      }
    }
  }

  return results;
}

/**
 * Determines whether an Accept-Encoding header allows gzip responses.
 *
 * @param acceptEncoding - Raw Accept-Encoding header value.
 * @returns `true` when gzip is present with a non-zero quality value.
 */
export function acceptsGzipEncoding(acceptEncoding: string | null) {
  if (!acceptEncoding) {
    return false;
  }

  return acceptEncoding
    .split(',')
    .map(value => value.trim().toLowerCase())
    .some(value => {
      const [encoding, ...params] = value.split(';').map(v => v.trim());
      if (encoding !== 'gzip') {
        return false;
      }
      const q = params.find(param => param.startsWith('q='));
      if (!q) {
        return true;
      }
      const qValue = Number(q.slice(2));
      return Number.isFinite(qValue) && qValue > 0;
    });
}
