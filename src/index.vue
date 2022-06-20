<!--
 * @Author: 杜聪聪
 * @Date: 2022-06-11 11:00:22
 * @LastEditors: 杜聪聪(DuCongcong)
 * @LastEditTime: 2022-06-14 12:15:01
 * @Description: 
-->
<template>
    <component ref="childRef" :is="`digital-${mode}`" v-bind="$attrs"></component>
</template>

<script>
import DigitalCount from './DigitalCount.vue';
import DigitalFlip from './DigitalFlip.vue';

export default {
    components: {
        DigitalCount,
        DigitalFlip,
    },
    props: {
        mode: {
            type: String,
            validator: function (val) {
                return ['count', 'flip'].indexOf(val) !== -1;
            },
            default: 'count',
        },
    },
    methods: {
        start() {
            this.$refs.childRef.start();
        },
        reset() {
            this.$refs.childRef.reset();
        },
        update() {
            this.$refs.childRef.update();
        },
    },
};
</script>
