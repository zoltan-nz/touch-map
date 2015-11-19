import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('touch');
  },

  actions: {
    saveTouch(x,y) {
      this.store.createRecord('touch', {x: x, y: y}).save();
    },

    deleteAll() {
      this.get('controller').get('model').forEach((touch) => touch.destroyRecord());
    }
  }
});
