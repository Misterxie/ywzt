<style lang="less">
    @import './styles/infor-card.less';
    .icon{
        display:block;
        width:60px;
        height:60px;
        position:absolute;
        left:30px;
    }
    .icon:hover{
        transform: scale(1.2);
    }
    .icon1{
        background:url('./styles/bnt01.png') no-repeat;
        background-size: 100% 100%;
    }
    .icon2{
        background:url('./styles/bnt02.png') no-repeat;
        background-size: 100% 100%;
    }
    .icon3{
        background:url('./styles/bnt03.png') no-repeat;
        background-size: 100% 100%;
    }
    .icon4{
        background:url('./styles/bnt04.png') no-repeat;
        background-size: 100% 100%;
    }
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <!--<Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">-->
                <!--<Row class="height-100" type="flex" align="middle" justify="center">-->
                    <!--<Icon :type="iconType" :size="iconSize"></Icon>-->
                <!--</Row>-->
            <!--</Col>-->
            <Col span="24" class="height-100 " >
                <Row type="flex" align="middle" justify="center" class="height-100 " style="position:relative">
                    <i class="icon" :class="iconClass"></i>
                    <count-up
                        class="infor-card-count user-created-count"
                        :id-name="idName"
                        :end-val="endVal"
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                        style="position:absolute;right:38px;text-align: right;"
                    >
                        <p class="infor-intro-text" slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '42px'
        },
        countWeight: {
            type: Number,
            default: 0
        },
        iconSize: {
            type: Number,
            default: 40
        },
        iconClass: {
            type: Object
        }
    }
};
</script>

