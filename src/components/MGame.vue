/**
    màn hình trò chơi
    created by tdmanh1 06/05/2023
 */
<template>
    <div class="m-game">
        <div class="m-fence" :style="gameSizeStyle">
            <!-- tạo ra bảng dựa vào kích thước của gameSize -->
            <template v-for="index in gameSize" :key="index">
                <template v-for="index in gameSize" :key="index">
                    <div class="m-cube" ></div>
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
        background-color: white;
        margin: 10px;
    }
</style>