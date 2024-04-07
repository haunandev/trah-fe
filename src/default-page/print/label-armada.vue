<template>
    <div>
        <div id="label-transport-wrapper" v-if="loadingLine && loadingLine.detail_allocation_transportation.length">
            <div 
                v-for="(transport, transportIndex) in loadingLine.detail_allocation_transportation" :key="`seeds-label-${transportIndex}`"
                style="max-width: calc(96mm * 1.55);
                    height: calc(66mm * 1.55);
                    display: inline-block;
                    border: 2px solid black;
                    margin: 3.5mm;
                "
            >
                <!-- row 1 -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    height: 37.5%;
                    padding: 5px;
                    gap: 5px;
                ">
                    <div style="width: 62.5%;display: flex;align-items: stretch;justify-content: stretch;flex-direction: column;">
                        <h1 style="margin-bottom: 0px;border: 2px solid black;flex: 1;padding: 5px;font-weight: bold;font-size: 40px;display: flex;align-items: center;justify-content: center;text-align: center;">
                            {{ transport.vehicle ? transport.vehicle.nomer_plat : '' }}
                        </h1>
                    </div>
                    <div style="text-align: center; border: 2px solid black;width: 37.5%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <h3 style="font-weight: bold;">ID Transport</h3>
                        <h1 style="font-size: 50px;font-weight: bold;">{{ transport.id }}</h1>
                    </div>
                </div>
                <!-- row 2 -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    height: 62.5%;
                    padding: 5px;
                    padding-top: 0px;
                    gap: 5px;
                    overflow: hidden;
                ">
                    <div style="width: 41.6%;overflow: hidden;display: flex;align-items: center;justify-content: center;background-color: red;">
                        <vue-qr :logoSrc="$_config.logo.black" :text="`${transport.id}`" :size="250"></vue-qr>
                    </div>
                    <div style="flex: 1;">
                        <h1 style="font-weight: bold; border: 2px solid black;padding: 5px;">{{ transport.driver ? transport.driver.driver_name : '' }}</h1>
                        <table class="table table-detail mb-0" style="font-size: 20px;font-weight: bold;">
                            <tbody>
                                <tr>
                                    <td class="nowrap-table" style="border-top: none !important;">Tanggal</td>
                                    <td class="nowrap-table" style="border-top: none !important;">&emsp;:&nbsp;</td>
                                    <td style="border-top: none !important;">{{ loadingLine.distribution_date | parse('longDate') }}</td>
                                </tr>
                                <tr>
                                    <td class="nowrap-table">FF</td>
                                    <td class="nowrap-table">&emsp;:&nbsp;</td>
                                    <td style="font-size: 15px;">{{ loadingLine.ff_name }}</td>
                                </tr>
                                <tr>
                                    <td class="nowrap-table">Lokasi</td>
                                    <td class="nowrap-table">&emsp;:&nbsp;</td>
                                    <td style="font-size: 15px;">{{ loadingLine.location_distribution }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p style="page-break-after: always"></p>
            </div>
        </div>
        <b-card v-else
            title="Label Bibit"
        >
            <h1>Data tidak ditemukan!</h1>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'NurseryManagementLabelSeed',

    data: () => ({
        loadingLine: null,
    }),

    mounted: async function () {
        await this.initData()
    },

    methods: {
        initData: async function () {
            const loading = this.$_alert.loading('Memuat data ...')
            try {
                const route = this.$route.query
                if (!route.loading_line_id) {
                    loading.close()
                    setTimeout(() => {
                        this.$_alert.error(null,'Gagal','Data tidak ditemukan!')
                    }, 100);
                    return;
                }
                const loadingLine = await this.$_api.single('loading_line', null, route.loading_line_id).then(res => res.data)
                for (const[key, val] of Object.entries(loadingLine.detail_allocation_transportation)) {
                    val.vehicle = await this.$_api.single('master_vehicle', null, val.vehicle_id).then(res => res.data)
                    val.driver = await this.$_api.single('master_vendor_driver', null, val.driver_id).then(res => res.data)
                }
                this.loadingLine = loadingLine
                setTimeout(() => {
                    window.print()
                }, 500);
            } catch (err) {
                console.log('initData() error',err)
                this.$_alert.error(err)
            } finally {
                loading.close()
            }
        }
    },
};
</script>
<style lang="css">
@media print {
        @page {
            size: landscape!important;
        }
}
</style>