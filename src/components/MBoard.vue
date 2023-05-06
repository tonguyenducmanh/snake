/**
    màn hình thông tin của trò chơi
    created by tdmanh1 06/05/2023
 */
<template>
    <div class="m-board">
        <div class="m-title">
            Scores
        </div>
        <div class="m-score">
            {{score}}
        </div>
        <div class="m-size">
            <div class="m-size-tile">
                Game-size: {{gameSize}} x  {{gameSize}}
            </div>
            <div class="m-size-button" @click="gameSizeChange(true)">Up</div>
            <div class="m-size-button" @click="gameSizeChange(false)">Down</div>
        </div>
        <div class="m-tutorial">
            <div class="m-tutorial-title">
                Tutorial
            </div>
            <div class="m-tutorial-content">
                <div class="m-tutorial-item"></div>
                <div class="m-tutorial-item">w</div>
                <div class="m-tutorial-item"></div>
                <div class="m-tutorial-item">a</div>
                <div class="m-tutorial-item">s</div>
                <div class="m-tutorial-item">d</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            score: 0, // điểm hiện tại của trò chơi
            gameSize: 7, // kích cỡ của trò chơi hiện tại
            maxGameSize: 15, // kích cỡ lớn nhất của game
            minGameSize: 5, // kích cỡ nhỏ nhất của game
        }
    },
    methods:{
        /**
         * method tăng, giảm size của game lên 1 đơn vị
         */
        gameSizeChange(isIncrease){
            let me = this
            // thay đổi giá trị hiển thị trên thông tin
            if(!isIncrease){
                if(me.gameSize > me.minGameSize){
                    me.gameSize --
                }
            }else{
                if(me.gameSize < me.maxGameSize){
                    me.gameSize ++
                }
            }
            // thay đổi giá trị của các ô trên màn hình game
            me.$emit("changeGameSize", isIncrease)
        },
    }
}
</script>
<style scoped>
    .m-board{
        background-color: black;
        height: 100%;
        width: 40%;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap:var(--padding-common);
        color: white;
    }
    .m-title{
        /* background-color: azure; */
        padding: 10px;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .m-score{
        font-size: 3rem;
    }
    .m-tutorial{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: var(--padding-common)
    }
    .m-tutorial-title{
        /* background-color: chartreuse; */
        padding: var(--padding-common);
    }
    .m-tutorial-content{
        /* background-color: crimson; */
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        height: 100px;
        width: 250px;
    }
    .m-tutorial-item{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-transform: uppercase;
        border: 1px solid white;
    }
    .m-size{
        display: flex;
        column-gap: var(--padding-common);
    }
    .m-size-button{
        cursor: pointer;
    }
    .m-size-button:hover{
        background-color: rgba(139, 139, 139, 0.681);
    }
</style>