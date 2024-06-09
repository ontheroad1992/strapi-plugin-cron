import BigNumber from 'bignumber.js';

import { pluginName } from '../../utils/plugin';

const extensionsDirPath = `${process.cwd()}/src/extensions/${pluginName}`;

const getFilePath = (path: string) => `${extensionsDirPath}${path}`;

export const getDefaultModuleExport = async (path: string) => {
  return (await import(getFilePath(path))).default;
};

export function parseScheduleToSeconds(schedule: string) {
  const [seconds, minutes, hours, day] = schedule.split(' ').map((item) => (item !== '*' ? item : 0));

  const allSeconds = new BigNumber(seconds)
    .plus(new BigNumber(minutes).times(60))
    .plus(new BigNumber(hours).times(60 * 60))
    .plus(new BigNumber(day).times(24 * 60 * 60));

  return allSeconds.toNumber();
}
