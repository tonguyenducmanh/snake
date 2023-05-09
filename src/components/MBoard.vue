/** màn hình thông tin của trò chơi created by tdmanh1 06/05/2023 */
<template>
  <div class="m-board">
    <div class="m-score">Scores: {{ score }}</div>
    <div class="m-size">
      <div class="m-size-tile">Game-size: {{ gameSize }} x {{ gameSize }}</div>
      <div class="m-size-button" @click="gameSizeChange(true)">Up</div>
      <div class="m-size-button" @click="gameSizeChange(false)">Down</div>
    </div>
    <div class="m-move">
      <div class="m-move-title">Moves</div>
      <div class="m-move-content">
        <div class="m-move-item"></div>
        <div class="m-move-item m-move-button">w</div>
        <div class="m-move-item"></div>
        <div class="m-move-item m-move-button">a</div>
        <div class="m-move-item m-move-button">s</div>
        <div class="m-move-item m-move-button">d</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: 0, // điểm hiện tại của trò chơi
      gameSize: 7, // kích cỡ của trò chơi hiện tại
      maxGameSize: 15, // kích cỡ lớn nhất của game
      minGameSize: 5 // kích cỡ nhỏ nhất của game
    }
  },
  methods: {
    /**
     * method tăng, giảm size của game lên 1 đơn vị
     */
    gameSizeChange(isIncrease) {
      let me = this
      // thay đổi giá trị hiển thị trên thông tin
      if (!isIncrease) {
        if (me.gameSize > me.minGameSize) {
          me.gameSize--
        }
      } else {
        if (me.gameSize < me.maxGameSize) {
          me.gameSize++
        }
      }
      // thay đổi giá trị của các ô trên màn hình game
      me.$emit('changeGameSize', isIncrease)
    }
  }
}
</script>
<style scoped>
.m-board {
  background-color: black;
  width: 100%;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: var(--padding-common);
  color: white;
  flex: 1;
}
.m-score {
  /* background-color: azure; */
  font-size: 1.5rem;
  padding: 10px;
  font-weight: 600;
}
.m-move {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: var(--padding-common);
  padding-bottom: var(--padding-common);
}
.m-move-title {
  /* background-color: chartreuse; */
  padding: var(--padding-common);
}
.m-move-content {
  /* background-color: crimson; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100px;
  width: 250px;
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
}
.m-size-button {
  cursor: pointer;
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
</style>
