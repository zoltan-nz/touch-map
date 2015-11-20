import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('touch');
  },

  actions: {
    saveTouch(x,y) {
      // ES2015 trick: {x: x, y: y} is the same as {x, y}
      this.store.createRecord('touch', {x, y}).save();
    },

    deleteAll() {
      this.get('controller').get('model').forEach((touch) => touch.destroyRecord());
    }
  }
});
