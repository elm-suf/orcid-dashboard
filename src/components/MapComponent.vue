<template>
  <svg id="map" viewBox="0 0 960 500" class="binded" :width="width" :height="height">
    <g class="group">
      <path :d="generatePath" class="sphere" />
      <path
        v-for="(count , index) in countries.features"
        :class="{selected : isSelected(count.id), land:true}"
        :key="index"
        :d="generator(count)"
        @click="countryClicked(count)"
      >
        <title>{{getNameByNumeric(count.id)}}</title>
      </path>
    </g>
  </svg>
</template>

<script>
import { tsv, json, geoPath, geoMercator } from "d3";
import { byNumeric } from "iso-country-codes";

import {
  geoAzimuthalEqualArea,
  geoNaturalEarth1,
  geoTransverseMercator,
  geoEquirectangular,
} from "d3-geo";
import { feature } from "topojson";
import { mapState } from "vuex";

export default {
  name: "MapComponent",
  data() {
    return {
      projection: geoNaturalEarth1(),
      projections: {
        geoMercator: geoMercator(),
        geoAzimuthalEqualArea: geoAzimuthalEqualArea(),
        geoNaturalEarth1: geoNaturalEarth1(),
        geoTransverseMercator: geoTransverseMercator(),
      },
      countries: {},
      detailInfo: {},
      width: 960,
      height: 500,
    };
  },
  mounted() {
    const { width, height } = this.$el.getBoundingClientRect();
    this.width = width;
    this.height = height;
    tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv").then((res) => {
      res.forEach((el) => {
        this.detailInfo[el.iso_n3] = el.name;
      });
    });

    json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
      this.countries = feature(data, data.objects.countries);
    });
  },
  computed: {
    ...mapState(["selectedCountries"]),
    generator() {
      return geoPath().projection(this.projection);
    },
    generatePath() {
      return this.generator({ type: "Sphere" });
    },
  },
  methods: {
    isSelected(count) {
      const item = byNumeric[count];
      return this.selectedCountries.includes(item);
    },
    getNameByNumeric(id) {
      const ret = byNumeric[id];
      if (ret && ret.name) {
        return ret.name;
      }
      return ret;
    },
    countryClicked(count) {
      this.$store.dispatch("selectCountry", byNumeric[count.id]);
    },
    selected(item) {
      this.projection = item;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.binded {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  overflow: hidden;
}

.unselected {
  fill: darkgray;
}

.sphere {
  background: #71717c;
  fill: #71717c;
  stroke: #2c3e50;
}

svg {
  background: #2c3e50;
}

path {
  margin: 200px;
  fill: darkgrey;
  stroke: rgb(88, 45, 45);
}

.selected {
  fill: #42b983;
}
.land:hover {
  fill: crimson;
  background: red;
}
.selected:hover {
  fill: #42b983;
}
rect {
  fill: red;
}
</style>
