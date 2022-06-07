import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(far, fas);

export * from './lib/layout';
export * from './lib/icon';
export * from './lib/dialog';
export * from './lib/loader';
export * from './lib/error';
