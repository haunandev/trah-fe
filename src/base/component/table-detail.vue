<template>
    <div class="table-responsive">
        <b-modal
            id="zoom-modal-table-detail"
            v-if="zoomImg"
            title="Preview Gambar"
            hide-footer
            centered
            size="lg"
            @hidden="zoomImg = null"
        >
            <img
                v-img-fb="zoomImg"
                alt="img-zoom"
                class="img-fluid rounded mx-auto d-block"
            />
        </b-modal>
        <div style="position: relative;">
            <div
                v-if="loading || isLoading"
                class="card-img-overlay d-flex align-items-center justify-content-center flex-column"
                style="background-color: #ffffffaa;z-index: 2;"
            >
                <div class="d-flex align-items-center justify-content-center">
                <div class="mr-2 text-muted">{{ $t("global.loading") }} ...</div>
                <div class="spinner spinner-primary mr-10"></div>
                </div>
            </div>
            <table class="table table-detail mb-0">
                <tbody>
                    <tr v-for="(item, itemIndex) in (items || itemsField)" :key="`detail-table-item-${itemIndex}`">
                        <td class="nowrap-table">
                            <span v-b-tooltip.hover :title="item.tooltip || item.tooltipLabel">
                                {{ item.label }}
                            </span>
                        </td>
                        <td class="nowrap-table">&emsp;:&nbsp;</td>
                        <td class=""
                        >
                            <span v-b-tooltip.hover :title="item.tooltip || item.tooltipValue">
                                <span v-if="item.type == 'badge'">
                                    <span :class="`badge badge-${item.badgeColor || (item.value ? 'primary' : 'warning')}`">
                                        {{ item.value | parse(item.transform) }}
                                    </span>
                                </span>
                                <span v-else-if="item.type && item.type.includes('list')">
                                    <ol v-if="item.type.includes('ol')">
                                        <li v-for="val in item.value" :key="`tableDetail-list-ol-${item.type}-${val}`">
                                            {{ val }}
                                        </li>
                                    </ol>
                                    <ul v-else>
                                        <li v-for="val in item.value" :key="`tableDetail-list-ul-${item.type}-${val}`">
                                            {{ val }}
                                        </li>
                                    </ul>
                                </span>
                                <span v-else-if="item.type == 'image'">
                                    <img
                                        v-if="item.value"
                                        class="img-table"
                                        v-img-fb="item.value.url"
                                        :alt="item.label"
                                        @click="zoomImage(item.value.url)"
                                      />
                                </span>
                                <span v-else-if="item.type == 'pdf'">
                                    <b-button
                                        variant="light-primary"
                                        v-b-tooltip.hover="`Buka file di halaman lain`"
                                        @click="openUrl(item.value.url)"
                                    >
                                        <i class="ri-link"></i>
                                        Buka File
                                    </b-button>
                                </span>
                                <span v-else-if="item.type == 'prosen'">
                                    <b-progress :max="100" :variant="progressVariant(item.value)" show-progress animated style="width: 100%;">
                                        <b-progress-bar :value="item.value">
                                            <span>
                                                <strong>{{ item.value | parse(item.transform) }}</strong>
                                            </span>
                                        </b-progress-bar>
                                    </b-progress>
                                </span>
                                <span v-else-if="item.type == 'table'">
                                    <b-table
                                        :items="item.value"
                                        :fields="item.fields"
                                        empty-text="Data tidak ditemukan."
                                    >
                                        <!-- index -->
                                        <template #cell(index)="{index}">
                                            {{ index + 1 }}
                                        </template>
                                        <!-- amount -->
                                        <template #cell(amount)="{item, field}">
                                            {{ item.amount | parse(field.transform) }}
                                        </template>
                                    </b-table>
                                </span>
                                <span v-else-if="item.type == 'coordinate'">
                                    {{ separateCoordinate(item.value) }}
                                    <button type="button" class="btn btn-light-primary btn-sm ml-1" @click="openGoogleMap(item)">
                                        <i class="ri-map-pin-line"></i>
                                        <span class="d-none d-lg-inline">
                                            Open Google
                                        </span>
                                        Map
                                    </button>
                                </span>
                                <span v-else-if="item.transform">
                                    {{ item.value | parse(item.transform) }}
                                </span>
                                <span v-else v-html="item.value"></span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NurseryManagementTableDetail',
    props: {
        items: {
            type: Array,
            default: null
        },
        api: {
            type: Object,
            default: null
        },
        fields: {
            type: Array,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        zoomImg: null,
        isLoading: false,
        itemsField: []
    }),

    mounted() {
        if (this.api) {
            this.getData(this.api)
        }
    },

    methods: {
        zoomImage(url) {
            this.zoomImg = url
            this.$nextTick(function() {
                this.$bvModal.show("zoom-modal-table-detail");
            });
        },
        getData: async function (config) {
            const loading = this.$_alert.loading()
            try {
                this.isLoading = true
                this.itemsField = []
                let data;
                if (config.method == 'single') {
                    data = await this.$_api[config.method](config.url, null, config.id).then(res => res.data)
                } else {
                    data = await this.$_api[config.method || 'get'](config.url, (config.param || {})).then(res => res.data)
                    if (data.length) data = data[0]
                }
                if (data) {
                    this.fields ? this.fields.length ? this.fields.forEach(val => {
                        const item = {
                            label: val.label,
                            value: data[val.key]
                        }
                        if (val.transform) item.transform = val.transform
                        if (val.type) item.type = val.type
                        this.itemsField.push(item)
                    }) : null : null
                }
            } catch (err) {
                console.log('table-detail getData() error', err)
                this.$_alert.error(err)
            } finally {
                this.isLoading = false
                loading.close()
            }
        },
        openUrl(url) {
            window.open(url)
        },
        openGoogleMap(item) {
            const coordinates = item.value
            const fromCoordinates = item.fromCoordinates || ''
            const lat = this.$_sys.getLatLongFromCoordinates('latitude', coordinates)
            const lng = this.$_sys.getLatLongFromCoordinates('longitude', coordinates)
            let url = `https://maps.google.com/?q=${lat},${lng}`
            if (fromCoordinates) {
                const lat2 = this.$_sys.getLatLongFromCoordinates('latitude', fromCoordinates)
                const lng2 = this.$_sys.getLatLongFromCoordinates('longitude', fromCoordinates)
                let urlParam = new URLSearchParams({
                    api: 1,
                    origin: `${lat2},${lng2}`,
                    destination: `${lat},${lng}`,
                    travelmode: 'driving'
                })
                url = `https://www.google.com/maps/dir/?${urlParam}`
            }
            window.open(url)
        },
        progressVariant(val) {
            const progress = parseInt(val)
            if (progress < 50) return 'danger'
            else if (progress < 75) return 'warning'
            else if (progress <= 100) return 'primary'
        },
        separateCoordinate(latLng) {
            const coordinatesPattern = /^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/;
            if (coordinatesPattern.test(latLng)) {
                const lat = this.$_sys.getLatLongFromCoordinates('latitude', latLng)
                const lng = this.$_sys.getLatLongFromCoordinates('longitude', latLng)
                return `Lng: ${lng}, Lat: ${lat}`
            } return '-'
        }
    },
};
</script>
<style scoped>
    .table-detail tr:first-child td {
        border-top: none !important;
    }
    .img-table {
        height: 150px;
        width: 150px;
        border-radius: 8px;
        object-fit: cover;
        cursor: pointer;
        margin-right: 1rem;
    }
</style>