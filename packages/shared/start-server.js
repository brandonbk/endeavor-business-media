const newrelic = require('newrelic');
const { startServer } = require('@base-cms/marko-web');
const { set, get } = require('@base-cms/object-path');
const cleanResponse = require('@base-cms/marko-core/middleware/clean-marko-response');
const contactUsHandler = require('@endeavor-business-media/package-contact-us');
const loadInquiry = require('@endeavor-business-media/package-inquiry/load-from-config');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const userRoutes = require('./routes/user');

const routes = siteRoutes => (app) => {
  // Handle submissions on /__inquiry
  loadInquiry(app);
  // Handle contact submissions on /__contact-us
  contactUsHandler(app);
  // Load user routes.
  userRoutes(app);
  // Load site routes.
  siteRoutes(app);
};

module.exports = (options = {}) => {
  const { onStart } = options;
  return startServer({
    ...options,
    routes: routes(options.routes),
    document: options.document || document,
    components: options.components || components,
    fragments: options.fragments || fragments,
    onStart: async (app) => {
      if (typeof onStart === 'function') await onStart(app);
      app.set('trust proxy', 'loopback, linklocal, uniquelocal');

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      if (gamConfig) set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      if (nativeXConfig) set(app.locals, 'nativeX', nativeXConfig);

      // Clean all response bodies.
      app.use(cleanResponse());
    },
    onAsyncBlockError: e => newrelic.noticeError(e),
  });
};
