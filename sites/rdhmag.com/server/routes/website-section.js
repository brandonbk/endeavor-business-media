const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');
const contactUs = require('../templates/website-section/contact-us');
const jobPostings = require('../templates/website-section/job-postings');
const queryFragment = require('../graphql/fragments/website-section-page');
const whitePapers = require('../templates/website-section/white-papers');

module.exports = (app) => {
  app.get('/:alias(contact-us)', withWebsiteSection({
    template: contactUs,
    queryFragment,
  }));
  app.get('/:alias(job-postings)', withWebsiteSection({
    template: jobPostings,
    queryFragment,
  }));
  app.get('/:alias(white-papers)', withWebsiteSection({
    template: whitePapers,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
    queryFragment,
  }));
};