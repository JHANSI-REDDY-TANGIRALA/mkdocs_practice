window.MathJax = {
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  }
};

document$.subscribe(function() {
  MathJax.typesetPromise();
});