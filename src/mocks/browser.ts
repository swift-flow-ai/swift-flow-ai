import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { config } from '../config';

// Setup MSW service worker with all handlers
export const worker = setupWorker(...handlers);

// Enable MSW based on environment variable
export async function enableMocking() {
  // Only enable MSW if explicitly configured
  if (!config.enableMSW) {
    console.info('🌐 MSW is disabled. API calls will hit the real backend.');
    return;
  }

  console.info('🔶 MSW is enabled. API calls will be mocked.');

  return worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

