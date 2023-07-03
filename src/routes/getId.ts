import { URL } from 'node:url';

import { IncomingMessage } from 'node:http';

export const getId = (address: string, request: IncomingMessage): string => {
    const url = new URL(request.url);
    return url.pathname.toLowerCase().replace(address.toLowerCase(), '').replace(/^\/|\/$/g, '') || '';
  
  };