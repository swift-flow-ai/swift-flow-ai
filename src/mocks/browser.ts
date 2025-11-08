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

  console.info('🔶 MSW is enabled. Starting service worker...');
  console.info(`📍 API Base URL: ${config.apiBaseUrl}`);
  console.info(`📦 Total handlers: ${handlers.length}`);

  return worker.start({
    onUnhandledRequest: 'warn', // Warn about unhandled requests for debugging
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  }).then(() => {
    console.info('✅ MSW Service Worker started successfully!');
  }).catch((error) => {
    console.error('❌ MSW Service Worker failed to start:', error);
  });
}

