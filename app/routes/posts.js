import Ember from 'ember';

export default Ember.Route.extend({
  init: function () {
    Route.push('posts');

    this._super();
  }
});
