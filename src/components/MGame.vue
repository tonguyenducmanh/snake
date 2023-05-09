/** màn hình trò chơi created by tdmanh1 06/05/2023 */
<template>
  <div class="m-game">
    <div class="m-fence" :style="gameSizeStyle">
      <!-- tạo ra bảng dựa vào kích thước của gameSize -->
      <template v-for="tempRow in gameGrid" :key="tempRow">
        <template v-for="singleSquare in tempRow" :key="singleSquare">
          <div class="m-cube" :class="singleSquare.colActive ? 'm-cube-active' : null"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gameGrid: [] // mang luu cac o cua tro choi
    }
  },
  props: {
    // kích cỡ của trò chơi, mặc định là ô 7x7
    gameSize: {
      type: Number,
      default: 7
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
    me.generateGameGrid()
  },
  watch: {
    gameSize() {
      let me = this
      me.generateGameGrid()
    }
  },
  methods: {
    /**
     * tao ra bang game
     */
    generateGameGrid() {
      let me = this
      if (me.gameSize) {
        // tinh toan tong so o vuong
        me.gameGrid = []
        for (let i = 0; i < me.gameSize; i++) {
          // tao ra bang tam luu 1 dong cua game
          let tempRow = []
          for (let k = 0; k < me.gameSize; k++) {
            // tao ra 1 o vuong
            let singleSquare = {
              colActive: false
            }
            tempRow.push(singleSquare)
          }
          // them 1 dong vao mang de render
          me.gameGrid.push(tempRow)
        }
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
