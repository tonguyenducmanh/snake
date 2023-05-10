/** màn hình trò chơi created by tdmanh1 06/05/2023 */
<template>
  <div class="m-game">
    <div class="m-fence" :style="gameSizeStyle">
      <!-- tạo ra bảng dựa vào kích thước của gameSize -->
      <template v-for="tempRow in gameGrid" :key="tempRow">
        <template v-for="singleSquare in tempRow" :key="singleSquare">
          <div class="m-cube" :class="singleSquare.activeSquare ? 'm-cube-active' : null"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import gameConfig from '../config/gameConfig.js'
import { isProxy, toRaw } from 'vue'
export default {
  data() {
    return {
      gameGrid: [], // mảng lưu toàn bộ các ô có trong trò chơi
      activeSquares: [] // mảng lưu danh sách các ô vuông sẽ active
    }
  },
  props: {
    // kích cỡ của trò chơi, mặc định là ô 7x7
    gameSize: {
      type: Number,
      default: gameConfig.gameSize.defaultSize
    },
    // hướng di chuyển hiện tại của con rắn
    currentPosition: {
      type: Number,
      default: null
    }
  },
  computed: {
    gameSizeStyle() {
      return {
        'grid-template-columns': `repeat(${this.gameSize}, 1fr)`
      }
    }
  },
  mounted() {
    let me = this
    me.generateGameGrid(true)
  },
  watch: {
    /**
     * tự động load lại danh sách mỗi lần thay đổi kích thước
     * created by tdmanh1 09/05/2023
     */
    gameSize() {
      let me = this
      // re-render lại grid mỗi lần bấm vào thay đổi kích thước
      me.generateGameGrid(true)
    },
    /**
     * lắng nghe khi vị trí thay đổi thì tiến hành thay đổi hướng di chuyển của con rắn
     */
    currentPosition(newValue, oldValue) {
      let me = this
      if (newValue && oldValue && newValue != oldValue) {
        me.caculateNewPosition(newValue)
      }
    }
  },
  methods: {
    /**
     * vue3 tự động biến array thành 1 object proxy array, dùng hàm này để convert lại về array
     * @author tdmanh1 09-05-2023
     * @param proxyArray array muốn convert
     */
    getArrayFromProxyArr(proxyArray) {
      if (proxyArray && isProxy(proxyArray)) {
        return toRaw(proxyArray)
      } else {
        return proxyArray
      }
    },
    /**
     * tạo ra bảng game dựa vào dữ liệu truyền vào
     * @author tdmanh1 09-05-2023
     * @param isClear : có muốn xóa toàn bộ dữ liệu đi không
     */
    generateGameGrid(isClear) {
      let me = this
      if (me.gameSize) {
        // nếu là clear đi thì reset toàn bộ các biến trong chương trình
        if (isClear) {
          me.gameGrid = []
          me.activeSquares = []
          // tạo ra 1 ô active ngẫu nhiên
          me.activeSquares.push(me.randomSquare())
        }
        me.renderGameGrid()
      }
    },
    /**
     * tạo ra ô random muốn active hoặc tô màu
     * @author tdmanh1 09-05-2023
     */
    randomSquare() {
      let me = this
      // mặc định sẽ là ô trên cùng bên trái
      let result = [0, 0]
      if (me.gameSize) {
        let xRandom = Math.floor(Math.random() * me.gameSize)
        let yRandom = Math.floor(Math.random() * me.gameSize)
        result = { x: xRandom, y: yRandom }
      }
      return result
    },
    /**
     * ô cần check có đúng tọa độ không
     * @author tdmanh1 09-05-2023
     * @param coordinate : tọa độ cần kiểm tra
     */
    checkIncludeSquare(coordinate) {
      let me = this
      // kiểm tra xem ô vuông hiện tại có cần active không
      let result = false
      let activeSquares = me.getArrayFromProxyArr(me.activeSquares)
      if (
        coordinate &&
        coordinate.x != null &&
        coordinate.x != undefined &&
        coordinate.y != null &&
        coordinate.y != undefined &&
        activeSquares &&
        activeSquares.length > 0 &&
        activeSquares.filter((element) => element.x == coordinate.x && element.y == coordinate.y)
          .length > 0
      ) {
        result = true
      }
      return result
    },
    /**
     * thực hiện render ra màn hình game
     * @author tdmanh1 09-05-2023
     * @param activeSquares : mảng các ô vuông mong muốn sẽ hiển thị
     */
    renderGameGrid() {
      let me = this
      // reset gameGrid
      me.gameGrid = []
      for (let i = 0; i < me.gameSize; i++) {
        // tao ra bang tam luu 1 dong cua game
        let tempRow = []
        for (let k = 0; k < me.gameSize; k++) {
          // kiểm tra xem ô này có cần active không
          let tempActiveSquare = me.checkIncludeSquare({ x: i, y: k })
          // tạo ra 1 ô vuông
          let singleSquare = {
            activeSquare: tempActiveSquare
          }
          tempRow.push(singleSquare)
        }
        // them 1 dong vao mang de render
        me.gameGrid.push(tempRow)
      }
    },
    /**
     * thay đổi vị trí các ô hiển thị trên màn hình
     * @author tdmanh1 09-05-2023
     * @param newPosition vị trí mới mong muốn hiển thị
     */
    caculateNewPosition(newPosition) {
      let me = this
      let oldActiveSquares = me.getArrayFromProxyArr(me.activeSquares)
      if (newPosition && oldActiveSquares && oldActiveSquares.length > 0 && me.gameSize) {
        // tính toán lại vị trí từng thành phần trong mảng
        // lay gia tri cuoi cung trong mang va cho vao vi tri cuoi cung (moi nhat)
        let tempActiveSquare = oldActiveSquares[oldActiveSquares.length - 1]
        // xoa o dau tien di
        oldActiveSquares.shift()
        if (tempActiveSquare) {
          switch (newPosition) {
            // di chuyển lên
            case gameConfig.position.up:
              if (
                tempActiveSquare.x != null &&
                tempActiveSquare.x != undefined &&
                tempActiveSquare.x > 0
              ) {
                tempActiveSquare.x--
              } else {
                tempActiveSquare.x = me.gameSize - 1
              }
              break
            // di chuyển sang trái
            case gameConfig.position.left:
              if (
                tempActiveSquare.y != null &&
                tempActiveSquare.y != undefined &&
                tempActiveSquare.y > 0
              ) {
                tempActiveSquare.y--
              } else {
                tempActiveSquare.y = me.gameSize - 1
              }
              break
            // di chuyển xuống dưới
            case gameConfig.position.down:
              if (
                tempActiveSquare.x != null &&
                tempActiveSquare.x != undefined &&
                tempActiveSquare.x < me.gameSize - 1
              ) {
                tempActiveSquare.x++
              } else {
                tempActiveSquare.x = 0
              }
              break
            // di chuyển sang phải
            case gameConfig.position.right:
              if (
                tempActiveSquare.y != null &&
                tempActiveSquare.y != undefined &&
                tempActiveSquare.y < me.gameSize - 1
              ) {
                tempActiveSquare.y++
              } else {
                tempActiveSquare.y = 0
              }
              break
            default:
              break
          }
        }
        // them gia tri vua thay doi vao cuoi cung cua mang
        oldActiveSquares.push(tempActiveSquare)
        me.activeSquares = oldActiveSquares
        // render lại game theo active mới
        me.renderGameGrid()
      }
    }
  }
}
</script>
<style scoped>
.m-game {
  background-color: black;
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius);
  padding: var(--padding-common);
}
.m-fence {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid white;
  /* background-color: cadetblue; */
  display: grid;
  grid-template-columns: repeat(gameSize, 1fr);
}
.m-cube {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.58);
}
.m-cube-active {
  background-color: white;
}
</style>
