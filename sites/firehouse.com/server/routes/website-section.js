const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const queryFragment = require('../graphql/fragments/website-section-page');
const directory = require('../templates/website-section/directory');
const section = require('../templates/website-section');
const contactUs = require('../templates/website-section/contact-us');
const whitePapers = require('../templates/website-section/white-papers');
const channel = require('../templates/website-section/channel');
const jumbo = require('../templates/website-section/jumbo');
const valorAwards = require('../templates/website-section/valor-awards');

const channelAliases = [
  'leadership',
  'apparatus',
  'rescue',
  'safety-health',
  'operations-training',
  'careers-education',
  'prevention-investigation',
  'stations',
];

module.exports = (app) => {
  app.get('/:alias(contact-us)', withWebsiteSection({
    template: contactUs,
    queryFragment,
  }));
  app.get('/:alias(directory)', withWebsiteSection({
    template: directory,
    queryFragment,
  }));
  app.get('/:alias(directory/[a-z0-9-/]+)', withWebsiteSection({
    template: directory,
    queryFragment,
  }));
  app.get(`/:alias(${channelAliases.join('|')})`, withWebsiteSection({
    template: channel,
    queryFragment,
  }));
  app.get('/:alias(white-papers)', withWebsiteSection({
    template: whitePapers,
    queryFragment,
  }));
  app.get('/:alias(run-surveys|40th-anniversary)', withWebsiteSection({
    template: jumbo,
    queryFragment,
  }));
  app.get('/:alias(valor-awards)', withWebsiteSection({
    template: valorAwards,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
