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
  }
}
