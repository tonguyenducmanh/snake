export default {
  // kích cỡ của game
  gameSize: {
    minSize: 3, // size game nhỏ nhất
    maxSize: 20, // size game lớn nhất
    defaultSize: 7 // size game mặc định
  },
  // hướng di chuyển
  position: {
    up: 1, // trên
    left: 2, // trái
    down: 3, // dưới
    right: 4 // phải
  },
  // thời gian refresh lại màn hình
  timeRerender: {
    defaultSpeed: 100, // thời gian mặc định
    minSpeed: 200, // thời gian chậm nhất
    maxSpeed: 40 // thời gian nhanh nhất
  },
  // keycode dùng để lắng nghe các phím trên bàn phím
  keyCode: {
    w: 87,
    s: 83,
    a: 65,
    d: 68,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    space: 32,
    enter: 13
  }
}
