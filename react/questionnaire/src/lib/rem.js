// 根据用户屏幕尺寸来设置页面跟字体大小
(function(win, doc) {
  // 获取用户屏幕宽度
  const screenWidth = win.screen.width
  // 设置页面根字体大小
  doc.documentElement.style.fontSize = screenWidth / 18.75 + 'px'

  // 监听用户屏幕尺寸变化
  win.addEventListener('resize', () => {
    // 获取用户屏幕宽度
    const screenWidth = win.screen.width
    // 设置页面根字体大小
    doc.documentElement.style.fontSize = screenWidth / 18.75 + 'px'
  })

})(window, document)