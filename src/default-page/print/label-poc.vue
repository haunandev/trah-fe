<template>
    <div>
        <div id="label-poc-wrapper" v-if="loadingLine && farmers.length">
            <div 
                style="width: 15.8cm;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;"
            >
                <div v-for="(farmer, farmerIndex) in farmers" :key="`label-poc-farmer-${farmerIndex}`"
                    style="width: 46.9%;
                            height: 2.75cm;
                            border: 1px solid black;
                            margin: 0.115cm;
                            display: flex;
                            align-items: center;
                            margin-top: 15px;
                            margin-left: 10px;"
                >
                    <img 
                        :src="$_config.logo.black"
                        style="
                            height: 90%;
                            margin-right:0.225cm;
                            margin-left: 0.225cm;"
                    />
                    <div style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;">
                        <h3 class="mb-0" style="font-weight: bold;">
                            {{ farmer.farmer_name }}
                        </h3>
                        <h5 v-if="loadingLine.status != 2" class="mb-0" style="font-weight: bold;">
                            FF {{ loadingLine.ff_name }}
                        </h5>
                        <p class="mb-0" style="font-weight: bold;">Pupuk Organik Cair</p>
                        <h2 class="mb-0" style="font-weight: bold;">
                            {{ farmer.total_pupuk | parse('concat_pupuk') }}
                        </h2>
                    </div>
                    <p v-if="farmerIndex % 2 == 1" style="page-break-after: always"></p>
                </div>
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
    name: 'NurseryManagementLabelPoc',

    data: () => ({
        loadingLine: null,
        farmers: null,
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
                    this.farmers = listFarmers
                    setTimeout(() => {
                        window.print()
                    }, 300);
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
<style lang="scss">
@media print {
        @page {
            size: landscape!important;
        }
}
</style>