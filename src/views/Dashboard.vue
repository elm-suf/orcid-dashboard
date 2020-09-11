<template>
  <div class="parent">
    <div class="main">
      <combo></combo>
      <v-card height="100%" elevation="0">
        <map-component></map-component>
      </v-card>
    </div>
    <div class="right" style="padding:1em">
      <v-card height="100%" v-if="!detailedView">
        <ve-bar height="100%" :data="barData" :settings="chartSettings" :events="chartEvents"></ve-bar>
      </v-card>
      <v-card height="100%" v-if="detailedView">
        <i @click="chartEvents.click" class="fa fa-arrow-left mt-4 ml-4" aria-hidden="true"></i>
        <ve-histogram height="100%" :data="detailBarData" :settings="detailSettings"></ve-histogram>
      </v-card>
    </div>
    <div class="bottom" style="padding:1em">
      <v-card height="100%">
        <ve-line height="100%" :data="lineData"></ve-line>
      </v-card>
    </div>
    <!-- <div class="main" style="background:blue; margin:0; margin-right:24px">
      <h2>Main</h2>
    </div>
    <div class="right">
      <h2>Right</h2>
    </div>
    <div class="bottom">
      <h2>Botttom</h2>
    </div>-->
  </div>
</template>

<script>
import Combo from "../_components/ComparingComponent";
import MapComponent from "../components/MapComponent";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Dashboard",
  components: { MapComponent, Combo },
  created() {
    this.$store.dispatch("fetchCountries");
    // this.$store.dispatch('fetchMigrations');
  },
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0,
      },
      isPlaying: false,
      chartSettings: {
        stack: {
          xxx: ["in", "out"],
        },
        dataOrder: {
          label: "in",
          order: "desc",
        },
      },
      detailSettings: {
        dataOrder: {
          label: "in",
          order: "desc",
        },
      },
      detailedView: null,
      chartEvents: {
        click: (e) => {
          this.flip();
          this.$store.dispatch("updateCurrent", e.name);
        },
      },
    };
  },
  computed: {
    ...mapState(["selectedCountries"]),
    ...mapGetters([
      "barData",
      "detailBarData",
      "lineData",
      "lines",
      "selectedCountry",
      // 'countries',
      // 'dashBar'
    ]),
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.outerHeight };
    },
    flip() {
      this.detailedView = !this.detailedView;
    },
  },
};
</script>

<style scoped>
.parent {
    background: #2c3e50;
  height: 100vh;
  width: 100wh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-areas:
    "main main  right right"
    "main main  right right"
    "main main  right right"
    "bottom  bottom bottom bottom"
    "bottom  bottom bottom bottom";
}

.right {
  grid-area: right;
  height: 100%;
  width: 100%;
}

.bottom {
  grid-area: bottom;
  height: 100%;
  width: 100%;
}

.main {
  padding: 1em;
  grid-area: main;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
@media (max-width: 768px) {
  .parent {
    background: #2c3e50;

    width: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-areas:
      "main"
      "right"
      "bottom";
  }

  .bottom {
    width: 100vw;
    height: 30vh;
  }

  .right {
    width: 100wh;
    height: 40vh;
  }
  .main {
    width: 100wh;
    height: 50vh;
  }
}
</style>
