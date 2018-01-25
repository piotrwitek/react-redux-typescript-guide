// Global/Window object Stubs for Jest
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { },
  };
};

window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.localStorage = {
  getItem: function () { },
  setItem: function () { },
};

Object.values = () => [];
