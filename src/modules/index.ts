import { Fetcher } from '../model';
import * as decathlon from './decathlon';
import * as canyon from './canyon';

export default {
  decathlon, canyon
} as Record<string, Fetcher<any>>