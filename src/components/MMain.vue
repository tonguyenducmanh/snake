/**
    component chính của trò chơi
    created by tdmanh1 06/05/2023
 */
<template>
    <div class="m-container">
        <div class="m-header">
            <div>simple sneak game</div>
        </div>
        <div class="m-main">
            <!-- phần thông tin bên trái của trò chơi -->
            <m-board-vue @changeGameSize="changeGameSize"/>
            <!-- phần trò chơi -->
            <m-game-vue :gameSize="emitGameSize"/>
        </div>
    </div>
</template>
<script>
import MBoardVue from './MBoard.vue'
import MGameVue from './MGame.vue'
export default {
    components:{
        MBoardVue,
        MGameVue
    },
    data(){
        return{
            emitGameSize: 7,// gameSize được thay đổi
            maxGameSize: 15, // kích cỡ lớn nhất của game
            minGameSize: 5, // kích cỡ nhỏ nhất của game
        }
    },
    methods:{
        /**
         * sự kiện thay đổi gamesize được emit từ bảng thông tin lên
         * created by tdmanh1 06/05/2023
         */
        changeGameSize(isIncrease){
            let me = this
            if(!isIncrease){
                if(me.emitGameSize > me.minGameSize){
                    me.emitGameSize --
                }
            }else{
                if(me.emitGameSize < me.maxGameSize){
                    me.emitGameSize ++
                }
            }
        }
    },
}
</script>
<style scoped>
    .m-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .m-main{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 800px;
        height: 500px;
        column-gap: var(--padding-common);
    }
    .m-header{
        /* background-color: burlywood; */
        height: 100px;
        font-size: 2rem;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }
</style>