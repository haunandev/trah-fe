<template>
  <div
    class="form-group"
    :class="
      item.suffix || item.prefix || item.nm
        ? item.groupClass || 'mb-0'
        : item.groupClass || ''
    "
  >
    <ValidationProvider
      mode="eager"
      :name="item.label"
      :rules="item.validation.join('|')"
      v-slot="{ classes, errors }"
      :class="[item.suffix || item.prefix ? 'row' : '', item.rowclass]"
    >
      <label
        v-if="
          item.type != 'hidden' &&
            item.label != null &&
            item.label != '' &&
            !item.hideLabel
        "
        :class="
          dateType.includes(item.type)
            ? 'd-block'
            : item.suffix || item.prefix
            ? 'col-12'
            : ''
        "
      >
        {{ item.label }}
        <span v-if="item.validation.includes('required')" class="text-danger">
          *
        </span>
        <i v-if="item.tooltip" v-b-tooltip.hover :title="item.tooltip" class="ri-information-line text-sm"></i>
      </label>

      <label
        v-if="item.prefix"
        :class="item.classLabel ? item.classLabel : 'col-auto'"
        class="col-form-label"
      >
        {{ item.prefix }}
      </label>

      <!-- Input Type Default  -->
      <template v-if="defaultType.includes(item.type)">
        <template v-if="item.useBS">
          <b-input-group
            size="lg"
            v-if="item.option.prepend || item.option.append"
          >
            <template v-if="item.option.prepend">
              <b-input-group-prepend
                v-for="(p, i) in item.option.prepend"
                :key="'p-' + i"
              >
                <div class="input-group-text" :class="p.class">
                  <i v-if="p.type === 'icon'" :class="p.name + ' p-0'"> </i>
                  <span v-if="p.type === 'text'">
                    {{ p.name }}
                  </span>
                </div>
              </b-input-group-prepend>
            </template>

            <input
              :disabled="item.disabled"
              v-bind:value="value"
              v-bind="item.attr"
              v-on:input="$emit('input', $event.target.value)"
              :type="item.type"
              class="form-control"
              :class="[
                item.validation.length > 0 ? classes : '',
                item.suffix || item.prefix ? 'col' : '',
                item.ic
              ]"
              :placeholder="
                item.placeholder
                  ? item.placeholder
                  : 'Ketikkan ' + (item.label || '') + ' disini...'
              "
            />

            <template v-if="item.option.append">
              <b-input-group-append
                v-for="(p, i) in item.option.append"
                :key="'p-' + i"
              >
                <div class="input-group-text" :class="p.class">
                  <i v-if="p.type === 'icon'" :class="p.name + ' p-0'"> </i>
                  <span v-if="p.type === 'text'">
                    {{ p.name }}
                  </span>
                </div>
              </b-input-group-append>
            </template>

            <div class="invalid-feedback">{{ errors[0] }}</div>
          </b-input-group>
        </template>

        <template v-else>
          <input
            :disabled="item.disabled"
            v-bind:value="value"
            v-bind="item.attr"
            v-on:input="$emit('input', $event.target.value)"
            :type="item.type"
            class="form-control"
            :class="[
              item.validation.length > 0 ? classes : '',
              item.suffix || item.prefix ? 'col' : '',
              item.ic
            ]"
            :placeholder="
              item.placeholder
                ? item.placeholder
                : 'Ketikkan ' + (item.label || '') + ' disini...'
            "
          />
        </template>
      </template>

      <!-- Input Type Number  -->
      <template v-else-if="numberType.includes(item.type)">
        <template v-if="item.useBS && item.type === 'money'">
          <b-input-group size="lg" prepend="Rp.">
            <vue-numeric
              v-model="tmp_value"
              separator="."
              :empty-value="0"
              :disabled="item.disabled"
              :currency="item.type === 'money' ? '' : null"
              v-bind="item.attr"
              v-on:input="$emit('input', tmp_value)"
              class="form-control w-auto"
              :class="[
                item.validation.length > 0 ? classes : '',
                item.suffix || item.prefix ? 'col' : '',
                item.ic
              ]"
              :placeholder="
                item.placeholder
                  ? item.placeholder
                  : 'Ketikkan ' + (item.label || '') + ' disini...'
              "
            />
          </b-input-group>
        </template>
        <template v-else-if="item.useBS && item.type !== 'money'">
          <b-input-group
            size="lg"
            v-if="item.option.prepend || item.option.append"
          >
            <template v-if="item.option.prepend">
              <b-input-group-prepend
                v-for="(p, i) in item.option.prepend"
                :key="'p-' + i"
              >
                <div class="input-group-text" :class="p.class">
                  <i v-if="p.type === 'icon'" :class="p.name + ' p-0'"> </i>
                  <span v-if="p.type === 'text'">
                    {{ p.name }}
                  </span>
                </div>
              </b-input-group-prepend>
            </template>

            <vue-numeric
              v-model="tmp_value"
              separator="space"
              v-bind="item.attr"
              v-on:input="$emit('input', tmp_value)"
              :disabled="item.disabled"
              class="form-control"
              :class="[
                item.validation.length > 0 ? classes : '',
                item.suffix || item.prefix ? 'col' : '',
                item.ic ? item.ic : 'w-auto'
              ]"
              :placeholder="
                item.placeholder
                  ? item.placeholder
                  : 'Ketikkan ' + (item.label || '') + ' disini...'
              "
            />

            <template v-if="item.option.append">
              <b-input-group-append
                v-for="(p, i) in item.option.append"
                :key="'p-' + i"
              >
                <div class="input-group-text" :class="p.class">
                  <i v-if="p.type === 'icon'" :class="p.name + ' p-0'"> </i>
                  <span v-if="p.type === 'text'">
                    {{ p.name }}
                  </span>
                </div>
              </b-input-group-append>
            </template>

            <div class="invalid-feedback">{{ errors[0] }}</div>
          </b-input-group>
        </template>
        <template v-else>
          <vue-numeric
            v-model="tmp_value"
            separator="."
            :empty-value="0"
            :disabled="item.disabled"
            :currency="item.type === 'money' ? 'Rp.' : null"
            v-bind="item.attr"
            v-on:input="$emit('input', tmp_value)"
            class="form-control"
            :class="[
              item.validation.length > 0 ? classes : '',
              item.suffix || item.prefix ? 'col' : '',
              item.ic
            ]"
            :placeholder="
              item.placeholder
                ? item.placeholder
                : 'Ketikkan ' + (item.label || '') + ' disini...'
            "
          />
        </template>
      </template>

      <!-- <input :disabled="item.disabled" v-else-if="numberType.includes(item.type)" v-model="tmp_value" v-bind="item.attr" v-on:change="revertNumberType(tmp_value)" v-number-input="item.type" type="text" class="form-control" :class="[ item.validation.length>0? classes : '',item.suffix || item.prefix? 'col' : '', item.ic]" :placeholder="item.placeholder ? item.placeholder : 'Ketikkan '+item.label+' disini...' " /> -->

      <!-- Input Type Date  -->
      <date-picker
        :inline="item.inline"
        v-else-if="dateType.includes(item.type)"
        :input-attr="{ autocomplete: 'off' }"
        v-model="tmp_value"
        v-on:input="$emit('input', $event)"
        :type="item.type"
        :disabled="item.disabled"
        :input-class="'form-control'"
        :class="[item.validation.length > 0 ? classes : '', item.ic]"
        :placeholder="item.placeholder || null"
        :value-type="formatDate(item.type)"
        :formatter="item.formatter || null"
        :clearable="item.clearable"
      />

      <!-- Input Type Select  -->
      <v-select
        :disabled="item.disabled"
        v-bind="item.attr"
        v-else-if="item.type === 'select'"
        v-model="tmp_value"
        v-on:input="$emit('input', $event)"
        :reduce="x => x.code"
        :appendToBody="item.notAppendToBody ? false : true"
        class="vs-style"
        :options="tmp_option"
        :placeholder="item.placeholder || null"
        :class="[
          item.validation.length > 0 ? classes : item.nm ? 'mb-0' : 'mb-3',
          item.ic
        ]"
      >
        <template #no-options="{ search, searching, loading }">
          {{ item.no_data_text || $t("error.no_data") }}
        </template>
      </v-select>

      <!-- Input Type Select with Button  -->
      <div v-else-if="item.type == 'select-button'">
        <input type="hidden" v-model="tmp_value">
        <b-button v-for="(to, toIndex) in tmp_option" :key="`select-button-${toIndex}`"
          :disabled="item.disabled"
          :variant="`${tmp_value == (to.code || to) ? '': 'outline-'}primary`"
          class="mr-2"
          @click="tmp_value = to.code || to;$emit('input', tmp_value)"
        >
          {{ to.label || to }}
        </b-button>
      </div>

      <!-- Input Type Checkbox with Button  -->
      <div v-else-if="item.type == 'checkbox-button'">
        <input type="hidden" v-model="tmp_value">
        <b-button v-for="(to, toIndex) in tmp_option" :key="`checkbox-button-${toIndex}`"
          :disabled="item.disabled"
          :variant="`${tmp_value.find(v => v == (to.code || to)) ? '': 'outline-'}primary`"
          class="mr-2 mb-2"
          @click="onClickCheckboxButton(to)"
        >
          <i v-if="tmp_value.find(v => v == (to.code || to))" class="ri-checkbox-line"></i>
          <i v-else class="ri-checkbox-blank-line"></i>
          {{ to.label || to }}
        </b-button>
      </div>

      <!-- Input Type Textarea  -->
      <textarea
        :disabled="item.disabled"
        v-else-if="item.type === 'textarea'"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :input-attr="{ autocomplete: 'off' }"
        class="form-control"
        :class="item.validation.length > 0 ? classes : ''"
        :placeholder="item.placeholder || null"
        :rows="item.rows || 5"
      ></textarea>

      <!-- Input Type File  -->
      <div v-else-if="item.type === 'file'" class=" d-flex align-items-center">
        <div v-if="item.hasOwnProperty('option') && item.option.multiple">
          <multi-upload
            v-on="item.event"
            :error="errors"
            :classes="item.validation.length === 0 ? {} : classes"
            :placeholder="item.placeholder"
            :attr="item.attr"
            v-model="tmp_value"
            :columnId="item.option.columnId"
            @input="$emit('input', $event)"
          />
        </div>

        <div v-else>
          <single-upload
            v-on="item.event"
            :hideLabel="item.option && item.option.hideLabel"
            :hideDesc="item.option && item.option.hideDesc"
            :isButton="item.option && item.option.isButton"
            v-model="tmp_value"
            :error="errors"
            :classes="item.validation.length === 0 ? {} : classes"
            :placeholder="item.placeholder"
            :attr="item.attr"
            @input="$emit('input', $event)"
            @onError="$emit('onError', $event)"
          />
        </div>
      </div>

      <!-- Input Type Map  -->
      <div v-else-if="item.type === 'map'">
        <g-maps
          :classes="item.validation.length > 0 ? classes : {}"
          :errors="errors"
          @inputChange="updateCoordinates($event)"
          :zoomNum="10"
          :type="'input'"
          :placeholder="item.placeholder"
          :sendData="{
            formatted_address: item.option.formated_address,
            lat: item.option.lat,
            lng: item.option.lng
          }"
        >
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </g-maps>
        <!-- <div style="height: 45px"></div> -->
      </div>

      <!-- Input Type Map  -->
      <div v-else-if="item.type === 'coordinates'">
        <b-row>
          <b-col>
            <input
              :readonly="item.readonly ? true : false"
              v-bind:value="value"
              v-bind="item.attr"
              v-on:input="$emit('input', $event.target.value)"
              :type="item.type"
              class="form-control"
              :class="[
                item.validation.length > 0 ? classes : '',
                item.suffix || item.prefix ? 'col' : '',
                item.ic
              ]"
              :placeholder="
                item.placeholder
                  ? item.placeholder
                  : 'Ketikkan ' + (item.label || '') + ' disini...'
              "
            />
          </b-col>
          <b-col>
            <b-button variant="info" size="sm" v-b-modal="'coordinates-map-modal'">
              <i class="ri-map-pin-line"></i>
              Map
            </b-button>
            <b-modal id="coordinates-map-modal" @shown="initCoordinatesMap()" size="xl"
              :title="item.label || item.labelButton || 'Map'"
              hide-footer
            >
              <template #default="{ close }">
                <b-row>
                  <b-col cols="10">
                    <input
                      :readonly="true"
                      v-bind:value="tmp_value"
                      v-bind="item.attr"
                      v-on:input="$emit('input', $event.target.value)"
                      :type="item.type"
                      class="form-control mb-5"
                      :class="[
                        item.validation.length > 0 ? classes : '',
                        item.suffix || item.prefix ? 'col' : '',
                        item.ic
                      ]"
                      :placeholder="
                        item.placeholder
                          ? item.placeholder
                          : 'Ketikkan ' + (item.label || '') + ' disini...'
                      "
                    />
                  </b-col>
                  <b-col cols="2">
                    <b-button variant="info" @click="close()">Simpan</b-button>
                  </b-col>
                </b-row>
                <div id="map"
                  style="width: 100%;height: 500px;border-radius: 10px"
                ></div>
              </template>
            </b-modal>
          </b-col>
        </b-row>
      </div>

      <!-- Scan Barcode -->
      <div v-else-if="item.type === 'scan-barcode'">
        <b-modal :id="`scan-barcode-modal-${item.scanKey || 0}`" :title="item.label || item.labelButton" hide-footer>
          <qrcode-stream v-if="!tmp_value" :track="paintOutline" @detect="onDetectScanBarcode"></qrcode-stream>
          <b-button
            v-else
            variant="warning"
            :disabled="!tmp_value"
            @click="tmp_value = null"
            block
          >
            <i class="ri-qr-scan-2-line"></i>
            Scan Ulang
          </b-button>
          <input
            v-model="tmp_value"
            type="text"
            class="form-control my-5"
            placeholder="Scanned data..."
          />
          <div class="d-flex align-items-center justify-content-center">
            <b-button
              variant="primary"
              :disabled="!tmp_value"
              @click="saveScanBarcode()"
            >
              <i class="ri-checkbox-line"></i>
              Simpan
            </b-button>
          </div>
        </b-modal>
        <a
          v-if="item.btnType == 'circle'"
          :disabled="item.disabled ? true : false"
          v-b-modal="`scan-barcode-modal-${item.scanKey || 0}`"
          class="btn btn-info btn-icon btn-circle"
          v-b-tooltip.top="item.btnTooltip || null"
        >
            <i class="ri-qr-scan-2-line p-0"></i>
        </a>
        <b-button
            v-else
            v-b-modal="`scan-barcode-modal-${item.scanKey || 0}`"
            :disabled="item.disabled ? true : false"
            variant="info"
        >
            <i class="ri-qr-scan-2-line"></i>
            {{ item.labelButton || 'Scan Barcode' }}
        </b-button>
      </div>

      <!-- Input Type Lookup  -->
      <lookup-input
        v-else
        :class="item.classItem"
        :title="item.label"
        :defaultCaption="item.defaultCaption"
        v-model="tmp_value"
        v-on:input="$emit('input', $event)"
        :endpoint="item.api"
        :pointer="item.pointer"
        :param="item.param"
        :isObject="item.isObject"
        :placeholder="item.placeholder || null"
        :classes="item.validation.length > 0 ? classes : {}"
        :errors="errors"
        :multiple="item.type == 'lookup-checkbox' ? true : false"
        :disabled="item.disabled || false"
        :wrapperClass="item.wrapperClass || ''"
        :listApi="item.listApi || false"
      />

      <label class="col-auto col-form-label" v-if="item.suffix">
        {{ item.suffix }}
      </label>

      <div class="invalid-feedback">{{ errors[0] }}</div>
    </ValidationProvider>
  </div>
