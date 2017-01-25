var Key = {
  _pressed: {},

  LEFT_1: 81,
  UP_1: 90,
  RIGHT_1: 68,
  DOWN_1: 83,
  A_1: 66,
  SPACE_1: 32,

  LEFT_2: 100,
  UP_2: 104,
  RIGHT_2: 102,
  DOWN_2: 101,
  A_2: 170,
  SPACE_2: 16,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


window.addEventListener('keyup', function(event) {
  Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function(event) {
  Key.onKeydown(event);
}, false);
