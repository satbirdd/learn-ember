export default {
  name: 'routeInitializer',
  initialize: function() {
    Ember.Route.reopen({
      init: function () {
        this._super();

        // "<learn-emberjs@route:application::ember253>"
        var routeName = this.toString().replace(/::\w+\>/g, '').replace(/\<\w+\-\w+\@\w+\:/g, '');

        Route.push(routeName);
      }
    });
  }
};
