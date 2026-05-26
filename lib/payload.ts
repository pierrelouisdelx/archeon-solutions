import { getPayload as getPayloadInstance } from 'payload';
import config from '@payload-config';

export const getPayload = async () => getPayloadInstance({ config });
