<template>
    <div>
        <div id="label-seed-wrapper" v-if="loadingLine && farmer && labels.length">
            <div
                v-for="(label, labelIndex) in labels" :key="`seeds-label-${labelIndex}`"
            >
                <div 
                    style="width: calc(96mm * 1.55);
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
                            <h3 style="margin-bottom: 0px;font-weight: bold;display: flex;align-items: center;justify-content: space-between;">
                                <span>
                                    <span style="font-size: 24px;">
                                        {{ label.label_code }}
                                    </span>
                                    <!-- <span style="font-size: 27px;">
                                        {{ label.label_code.split('/10_')[0] }}
                                    </span>
                                    {{ label.label_code.slice(-14) }} -->
                                </span>
                                <span>
                                    D-{{ farmer.id }}
                                </span>
                            </h3>
                            <h1 style="margin-bottom: 0px;border: 2px solid black;flex: 1;padding: 5px;font-weight: bold;font-size: 30px;display: flex;align-items: center;justify-content: center;text-align: center;">
                                {{ farmer.farmer_name }}
                            </h1>
                        </div>
                        <div style="text-align: center; border: 2px solid black;width: 37.5%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <h3 style="font-weight: bold;">{{ label.rel_tree_id }}</h3>
                            <h1 style="font-size: 50px;font-weight: bold;">{{ label.amount }}</h1>
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
                        <div style="width: 41.6%;overflow: hidden;position: relative;">
                            <vue-qr :logoSrc="$_config.logo.black" :text="`${label.id}`" :size="230"
                                style="position: absolute;top: 0;left: 50%;transform: translate(-50%,-20px);"
                            ></vue-qr>
                            <h1 style="position: absolute;bottom: -5px;text-align: center;background-color: white;
                                left: 0;right: 0;
                                border: 2px solid black;font-weight: bold;
                            ">{{ label.id }}</h1>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex;align-items: start;justify-content: end;">
                                <h1 style="font-weight: bold; display: inline-block;margin-bottom: 0px;">{{ label.lahan_no.slice(0,10) }}</h1>
                                <h1 style="font-weight: bold; font-size: 30px;border: 2px solid black;margin-left: 5px;padding: 0px 5px;">
                                    {{ label.lahan_no.slice(-3) }}
                                </h1>
                            </div>
                            <h1 v-if="loadingLine.status != 2" style="font-weight: bold; border: 2px solid black;padding: 5px;">FF: {{ loadingLine.ff_name }}</h1>
                            <table class="table table-detail mb-0" style="font-size: 20px;font-weight: bold;">
                                <tbody>
                                    <tr>
                                        <td class="nowrap-table" style="border-top: none !important;">Tanggal</td>
                                        <td class="nowrap-table" style="border-top: none !important;">&emsp;:&nbsp;</td>
                                        <td style="border-top: none !important;">{{ loadingLine.distribution_date | parse('longDate') }}</td>
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
                </div>
                <p v-if="labelIndex + 1 > labels.length " style="page-break-after: always"></p>
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
        farmer: null,
        labels: []
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
                this.loadingLine = await this.$_api.single('loading_line', null, route.loading_line_id).then(res => res.data)
                if (this.loadingLine) {
                    const listFarmers = this.loadingLine.detail_farmers
                    const findFarmer = listFarmers.find(v => v.farmer_no == route.farmer_no)
                    if (findFarmer) {
                        this.farmer = findFarmer
                        const labels = findFarmer.detail_labels
                        this.labels = labels
                            .map(v => {
                                const nom = String(v.label_code.split('/')[0]).padStart(3, '0')
                                return {
                                    ...v,
                                    nom: nom
                                }
                            })
                            .sort((a,b) => {
                                return a.rel_tree_id.localeCompare(b.rel_tree_id) 
                                    || a.lahan_no.localeCompare(b.lahan_no) 
                                    || a.nom.localeCompare(b.nom)
                            })
                        setTimeout(() => {
                            window.print()
                        }, 500);
                    }
                }
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