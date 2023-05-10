/** component chính của trò chơi created by tdmanh1 06/05/2023 */
<template>
  <div class="m-container">
    <div class="m-header">
      <div>simple sneak game</div>
    </div>
    <div class="m-main">
      <!-- phần trò chơi -->
      <m-game-vue
        :gameSize="emitGameSize"
        :currentPosition="currentPosition"
        :gameSpeed="emitGameSpeed"
      />
      <!-- phần thông tin bên dưới của trò chơi -->
      <m-board-vue
        @changeGameSize="changeGameSize"
        @changePosition="changePosition"
        @changeGameSpeed="changeGameSpeed"
      />
    </div>
  </div>
</template>
<script>
import MBoardVue from './MBoard.vue'
import MGameVue from './MGame.vue'
import gameConfig from '../config/gameConfig.js'
export default {
  components: {
    MBoardVue,
    MGameVue
  },
  data() {
    return {
      emitGameSize: gameConfig.gameSize.defaultSize, // gameSize được thay đổi
      emitGameSpeed: gameConfig.timeRerender.defaultSpeed, // gameSize được thay đổi
      currentPosition: null // hướng di chuyển hiện tại của con rắn
    }
  },
  methods: {
    /**
     * sự kiện thay đổi gameSpeed
     * created by tdmanh1 06/05/2023
     */
    changeGameSpeed(isIncrease) {
      let me = this
      if (!isIncrease) {
        if (me.emitGameSpeed > gameConfig.timeRerender.maxSpeed) {
          me.emitGameSpeed -= 20
        }
      } else {
        if (me.emitGameSpeed < gameConfig.timeRerender.minSpeed) {
          me.emitGameSpeed += 20
        }
      }
    },
    /**
     * sự kiện thay đổi gamesize được emit từ bảng thông tin lên
     * created by tdmanh1 06/05/2023
     */
    changeGameSize(isIncrease) {
      let me = this
      if (!isIncrease) {
        if (me.emitGameSize > gameConfig.gameSize.minSize) {
          me.emitGameSize--
        }
      } else {
        if (me.emitGameSize < gameConfig.gameSize.maxSize) {
          me.emitGameSize++
        }
      }
    },
    changePosition(value) {
      let me = this
      me.currentPosition = value
    }
  }
}
</script>
<style scoped>
.m-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.m-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 600px;
  row-gap: var(--padding-common);
}
.m-header {
  /* background-color: burlywood; */
  height: 50px;
  font-size: 2rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}
</style>
