var index = 5;

export default {
  name: 'routeInitializer',
  initialize: function() {
    Ember.Route.reopen({
      init: function () {
        this._super();

        // "<learn-emberjs@route:application::ember253>"
        var routeName = get_route_name(this.toString());
        InitializerRecorder.pushRoute(routeName);
      },

      beforeModel: function (transition) {
        debugger;
        this._super();
        var routeName = get_route_name(this.toString());
        InitializerRecorder.pushBeforeModel(routeName);
      },

      model: function (params) {
        index --;
        // return this.store.find('post', {id: index});
      },

      afterModel: function (resolvedModel, transition, queryParams) {
        debugger
        this._super(resolvedModel, transition, queryParams);
        var routeName = get_route_name(this.toString());
        InitializerRecorder.pushAfterModel(routeName);
      }
    });
  }
};

function get_route_name (fullName) {
  return fullName.replace(/::\w+\>/g, '').replace(/\<\w+\-\w+\@\w+\:/g, '');
};
