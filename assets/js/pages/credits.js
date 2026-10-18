/* Sources & credits */
(() => {
  const { I, $, esc } = J;
  function render() {
    $("[data-cr-sources]").innerHTML = Object.values(I.sources).map((s) => `<li><a class="ulink" href="${s.u}">${esc(s.t)}</a></li>`).join("");
    $("[data-cr-photos]").innerHTML = Object.entries(I.photos).map(([k, p]) => `<li><img src="${J.src(k, 400)}" alt="" loading="lazy" width="80" height="54"><span><span class="h4">${esc(p.caption || k)}</span><br><span class="small">${esc(p.credit)} · <a class="ulink" href="${p.source}">source</a></span></span></li>`).join("");
  }
  J.page(render);
})();
