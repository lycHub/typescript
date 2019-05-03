<template>
  <div ref="wrapper" class="scroll-wrap">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import BScroll from "better-scroll";
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { Item } from "../interfaces";

@Component({
  name: "Dbscroll"
})
export default class Dbscroll extends Vue {
  private scroll!: BScroll;
  @Prop() readonly data!: any[];
  @Prop({ default: true }) readonly click!: boolean;
  @Prop({ default: true }) readonly mouseWheel: boolean;
  @Prop({ default: 200 }) readonly refreshDelay: number;

  

  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  refresh() {
    this.scroll && this.scroll.refresh();
    const containerWidth = (this.$slots.default[0].elm as HTMLElement).offsetWidth;
    this.onRefresh(containerWidth);
  }
  disable() {
    this.scroll && this.scroll.disable();
  }
  enable() {
    this.scroll && this.scroll.enable();
  }

  private _initScroll() {
    if (!this.$refs.wrapper) {
      return;
    }
    this.scroll = new BScroll(<Element>this.$refs.wrapper, {
      scrollX: true,
      click: this.click,
      mouseWheel: this.mouseWheel
    });
  }

  @Emit('on-refresh')
    private onRefresh(width: number): number {
      return width;
    }

  @Watch("data")
  onDataChanged() {
    setTimeout(() => {
      this.refresh();
    }, this.refreshDelay);
  }

  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  }
}
</script>
<style scoped lang="less">
.scroll-wrap {
  max-width: 100%;
  overflow: hidden;
}
</style>