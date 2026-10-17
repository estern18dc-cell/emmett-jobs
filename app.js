// GitHub Pages lets browsers reuse a page for 10 minutes. If this copy is older than the live site, reload it.
(function () {
  var mine = document.body.dataset.build;
  if (!mine || !window.fetch) return;
  fetch("version.json?t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (v) {
      if (v.build && v.build !== mine && sessionStorage.getItem("reloaded") !== v.build) {
        sessionStorage.setItem("reloaded", v.build);
        location.reload();
      }
    })
    .catch(function () {});
})();

// Filter job cards by text and minimum fit score.
(function () {
  var q = document.getElementById("q"), min = document.getElementById("minfit"), count = document.getElementById("count");
  if (!q) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll(".job"));
  function apply() {
    var text = q.value.trim().toLowerCase(), m = +min.value, shown = 0;
    cards.forEach(function (c) {
      var ok = +c.dataset.fit >= m && (!text || c.dataset.search.indexOf(text) !== -1);
      c.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    count.textContent = shown + " of " + cards.length;
  }
  q.addEventListener("input", apply);
  min.addEventListener("change", apply);
  apply();
})();
