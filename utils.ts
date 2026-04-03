import os from "os";

const ID_RE = /^[a-z0-9-_]+$/i;

export function validateId(id: string) {
  if (id.length > 255) {
    return false;
  }
  return Boolean(id.match(ID_RE));
}

export function getNetworkUrls(port) {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        results.push(`http://${net.address}:${port}`);
      }
    }
  }

  return results;
}
