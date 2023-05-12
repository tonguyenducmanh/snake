/** màn hình thông tin của trò chơi created by tdmanh1 06/05/2023 */
<template>
  <div class="m-board">
    <div @click="turnOnSetting" class="m-setting">&#9881;</div>
    <div v-if="isSetting">
      <div class="m-size">
        <div class="m-size-tile">Game-size: {{ gameSize }} x {{ gameSize }}</div>
        <div class="m-size-button" @click="gameSizeChange(true)">Up</div>
        <div class="m-size-button" @click="gameSizeChange(false)">Down</div>
      </div>
      <div class="m-size">
        <div class="m-size-tile">Speed</div>
        <div class="m-size-button" @click="gameSpeedChange(false)">Up</div>
        <div class="m-size-button" @click="gameSpeedChange(true)">Down</div>
      </div>
    </div>
    <div v-else>
      <div class="m-score">Scores: {{ score }}</div>

      <div class="m-move-content">
        <div class="m-move-item"></div>
        <div class="m-move-item m-move-button" @click="changePosition(gameConfig.position.up)">
          &#8593;
        </div>
        <div class="m-move-item"></div>
        <div class="m-move-item m-move-button" @click="changePosition(gameConfig.position.left)">
          &#8592;
        </div>
        <div class="m-move-item m-move-button" @click="changePosition(gameConfig.position.down)">
          &#8595;
        </div>
        <div class="m-move-item m-move-button" @click="changePosition(gameConfig.position.right)">
          &#8594;
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gameConfig from '../config/gameConfig.js'
export default {
  props: {
    score: {
      type: Number,
      default: 0
    } // điểm hiện tại của trò chơi
  },
  data() {
    return {
      gameSize: gameConfig.gameSize.defaultSize, // kích cỡ của trò chơi hiện tại
      gameConfig: gameConfig,
      isSetting: false // bien kiem soat viec co phai dang bat man hinh setting cua game khong
    }
  },
  methods: {
    /**
     * method tăng, giảm size của game lên 1 đơn vị
     * @author tdmanh1 09-05-2023
     */
    gameSizeChange(isIncrease) {
      let me = this
      // thay doi gia tri hien thi game size
      if (!isIncrease) {
        if (me.gameSize > gameConfig.gameSize.minSize) {
          me.gameSize--
        }
      } else {
        if (me.gameSize < gameConfig.gameSize.maxSize) {
          me.gameSize++
        }
      }
      // thay đổi giá trị của các ô trên màn hình game
      me.$emit('changeGameSize', isIncrease)
    },
    /**
     * method tăng, giảm speed của game
     * @author tdmanh1 10-05-2023
     */
    gameSpeedChange(isIncrease) {
      let me = this
      me.$emit('changeGameSpeed', isIncrease)
    },

    /**
     * thay đổi vị trí của con rắn trên màn hình
     * @author tdmanh1 09-05-2023
     * @param value hướng di chuyển
     */
    changePosition(value) {
      let me = this
      // gọi sự kiện thay đổi vị trí
      me.$emit('changePosition', value)
    },
    /**
     * thay đổi vị trí của con rắn trên màn hình
     * @author tdmanh1 09-05-2023
     */
    turnOnSetting() {
      let me = this
      me.isSetting = !me.isSetting
    }
  }
}
</script>
<style scoped>
.m-board {
  background-color: black;
  width: 100%;
  height: 50%;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: var(--padding-common);
  color: white;
  position: relative;
}
.m-score {
  /* background-color: azure; */
  font-size: 1.5rem;
  padding: 10px;
  font-weight: 600;
  text-align: center;
}
.m-move-content {
  /* background-color: crimson; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
  width: 250px;
  margin-bottom: calc(var(--padding-common) * 2);
}
.m-move-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  border: 1px solid white;
}
.m-size {
  display: flex;
  column-gap: var(--padding-common);
  font-size: 1.2rem;
  justify-content: center;
}
.m-size-button {
  cursor: pointer;
  border-radius: var(--border-radius);
  padding: 0 10px;
}
.m-size-button:hover {
  background-color: rgba(139, 139, 139, 0.681);
}
.m-size-button:active {
  background-color: rgba(120, 120, 120, 0.681);
}
.m-move-button:hover {
  cursor: pointer;
  background-color: rgba(139, 139, 139, 0.681);
}
.m-move-button:active {
  background-color: rgba(120, 120, 120, 0.681);
}
.m-setting {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 3rem;
  cursor: pointer;
}
.m-setting:hover {
  background-color: rgba(95, 158, 160, 0.205);
  border-radius: var(--border-radius);
}
</style>
