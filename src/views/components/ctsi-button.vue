<style lang="less" scoped>
</style>

<template>
    <Button :disabled="isDisabled"
            :type="type"
            :shape="shape"
            :icon="icon"
            :size="size"
            @click="emitParentCilck"
            :long="long"
            :loading="loading">
        <slot></slot>
    </Button>
</template>

<script>
import util from '@/libs/util.js';

export default {
  data() {
    return {};
  },
  methods: {
    emitParentCilck() {
      this.$emit("click");
    }
  },
  computed: {
    isDisabled() {
        return !this.$util.isHasPermission(this.code);
    }
  },
  props: {
    code: {
      type: String
    },
    type: {
      type: String
    },
    shape: {
      type: String
    },
    icon: {
      type: String
    },
    size: {
      type: String
    },
    long: {},
    loading: {
      type: Boolean,
      default: false
    }
  },
  create() {
    this.isDisabled = true;
  },
  created () {
    util.statistic('baseComp', 'ctsi-button' , '');
  },
  mounted() {}
};
</script>
