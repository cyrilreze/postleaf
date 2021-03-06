'use strict';

const Path = require('path');
const AdminMenu = require(Path.join(__basedir, 'source/modules/admin_menu.js'));
const AutocompleteSuggestions = require(Path.join(__basedir, 'source/modules/autocomplete_suggestions.js'));

module.exports = {

  //
  // Renders the navigation page.
  //
  view: (req, res, next) => {
    const I18n = req.app.locals.I18n;

    Promise.resolve()
      // Get autocomplete suggestions
      .then(() => AutocompleteSuggestions.getLinks(req, ['users', 'tags', 'posts']))
      .then((links) => {
        // Render the template
        res.useSystemViews().render('navigation', {
          adminMenu: AdminMenu.getItems(req),
          meta: {
            bodyClass: 'navigation',
            title: I18n.term('navigation')
          },
          linkSuggestions: links,
          navigation: req.app.locals.Navigation,
          scripts: ['/assets/js/navigation.bundle.js'],
          styles: ['/assets/css/navigation.css']
        });
      })
      .catch((err) => next(err));
  }

};
