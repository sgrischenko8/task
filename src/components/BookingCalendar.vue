<template>
  <div class="wrapper">
    <div class="grid-container" id="grid">
      <p v-for="item in weekDays" :key="item" class="grid-item colHead">
        {{ item }}
      </p>

      <p
        v-for="(apartment, index) in apartments"
        :key="index"
        class="grid-item rowHead"
      >
        {{ apartment }}
      </p>

      <p
        v-for="order in filteredBooking"
        @click="showCurrentModal(order.id)"
        :key="order.id"
        class="grid-item order"
        :style="getOrderStyleObj(order)"
      >
        {{ order.name }}

        <ModalPop
          v-if="id === order.id && showPopup"
          @close="showPopup = false"
          :data="order"
          :isOpen="showPopup"
          ><p class="fwbold">Number of Guests:</p></ModalPop
        >
      </p>
    </div>
    <div v-if="showPopup" class="overlay" @click="closePopup"></div>
  </div>
</template>

<script>
import booking from "../bookings.json";
import { getApartments } from "../utils/getApartments";
import ModalPop from "./ModalPop.vue";

export default {
  components: {
    ModalPop,
  },
  props: { weekDays: Array, filteredBooking: Array },
  data() {
    return {
      id: undefined,
      showPopup: false,
      booking: [],
      apartments: [],
    };
  },
  mounted() {
    this.booking = booking;
    this.apartments = getApartments(booking);
  },

  methods: {
    showCurrentModal(id) {
      this.id = id;
      this.showPopup = true;
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },

    getOrderStyleObj(booking) {
      let duration;
      let radius;
      let margin;

      const startDay = this.weekDays.indexOf(booking.start);
      const endDay = this.weekDays.indexOf(booking.end);

      if (!booking.allWeek) {
        let leftTop = "20px";
        let leftBottom = "20px";
        let rightTop = "20px";
        let rightBottom = "20px";

        if (startDay === -1) {
          leftTop = "0px";
          leftBottom = "0px";
          duration = (endDay - 0) * 2 + 1;
          margin = "0 5px 0 0";
        } else if (endDay === -1) {
          rightTop = "0px";
          rightBottom = "0px";
          duration = (6 - startDay) * 2 + 1;
          margin = "0 0 0 5px";
        } else {
          duration = (endDay - startDay) * 2;
        }
        radius =
          leftTop + " " + rightTop + " " + rightBottom + " " + leftBottom;
      }
      if (booking.allWeek) {
        duration = 14;
        radius = "none";
        margin = "0";
      }

      if (!booking.allWeek && startDay !== -1 && endDay !== -1) {
        margin = "0 5px";
      }

      const position = startDay === -1 ? 5 : startDay * 2 + 6;

      return {
        "grid-column": position + "/ span " + (duration || 1),
        "grid-row": this.apartments.indexOf(booking.roomDetails.name) + 2,
        "border-radius": radius,
        margin,
      };
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}
.grid-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  overflow: hidden;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.order {
  position: relative;
  height: 75%;
  display: flex;
  align-items: center;
  align-self: flex-end;
  font-weight: bold;
  justify-content: center;
  color: black;
  background-color: rgb(81, 156, 255);
  border: 2px solid white;
  cursor: pointer;
}

.grid-item {
  grid-column: span 2;
  padding: 10px;
  text-align: center;
}

.colHead:first-child {
  grid-column: 5 / span 2;
}

.colHead {
  position: relative;
  grid-column: span 2;
  padding: 1rem 1rem 2rem 1rem;
  border-top: 0.5px solid #ddd;
  border-bottom: 0.5px solid #ddd;
  font-weight: 700;
}

.rowHead {
  padding: 2.5rem 1rem;
  position: relative;
  grid-column: 1 / span 4;
  text-align: left;
  border: 0.5px solid #ddd;
  color: green;
  font-weight: 500;
}

.colHead::before {
  content: "";
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #ddd;
}

.colHead::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  z-index: 0;
}

.colHead:nth-child(odd)::after {
  border-left: 0.5px solid #ddd;
  border-right: 0.5px solid #ddd;
}

.colHead:hover::after {
  background-color: rgba(0, 200, 0, 0.2);
}

.rowHead::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 0.5px;
  background-color: #ddd;
}

.fwbold {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
