import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'canvas',

  width: 1000,
  height: 500,

  attributeBindings: ['width', 'height'],
  classNames: ['touch-canvas'],

  ctx: null,

  pencilDown: false,

  didInsertElement() {
    let ctx = this.get('element').getContext('2d');

    this.set('ctx', ctx);
  },

  click(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    console.log('clicked', x, y);
    this.sendAction('saveTouch', x, y);
  },

  mouseDown(e) {
    console.log('mouse down');
    this.set('pencilDown', true);
  },

  mouseUp(e) {
    console.log('mouse up');
    this.set('pencilDown', false);
  },

  mouseMove(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    if (this.get('pencilDown')) {
      this.sendAction('saveTouch', x, y);
    }
  },

  mouseLeave(e) {
    console.log('mouse leave');
    this.set('pencilDown', false);
  },

  renderDot(x, y) {
    let ctx = this.get('ctx');

    ctx.fillStyle = '#00a0e3';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
    ctx.fill();
  },

  clearCanvas() {
    let ctx = this.get('ctx');
    let canvas = ctx.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  renderAllDots() {
    this.clearCanvas();

    let touches = this.get('touches');

    touches.forEach((touch) => {
      let x = touch.get('x');
      let y = touch.get('y');

      this.renderDot(x, y);
    });
  },

  touchesChanged: Ember.observer('touches.[]', function() {
    Ember.run.once(() => {
      console.log('touch changed', this.get('touches.length'));
      this.renderAllDots();
    })
  })

});
