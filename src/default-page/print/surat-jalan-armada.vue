<template>
    <div style="background-color: white;">
        <b-button block variant="outline-danger" class="hide-print" @click="exportPDF()">Export PDF</b-button>
        <div id="surat-jalan-armada-wrapper" v-if="detailData && selectedTransportation"
            style="margin-right: 5px">
            <div style="display: flex;justify-content: center;background-color: white;">
                <div style="margin-right: 10px;">
                    <img :src="$_config.logo.black2" 
                        style="height: 65px;"
                    />
                </div>
                <div style="display: flex;flex-direction: column;justify-content: center;">
                    <h1 style="font-weight: bold;">Surat Jalan Armada</h1>
                    <h1 style="font-weight: bold;">Distribusi</h1>
                </div>
            </div>
            <b-row>
                <b-col cols="8">
                    <table-detail style="font-weight: bold"
                        :items="[{
                            label: 'Tanggal Distribusi',
                            value: detailData.distribution_date,
                            transform: 'longDate'
                        },{
                            label: 'Nomor Polisi Kendaraan',
                            value: selectedTransportation.vehicle ? (selectedTransportation.vehicle.nomer_plat || '') : ''
                        },{
                            label: 'Alamat Tujuan',
                            value: detailData.location_distribution
                        },{
                            label: 'Sopir',
                            value: selectedTransportation.driver ? `${selectedTransportation.driver.driver_name} / ${selectedTransportation.driver.driver_phone}` : ''
                        },{
                            label: 'Koordinat Distribusi',
                            value: detailData.distribution_coordinates
                        },{
                            label: 'Unit Management',
                            value: `${detailData.mu_name}`
                        },{
                            label: 'FF',
                            value: `${detailData.ff_name}`
                        },{
                            label: 'Lokasi Persemaian',
                            value: `${detailData.rel_location_nursery_id}`
                        }]"
                    ></table-detail>
                </b-col>
                <b-col cols="4">
                    <div v-if="detailData && selectedTransportation">
                        <div 
                            style="width: calc(50mm);
                                height: calc(60mm);
                                display: inline-block;
                                border: 1px solid black;
                            "
                        >
                            <!-- row 1 -->
                            <div style="
                                display: flex;
                                justify-content: space-between;
                                align-items: stretch;
                                height: 20%;
                                padding: 5px;
                                gap: 5px;
                            ">
                                <div style="width: 100%;display: flex;align-items: stretch;justify-content: stretch;flex-direction: column;">
                                    <h1 style="margin-bottom: 0px;border: 1px solid black;flex: 1;padding: 5px;font-weight: bold;font-size: 20px;display: flex;align-items: center;justify-content: center;text-align: center;">
                                        {{ selectedTransportation.vehicle ? selectedTransportation.vehicle.nomer_plat : '' }}
                                    </h1>
                                </div>
                            </div>
                            <!-- row 2 -->
                            <div style="
                                display: flex;
                                justify-content: space-between;
                                align-items: stretch;
                                height: 80%;
                                padding: 5px;
                                padding-top: 0px;
                                gap: 5px;
                                overflow: hidden;
                            ">
                                <div style="width: 100%;overflow: hidden;display: flex;align-items: center;justify-content: center;background-color: red;">
                                    <vue-qr :logoSrc="$_config.logo.black" :text="`${selectedTransportation.id}`" :size="190"></vue-qr>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <h6 class="d-flex align-items-center">
                <i class="ri-file-list-line mr-2" style="font-size: 20px;"></i> Daftar Bibit
            </h6>
            <table
                style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                <thead style="text-align: center;">
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th style="border: 1px solid black;width: 50px;">
                            No
                        </th>
                        <th style="border: 1px solid black;width: 250px;">
                            Jenis Bibit
                        </th>
                        <th style="border: 1px solid black;">
                            Jumlah Label
                        </th>
                        <th style="border: 1px solid black;">
                            Jumlah Bibit
                        </th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(label, labelIndex) in listPerTrees" :key="`table-body-${label.id}`">
                    <!-- <tr v-for="label in labels.sort((a,b) => b.id - a.id)" :key="`table-body-${label.id}`"> 1 -->
                        <td style="border: 1px solid black;text-align: center;">
                            <!-- {{ label.label_code.split('/10_')[0] }} -->
                            {{ labelIndex + 1 }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ label.rel_tree_id }}
                        </td>
                        <td style="border: 1px solid black;text-align: center;">
                            {{ label.total_label }}
                        </td>
                        <td style="border: 1px solid black;text-align: center;">
                            {{ Number(label.amount).toLocaleString("id-ID") }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th colspan="2" style="border: 1px solid black;text-align: center;">
                            Jumlah
                        </th>
                        <th style="border: 1px solid black;text-align: center;">
                            {{ listPerTrees.reduce((acc,val) => {
                                return acc + parseInt(val.total_label)
                            }, 0) }}
                        </th>
                        <th style="border: 1px solid black;text-align: center;">
                            {{ listPerTrees.reduce((acc,val) => {
                                return acc + parseInt(val.amount)
                            }, 0) | parse('concat_bibit') }}
                        </th>
                    </tr>
                </tfoot>
            </table>
            <div v-if="listPupuk.length" class="mt-5">
                <h6 class="d-flex align-items-center">
                    <i class="ri-ink-bottle-line mr-2" style="font-size: 20px;"></i> Daftar POC
                </h6>
                <table
                    style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                    <thead style="text-align: center;">
                        <tr style="background-color: rgb(217, 217, 217);">
                            <th style="border: 1px solid black;width: 150px;">
                                No
                            </th>
                            <th style="border: 1px solid black;">
                                Nama Petani
                            </th>
                            <th style="border: 1px solid black;width: 250px;">
                                Jumlah Pupuk
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="(pupuk, pupukIndex) in listPupuk" :key="`table-body-${pupukIndex}`">
                            <td style="border: 1px solid black;text-align: center;">
                                {{ pupukIndex + 1 }}
                            </td>
                            <td style="border: 1px solid black;">
                                {{ pupuk.farmer_name }}
                            </td>
                            <td style="border: 1px solid black;text-align: center;">
                                {{ pupuk.total_pupuk | parse('concat_pupuk') }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr style="background-color: rgb(217, 217, 217);">
                            <th colspan="2" style="border: 1px solid black;text-align: center;">
                                Jumlah
                            </th>
                            <th style="border: 1px solid black;text-align: center;">
                                {{ listPupuk.reduce((acc,val) => {
                                    return acc + parseInt(val.total_pupuk)
                                }, 0) | parse('concat_pupuk') }}
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div style="display: flex;align-items: stretch;height: 150px;margin-top: 20px;font-weight: bold;page-break-inside: avoid;">
                <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                    <p>Diangkut Oleh,</p>
                    <p style="">( {{ selectedTransportation.driver ? selectedTransportation.driver.driver_name : '' }} )</p>
                </div>
                <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                    <p>Dikirim Oleh,</p>
                    <p style="">( Nusery Coordinator )</p>
                </div>
                <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                    <p>Diterima Oleh,</p>
                    <p style="">( {{ detailData.ff_name }} )</p>
                </div>
                <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                    <p>Diketahui Oleh,</p>
                    <p style="">( Field Coordinator )</p>
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
    name: 'PrintSuratJalanArmaada',

    data: () => ({
        detailData: null,
        selectedTransportation: null,
        labels: [],
        scannedLabel: [],
        listPerTrees: [],
        listPupuk: []
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
                this.detailData = await this.$_api.single('loading_line', null, route.loading_line_id).then(res => res.data)
                if (this.detailData && route.armada_id) {
                    const labels = [] 
                    this.detailData.detail_farmers.map(v => {
                        labels.push(...v.detail_labels)
                    })
                    this.labels = labels
                    const listArmada = this.detailData.detail_allocation_transportation
                    const findArmada = listArmada.find(v => v.id == route.armada_id)
                    if (findArmada) {
                        this.selectedTransportation = findArmada
                        this.selectedTransportation.vehicle = await this.$_api.single('master_vehicle', null, findArmada.vehicle_id).then(res => res.data)
                        this.selectedTransportation.driver = await this.$_api.single('master_vendor_driver', null, findArmada.driver_id).then(res => res.data)
                        this.scannedLabel = labels.filter(v => v.allocation_transportation_id == findArmada.id)
                        this.listTableSuratJalan()
                        this.listPupuk = this.detailData.detail_farmers.filter(v => v.load_pupuk_allocation_transportation_id == findArmada.id)
                        setTimeout(() => {
                            this.exportPDF()
                            // window.print()
                            // window.close()
                        }, 300);
                    }
                }
            } catch (err) {
                console.log('initData() error',err)
                this.$_alert.error(err)
            } finally {
                loading.close()
            }
        },
        exportPDF() {
            var elementHTML = document.querySelector(`#surat-jalan-armada-wrapper`);
            const pdfOption = {
                margin: .2,
                image: { type: 'jpeg', quality: 1 },
                filename: `${this.detailData.program_year} - FF ${this.detailData.ff_name} - Petani ${this.selectedTransportation.vehicle.nomer_plat}.pdf`,
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: {mode: ['css', 'legacy']}
            }
            html2pdf().set(pdfOption).from(elementHTML).save();
        },
        listTableSuratJalan() {
            const listTree = []
            this.scannedLabel.filter(v => v.allocation_transportation_id == this.selectedTransportation.id).map(val => {
                const findTree = listTree.find(v => v.tree_id == val.tree_id)
                if (findTree) {
                    findTree.amount += parseInt(val.amount)
                    findTree.total_label += 1
                } else {
                    listTree.push({
                        ...val,
                        amount: parseInt(val.amount),
                        total_label: 1
                    })
                }
            })
            console.log('listTree',listTree)
            // return this.scannedLabel.filter(v => v.allocation_transportation_id == this.selectedTransportation.id)
            this.listPerTrees = listTree.sort((a,b) => b.amount - a.amount)
        },
    },
};
</script>
<style type="text/css" scoped>
    @media print {
        .hide-print {
            visibility: hidden;
        }
    }
   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
</style>