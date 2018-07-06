// rem 适配用这段代码动态计算 html 的 font-size 大小
;(function (win) {
  var docEl = win.document.documentElement
  var timer = ''
  function changeRem () {
    var width = docEl.getBoundingClientRect().width
    if (width > 750) {
      // 750是设计稿大小
      width = 750
    }
    var fontS = width / 23.4375 // 把设备宽度分成23.4375份 1rem = 16px(按照iphon6的375宽度来算)
    docEl.style.fontSize = fontS + 'px'
  }
  win.addEventListener(
    'resize',
    function () {
      clearTimeout(timer)
      timer = setTimeout(changeRem, 30)
    },
    false
  )
  win.addEventListener(
    'pageshow',
    function (e) {
      if (e.persisted) {
        // 清除缓存
        clearTimeout(timer)
        timer = setTimeout(changeRem, 30)
      }
    },
    false
  )
  changeRem()
})(window)
