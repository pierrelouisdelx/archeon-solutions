import * as migration_20260526_163941_initial from './20260526_163941_initial';

export const migrations = [
  {
    up: migration_20260526_163941_initial.up,
    down: migration_20260526_163941_initial.down,
    name: '20260526_163941_initial'
  },
];
