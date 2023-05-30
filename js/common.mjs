const $header = document.querySelector('#header');
const $sidebar = document.querySelector('#sidebar');
const $toc = document.querySelector('#content .toc');
const headerHeight = $header.clientHeight;
let lastScrollTop = 0;

// 监听滚动事件, 使header随着滚动条的滚动而隐藏或显示
window.addEventListener('scroll', function(e) {
  // 当前滚动条距离顶部距离, iOS橡皮筋特性可以将滚动条拉到负数，这里校准一下，方便后续计算
  const currentScrollTop = Math.max(window.pageYOffset || document.documentElement.scrollTop, 0);
  // 距离上次滚动后偏移的距离
  const distance = currentScrollTop - lastScrollTop;
  const transform = $header.style.transform;
  const match = transform.match(/translateY\((\d+(\.\d+)?)px\)/);
  // 当前header距离DOM顶部的距离
  const translateY = match ? parseFloat(match[1], 10) : 0;
  // 当滚动超过header高度后，header刚好隐藏的理论偏移的距离
  const baseTop = Math.max(currentScrollTop - headerHeight, translateY);
  // header 相对视口向上偏移量
  let deltaY = Math.min(headerHeight, currentScrollTop - translateY);

  if (distance < 0) {
    // 向上滚动
    // iOS橡皮筋特性，拉到底部可能会自动回弹
    if (currentScrollTop + window.screen.height <= document.body.clientHeight) {
      const top = translateY >= currentScrollTop ? currentScrollTop : baseTop;
      deltaY = currentScrollTop - top;

      $header.style.transform = `translateY(${top}px)`;
    }
  } else {
    // 向下移动
  }

  $header.style.opacity = 1 - deltaY / headerHeight;

  if ($sidebar) {
    $sidebar.style.transform = `translateY(${Math.min(headerHeight - deltaY, currentScrollTop)}px)`;
  }

  if($toc) {
    $toc.style.transform = `translateY(${Math.min(headerHeight - deltaY, currentScrollTop)}px)`;
  }

  lastScrollTop = currentScrollTop;
});
