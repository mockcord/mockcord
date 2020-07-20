const epoch = 1420070400000n;

let nodeId = BigInt(0);
let lastMs = BigInt(0);
let increment = BigInt(0);

export type snowflake = bigint | string;

export const setNodeId = (newId: bigint) => nodeId = (BigInt(newId) << BigInt(12)) & BigInt(0x3ff);

export const make = (): snowflake => {
  let now = BigInt(Date.now());

  if (lastMs !== now) {
    lastMs = now;
    increment = 0n;
  }

  return ((now - epoch) << 22n) | nodeId | (increment++ & 0xfffn);
};

export const flakeString = (id: snowflake | string): string | null => {
  return id ? (typeof id === "bigint" ? id.toString() : id) : null;
};
