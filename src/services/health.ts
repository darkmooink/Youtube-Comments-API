import process from "process";

export type serverStatus = {
  uptime: number;
  responseTime: BigInt;
};

// TODO: Make return value either serverStatus or error
export const getServerStatus = (): serverStatus => {
  const serverUptime = process.uptime();
  // High resolution real time in nanoseconds (BIGINT)
  const start = process.hrtime.bigint();
  let end = start;
  setTimeout(() => {
    end = process.hrtime.bigint();
  }, 1000);
  const benchmark = start === end ? start : end - start;

  return { uptime: serverUptime, responseTime: benchmark };
};

// export const getDatabaseStatus = async () => {
//   return true;
// };
