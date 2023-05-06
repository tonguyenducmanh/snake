/**
    màn hình trò chơi
    created by tdmanh1 06/05/2023
 */
<template>
    <div class="m-game">
        <div class="m-fence" :style="gameSizeStyle">
            <!-- tạo ra bảng dựa vào kích thước của gameSize -->
            <template v-for="indexRow in gameSize" :key="indexRow">
                    <template v-for="indexCol in gameSize" :key="indexCol">
                        <div v-if="gameSize % 2 == 0" 
                            class="m-cube" 
                            :class="(indexRow == indexCol && indexRow == gameSize/2) ? 'm-cube-active': null"
                        ></div>
                        <div v-else 
                            class="m-cube" 
                            :class="(indexRow == indexCol && indexRow == Math.floor(gameSize/2) + 1) ? 'm-cube-active': null"
                        ></div>
                    </template>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        // kích cỡ của trò chơi, mặc định là ô 7x7
        gameSize:{
            type: Number,
            default: 7,
        }
    },
    computed:{
        gameSizeStyle(){
            return {
                'grid-template-columns': `repeat(${this.gameSize}, 1fr)`
            }
        }
    }
}
</script>
<style scoped>
    .m-game{
        background-color: black;
        height: 100%;
        width: 60%;
        border-radius: var(--border-radius);
        padding: var(--padding-common);
    }
    .m-fence{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid white;
        /* background-color: cadetblue; */
        display: grid;
        grid-template-columns: repeat(gameSize, 1fr);
    }
    .m-cube{
        display: flex;
        border: 1px solid rgba(255, 255, 255, 0.58);
    }
    .m-cube-active{
        background-color: white;
    }
</style>