</template>

<script>
import _config from "@/config.js";
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "minimalize-input",
  components: {
      QrcodeStream
  },
  props: {
    item: { type: Object, required: true },
    value: { required: false },
    disabled: { type: Boolean, required: false }
  },
  data() {
    return {
      defaultType: [
        "text",
        "email",
        "hidden",
        "password",
        "tel",
        "url",
        "color"
      ],
      dateType: ["date", "datetime", "year", "month", "time", "week"],
      mapType: ["map"],
      numberType: ["number", "money"],
      tmp_value: null,
      tmp_option: [],
      uploadLimitExceed: false,

      // fake
      location: {},
      coords: {
        lat: -7.031947468915877,
        lng: 110.49704882054397
      },
      markers: [
        {
          position: {
            lat: -7.031947468915877,
            lng: 110.49704882054397
          }
        }
      ],

      // coordinates tmp data
      coordinateMapOptions: {
        container: "map",
        style: _config.mapbox.mapStyle,
        style: "mapbox://styles/mapbox/streets-v12?optimize=true",
        projection: 'mercator',
        zoom: 1.5,
        center: [],
        location: {lng: '', lat: ''},
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(to) {
        if (!this.defaultType.includes(this.item.type)) this.tmp_value = to;
      }
    },
    tmp_value(val) {
      this.$emit('change', val)
    },
    'coordinateMapOptions.location': {
      handler(val) {
        if (val) {
          this.tmp_value = `${val.lng}, ${val.lat}`
          this.$emit('input', this.tmp_value)
        }
      }
    }
  },
  beforeMount() {
    if (!this.defaultType.includes(this.item.type)) this.tmp_value = this.value;
    if (["select","select-button","checkbox-button"].includes(this.item.type)) {
      if (this.item.api) this.getDataOption(this.item.api, this.item.pointer);
      else this.tmp_option = this.item.optionList;
    }

    if (this.item.type === "file") {
      if (this.item.hasOwnProperty("option") && this.item.option.multiple) {
        console.log("masuk else set valua array");
        this.tmp_value = [];
        console.log(this.tmp_value);
      } else {
        this.tmp_value = {};
      }
    }
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   map.panTo({ lat: 1.38, lng: 103.8 })
    // })
  },
  methods: {
    formatDate(type) {
      let _format;
      switch (type) {
        case "date":
        case "date-range":
          _format = "YYYY-MM-DD";
          break;
        case "datetime":
        case "datetime-range":
          _format = "YYYY-MM-DD HH:mm:ss";
          break;
        case "year":
        case "year-range":
          _format = "YYYY-MM-DD";
          break;
        case "month":
        case "month-range":
          _format = "YYYY-MM-DD";
          break;
        case "time":
        case "time-range":
          _format = "HH:mm:ss";
          break;
        case "week":
        case "week-range":
          _format = "DD";
          break;
      }
      return _format;
    },
    getDataOption(api, pointer) {
      let filter = {
        limit: 1000
      };
      if (this.item.param) filter = { ...filter, ...this.item.param };
      this.$_api.dataset(api, filter).then(res => {
        if (res.data instanceof Array) {
          this.tmp_option = res.data.map(function(x) {
            return { label: x[pointer.label], code: x[pointer.code] };
          });
        } else {
          this.tmp_option = res.data.data.map(function(x) {
            return { label: x[pointer.label], code: x[pointer.code] };
          });
        }
      });
    },
    handleFile(e) {
      let limit = this.item.limit || 5;
      if ((e.target.files[0].size / 1000000).toFixed(2) < limit) {
        this.uploadLimitExceed = false;
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        this.$_api
          .fileUpload(file, event => {
            this.tmp_value = file;
            this.uploadPercentage = Math.round(
              (100 * event.loaded) / event.total
            );
          })
          .then(res => {
            this.$emit("input", res.data.file);
            e.target.value = null;
          })
          .catch(err => {
            this.$emit("input", null);
            e.target.value = null;
            console.log(err);
          });
      } else this.uploadLimitExceed = true;
    },
    initCoordinatesMap: async function () {
      console.log('initCoordinatesMap')
      console.log(window.innerWidth);
      let mapOptions = this.coordinateMapOptions
      let existingData = this.value
      let items = this.item.mapOptions || {}
      const coordinatesPattern = /^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/;
      const isValidCoordinates = coordinatesPattern.test(existingData);
      if (existingData && isValidCoordinates) {
          const lng = existingData.split(', ')[0]
          const lat = existingData.split(', ')[1]
          mapOptions.center = [lng, lat]
      } else mapOptions.center = [107.447975, -7.083062]
      mapboxgl.accessToken = _config.mapbox.token;
        const map = new mapboxgl.Map({
          container: mapOptions.container,
          style: mapOptions.style,
          projection: mapOptions.projection,
          zoom: mapOptions.zoom,
          center: mapOptions.center,
        });
        await map.on("load", async function () {
            map.resize();
            // add search
            if (items.search || false) {
              map.addControl(new MapboxGeocoder({
                accessToken: _config.mapbox.token,
                // Limit seach results to Indonesia.
                countries: 'id',
                language: 'id-ID',
                marker: false,
                placeholder: items.searchPlaceholder || 'Search ...',

                // Use a bounding box to further limit results
                // to the geographic bounds representing the
                // region of New South Wales.
                bbox: [105.172119,-8.971897,115.762939,-5.648786],

                // Apply a client-side filter to further limit results
                // to those strictly within the New South Wales region.
                // filter: function (item) {
                //   // returns true if item contains New South Wales region
                //   return item.context.some((i) => {
                //   // ID is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
                //   // This example searches for the `region`
                //   // named `New South Wales`.
                //   return (
                //   i.id.split('.').shift() === 'region' &&
                //   i.text === 'New South Wales'
                //   );
                //   });
                // },
                mapboxgl: mapboxgl
              }))
            }
            // add fullscreen function
            if (items.fullscreen || false) await map.addControl(new mapboxgl.FullscreenControl());
            // Add zoom and rotation controls to the map.
            if (items.control || false) await map.addControl(new mapboxgl.NavigationControl());
            // Add geolocate control to the map.
            if (items.findUserLocation || false) {
              // set geolocate for get current user location
              const geolocate = new mapboxgl.GeolocateControl({
                  positionOptions: {
                      enableHighAccuracy: true
                  },
                  // When active the map will receive updates to the device's location as it changes.
                  trackUserLocation: true,
                  // Draw an arrow next to the location dot to indicate which direction the device is heading.
                  showUserHeading: true
              })
              await map.addControl(geolocate);
              // geolocate event
              geolocate.on('trackuserlocationstart', () => {
                  // mapOptions.loading.show = true
                  // mapOptions.loading.text = 'Mencari lokasi anda...'
              });
              geolocate.on('geolocate', async function (currentPosition) {
                  const lngLatCP = [currentPosition.coords.longitude, currentPosition.coords.latitude]
                  await marker.setLngLat(lngLatCP)
                  await showMarkerLngLat()
                  // mapOptions.loading.show = false
                  // mapOptions.loading.text = 'Loading...'
              });
            }
            mapOptions.location = {lng: mapOptions.center[0], lat: mapOptions.center[1]}
            // set marker
            const marker = new mapboxgl.Marker({
                draggable: true
            })
            .setLngLat(mapOptions.center)
            .addTo(map);
            // Map on click
            map.on('click', (e) => {
                marker.setLngLat(e.lngLat)
                showMarkerLngLat()
            })
            // show coordinates marker
            // const coordinates = document.getElementById('coordinates');
            function showMarkerLngLat() {
                const lngLat = marker.getLngLat();
                mapOptions.location = lngLat
                // coordinates.style.display = 'block';
                // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
            }
            marker.on('drag', showMarkerLngLat);
            if (existingData) {
                await map.flyTo({
                    center: mapOptions.center,
                    zoom: 15,
                    duration: 4 * 1000
                })
            }
        });
        await map.on('style.load', () => {
            // map.setFog({});
            map.resize();
        });

        this.$refs.map = map;
    },
    revertNumberType(value) {
      const numberPattern = /\d+/g;
      if (value) {
        this.$emit(
          "input",
          Number(
            value[0]
              .toString()
              .match(numberPattern)
              .join("")
          )
        );
      } else this.$emit("input", 0);
    },
    updateCoordinates(location) {
      this.$emit("onChange", location);
    },
    paintOutline(detectedCodes, ctx) {
        for (const detectedCode of detectedCodes) {
            const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

            ctx.strokeStyle = 'green'

            ctx.beginPath()
            ctx.moveTo(firstPoint.x, firstPoint.y)
            for (const { x, y } of otherPoints) {
                ctx.lineTo(x, y)
            }
            ctx.lineTo(firstPoint.x, firstPoint.y)
            ctx.closePath()
            ctx.stroke()

            const { boundingBox, rawValue } = detectedCode

            const centerX = boundingBox.x + boundingBox.width / 2
            const centerY = boundingBox.y + boundingBox.height / 2

            const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
            // console.log(boundingBox.width, ctx.canvas.width)

            ctx.font = `bold ${fontSize}px sans-serif`
            ctx.textAlign = 'center'

            ctx.lineWidth = 3
            ctx.strokeStyle = '#35495e'
            ctx.strokeText(detectedCode.rawValue, centerX, centerY)

            ctx.fillStyle = '#5cb984'
            ctx.fillText(rawValue, centerX, centerY)
        }
    },
    async onDetectScanBarcode(detectedCodes) {
        console.log(`detectedCodes `, detectedCodes)
        const barcode = await detectedCodes.then(res => {return res.content})
        console.log(`scanned camera: `, barcode)
        if (barcode) {
          this.tmp_value = barcode
        }
    },
    saveScanBarcode() {
        this.$emit('input', this.tmp_value)
        this.$bvModal.hide(`scan-barcode-modal-${this.item.scanKey || 0}`)
        this.tmp_value = null
    },
    onClickCheckboxButton(val) {
      const value = val.code || val
      const findExist = this.tmp_value.findIndex(v => v == value)
      console.log('findExist',findExist)
      if (findExist > -1) this.tmp_value.splice(findExist, 1)
      else this.tmp_value.push(value)

      console.log(this.tmp_value)
      this.$emit('input', this.tmp_value)
    }
  }
};
</script>

<style scoped>
/* .mx-datepicker { */
/* display: block !important; */
/* } */
</style>
