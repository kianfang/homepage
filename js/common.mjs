const $header = document.querySelector('#header');
const $sidebar = document.querySelector('#sidebar');
const $toc = document.querySelector('#content .toc');
let lastScrollTop = 0;
let requestId = null;

// 监听滚动事件, 使header随着滚动条的滚动而隐藏或显示
window.addEventListener('scroll', function() {
  // 当前滚动条距离顶部距离
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // iOS橡皮筋特性, 可以将滚动条拉到负数，拉到底部可能会自动回弹
  if (
    currentScrollTop < 0
    || currentScrollTop > document.body.clientHeight - window.innerHeight
  ) {
    return;
  }

  if(requestId) cancelAnimationFrame(requestId);

  requestId = compute(currentScrollTop);

});

function compute(currentScrollTop) {
  return requestAnimationFrame(() => {
    // 距离上次滚动后偏移的距离
    const distance = currentScrollTop - lastScrollTop;
    const headerHeight = $header.clientHeight;
    const transform = $header.style.transform;
    const match = transform.match(/translateY\((-?\d+(\.\d+)?)px\)/);
    // 当前header向DOM顶部便宜的距离（负数）
    let deltaY = match ? parseFloat(match[1], 10) : 0;

    if (distance < 0) {
      // 向上滚动，header逐渐向下显示, deltaY趋近于0
      deltaY = Math.min(deltaY - distance, 0);
    } else {
      // 向下移动，header逐渐向上隐藏, deltaY趋近于-headerHeight
      deltaY = Math.max(deltaY - distance, -headerHeight);
    }

    $header.style.transform = `translateY(${deltaY}px)`;

    if ($sidebar) {
      $sidebar.style.transform = `translateY(${Math.min(headerHeight + deltaY, currentScrollTop)}px)`;
    }

    if ($toc) {
      $toc.style.transform = `translateY(${Math.min(headerHeight + deltaY, currentScrollTop)}px)`;
    }

    lastScrollTop = currentScrollTop;
  });
}
