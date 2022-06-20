<!--
 * @Author: 杜聪聪
 * @Date: 2019-12-04 14:56:07
 * @LastEditTime: 2022-06-14 12:13:36
 * @LastEditors: 杜聪聪(DuCongcong)
 * @Description: 实现数字翻牌动态效果，css 属性 writing-mode: vertical-lr，使数字竖直排版，
        2d移动 transform: translate(-50%, -40%); y值控制移动至哪个数字，transition
        控制transform属性有动画效果
 -->
<template>
    <div class="digital-flip">
        <li class="list-item" v-for="(item, index) in strList" :key="index">
            <span class="item-number" :style="numWrapStyle" v-if="!isNaN(item)">
                <span class="num-list-wrap" ref="numRef">
                    <span :style="numStyle" class="num-item" v-for="n in numList" :key="n">{{ n }}</span>
                </span>
            </span>
            <span class="item-comma" v-else>{{ item }}</span>
        </li>
    </div>
</template>
<script>
import mixin from './mixin.js';

export default {
    name: 'DigitalFlip',
    mixins: [mixin],
    props: {
        startVal: {
            type: [Number, String],
            required: false,
            default: 0,
        },
        endVal: {
            type: [Number, String],
            required: false,
            default: 2017,
        },
        easingFn: {
            type: String,
            validator: function (value) {
                return (
                    ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'].indexOf(value) !== -1 ||
                    value.includes('cubic-bezier')
                );
            },
            default: 'ease',
        },
        textStyle: {
            type: Object,
        },
    },

    data() {
        return {
            numList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            strList: [],

            numStyle: {},
            numWrapStyle: {},
        };
    },
    watch: {
        startVal() {
            if (this.autoplay) {
                this.start();
            }
        },
        endVal() {
            if (this.autoplay) {
                this.start();
            }
        },
        strList: {
            handler(newVal) {
                console.log('2322', newVal);
            },
            deep: true,
        },
    },
    mounted() {
        if (this.autoplay) {
            this.start();
        }
    },
    methods: {
        start() {
            this.curEndVal = this.endVal;

            let startVal = this.startVal;
            let endVal = this.endVal;

            if (this.continue) {
                startVal = this.curEndVal ? this.curEndVal : startVal;
            }

            const endCharList = endVal.toString().split('');
            const startCharList = startVal.toString().split('');

            const strList = [];
            for (let i = 0; i < endCharList.length; i += 1) {
                const eChar = endCharList[i];
                if (isNaN(eChar)) {
                    strList.push(eChar);
                } else {
                    const sChar = startCharList[i];
                    if (isNaN(sChar)) {
                        strList.push(0);
                    } else {
                        strList.push(sChar);
                    }
                }
            }
            this.strList = strList;

            this.$nextTick(() => {
                this.setNumWrapStyle();
                this.$nextTick(() => {
                    this.setNumberTransform(endCharList);
                });
            });
        },

        setNumWrapStyle() {
            let numWrapStyle = {};
            let iDom = this.$el.querySelector('.num-item');

            if (iDom) {
                numWrapStyle.height = iDom.offsetHeight + 'px';
                numWrapStyle.width = iDom.offsetWidth + 'px';
                this.numWrapStyle = numWrapStyle;
            }
        },

        setNumberTransform(charList) {
            const numCharList = charList.filter((item) => !isNaN(item));
            const numRefs = this.$refs.numRef; // 拿到数字的ref，计算元素数量

            for (let i = 0; i < numRefs.length; i += 1) {
                const elem = numRefs[i];
                const numChar = numCharList[i];
                if (!isNaN(numChar)) {
                    this.setItemTransformTo(elem, parseInt(numChar));
                }
            }
        },

        setItemTransformTo(elem, i) {
            const { duration, easingFn } = this;

            elem.style.transform = `translate(0px, -${i * 10}%)`;
            elem.style.transition = `transform ${duration}ms ${easingFn}`;
        },
        clearNumberTransForm() {
            const numRefs = this.$refs.numRef;
            if (!Array.isArray(numRefs)) return;

            for (let i = 0; i < numRefs.length; i += 1) {
                const elem = numRefs[i];
                elem.style.transform = 'none';
                elem.style.transition = 'none';
            }
        },
        reset() {
            this.clearNumberTransForm();
        },
        update() {
            if (this.autoplay) {
                this.start();
            }
        },
    },
    beforeDestroy() {
        this.clearNumberTransForm();
    },
};
</script>
<style scoped>
.digital-flip {
    position: relative;
    list-style: none;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}

.digital-flip .list-item {
    display: inline-block;
}

.item-number {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
}
.item-number .num-list-wrap {
    position: absolute;
    list-style: none;
    top: 0px;
    vertical-align: baseline;
}
.item-number .num-list-wrap > span {
    display: block;
}
</style>
