import Ember from 'ember';

export default Ember.Route.extend({
  init: function () {
    Route.push('application');
    this._super();
  }
});
