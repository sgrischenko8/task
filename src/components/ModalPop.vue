<template>
  <div class="modal" :style="tooltipStyle" id="tooltip">
    <h2>{{ data.name }}</h2>
    <p>{{ data.phone }}</p>
    <p class="mb">{{ data.email }}</p>

    <h3 class="h">Appartment Details:</h3>
    <p>Type: {{ data.typeOfApartments }}</p>
    <p>Id: {{ data.roomDetails.id }}</p>
    <p>Name: "{{ data.roomDetails.name }}"</p>
    <p>From: {{ data.start }}</p>
    <p class="mb">To: {{ data.end }}</p>
    <slot></slot>
    <p>Adults: {{ data.guestInfo.adults }}</p>
    <p class="mb">Children: {{ data.guestInfo.children }}</p>
    <button @click="closePopup" @click.stop class="closeBtn">Close</button>
  </div>
</template>

<script>
export default {
  props: { data: Object, isOpen: Boolean },
  data() {
    return {
      tooltipStyle: {},
    };
  },
  emits: {
    close: null,
  },
  mounted() {
    this.fixTooltipPosition();
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    fixTooltipPosition() {
      const tooltipElement = document.getElementById("tooltip");
      const gridElement = document.getElementById("grid");

      if (tooltipElement && gridElement) {
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const gridRect = gridElement.getBoundingClientRect();

        // get gap beetwen edge og the grid and the tooltip
        const topGap = tooltipRect.bottom - gridRect.top;
        const rightGap = tooltipRect.right - gridRect.right;

        // fix the position if the tooltip goes beyond the grid boundaries
        this.tooltipStyle = {
          bottom: topGap < 560 ? "-360px" : `1rem`,
          left: rightGap > 0 ? "-200px" : "65%",
        };
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  padding: 5px 10px 15px;
  width: 200px;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: white;
  color: black;
  text-align: left;
  word-break: break-all;
  box-shadow: -1px -1px 8px rgba(20, 20, 20, 0.3);
  z-index: 100;
}

.closeBtn {
  padding: 0 1rem;
  display: inline-flex;
  line-height: 1.6;
  color: white;
  background-color: rgb(42, 54, 92);
  border-radius: 4px;
}

.modal::before {
  content: "";
  position: absolute;
  bottom: 3.4rem;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #ddd;
}

.mb {
  margin-bottom: 1.5rem;
}
</style>
