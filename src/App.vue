<template>
  <div id="app">
    <main>
      <button type="button" @click="changeWeek(-7, week[0])">&lt;</button
      ><button type="button" @click="changeWeek(7, week[0])">&gt;</button>
      <button type="button" @click="changeWeek()">Today</button>
      <BookingCalendar :weekDays="week" :filteredBooking="filteredBooking" />
    </main>
  </div>
</template>

<script>
import BookingCalendar from "./components/BookingCalendar.vue";
import { store } from "./stores/weeklyOrders";
import booking from "./bookings.json";
import { getWeekDays } from "./utils/getWeekDays";
import { getTimeInMs } from "./utils/getTimeInMs";

export default {
  components: {
    BookingCalendar,
  },
  data() {
    return { week: [], booking: [], filteredBooking: [] };
  },
  mounted() {
    this.booking = booking;
    this.week = store.state.week;
    this.filter();
  },
  methods: {
    changeWeek(payload) {
      store.commit("changeWeek", getWeekDays(payload, this.week[0]));
      this.week = store.state.week;
      this.filter();
    },
    filter() {
      this.filteredBooking = this.booking.filter((el) => {
        if (
          getTimeInMs(el.start) < getTimeInMs(this.week[0]) &&
          getTimeInMs(el.end) > getTimeInMs(this.week[6])
        ) {
          el.allWeek = true;
        }
        if (this.week.includes(el.start) || this.week.includes(el.end)) {
          return true;
        }
      });
    },
  },
};
</script>

<style scoped>
button {
  padding: 0 1rem;
  display: inline-flex;
  line-height: 1.6;
  color: white;
  background-color: rgb(42, 54, 92);
  border-radius: 4px;
}
button:nth-child(3) {
  margin-right: auto;
}
</style>
