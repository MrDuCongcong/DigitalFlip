/*
 * @Author: 杜聪聪
 * @Date: 2022-06-11 11:24:23
 * @LastEditors: 杜聪聪(DuCongcong)
 * @LastEditTime: 2022-06-13 19:56:31
 * @Description:
 */
export default {
    data() {
        return {
            localStartVal: parseFloat(this.startVal),
            curStartVal: '',
            curEndVal: '',
        };
    },
    props: {
        duration: {
            type: Number,
            required: false,
            default: 3000,
        },
        autoplay: {
            type: Boolean,
            required: false,
            default: true,
        },
        continue: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        isNumber(val) {
            return !isNaN(parseFloat(val));
        },
    },
};
