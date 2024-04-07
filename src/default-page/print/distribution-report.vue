<template>
    <div style="background-color: white;">
        <b-button block variant="outline-danger" class="hide-print" @click="exportPDF()">Export PDF</b-button>
        <div id="distribution-report-export-wrapper" v-if="detailData && selectedTransportation" 
            style="margin-right: 5px">
            <div style="display: flex;justify-content: center;background-color: white;">
                <div style="margin-right: 10px;">
                    <img :src="$_config.logo.black2" 
                        style="height: 65px;"
                    />
                </div>
                <div style="display: flex;flex-direction: column;justify-content: center;">
                    <h1 style="font-weight: bold;">Report Distribusi</h1>
                </div>
            </div>
            <!-- Table Detail General -->
            <!-- <b-row>
                <b-col cols="6"> -->
                    <table-detail 
                        style="font-weight: bold"
                        :items="[{
                            label: 'Tanggal Distribusi',
                            value: detailData.distribution_date,
                            transform: 'longDate'
                        },{
                            label: 'Lokasi Persemaian',
                            value: `${detailData.rel_location_nursery_id}`
                        },{
                            label: 'Unit Management',
                            value: `${detailData.mu_name}`
                        },{
                            label: 'Field Facilitator',
                            value: `${detailData.ff_name}`
                        },{
                            label: 'Alamat Tujuan',
                            value: detailData.location_distribution
                        },{
                            label: 'Koordinat Distribusi',
                            value: detailData.distribution_coordinates
                        },{
                            label: 'Kendaraan',
                            value: selectedTransportation.vehicle ? (selectedTransportation.vehicle.name_vehicle || '') : ''
                        },{
                            label: 'Nomor Polisi Kendaraan',
                            value: selectedTransportation.vehicle ? (selectedTransportation.vehicle.nomer_plat || '') : ''
                        },
                        // {
                        //     label: 'Foto Kendaraan',
                        //     value: selectedTransportation.vehicle ? (selectedTransportation.vehicle.file_vehicle || '') : '',
                        //     type: 'image'
                        // },
                        {
                            label: 'Sopir',
                            value: selectedTransportation.driver ? `${selectedTransportation.driver.driver_name} / ${selectedTransportation.driver.driver_phone}` : ''
                        },
                        // {
                        //     label: 'Foto Sopir',
                        //     value: selectedTransportation.driver ? (selectedTransportation.driver.img_driver_photo || '') : '',
                        //     type: 'image'
                        // },
                        {
                            label: 'Jumlah Petani',
                            value: farmers.length,
                            transform: 'concat_petani'
                        },{
                            label: 'Bibit Dimuat',
                            value: listPerTrees.reduce((acc,val) => {
                                    return acc + parseInt(val.total_load)
                                }, 0),
                            transform: 'concat_bibit'
                        },
                        // {
                        //     label: 'Bibit Rusak',
                        //     value: listPerTrees.reduce((acc,val) => {
                        //             return acc + parseInt(val.total_damaged)
                        //         }, 0),
                        //     transform: 'concat_bibit'
                        // },{
                        //     label: 'Bibit Hilang',
                        //     value: listPerTrees.reduce((acc,val) => {
                        //             return acc + parseInt(val.total_missing)
                        //         }, 0),
                        //     transform: 'concat_bibit'
                        // },{
                        //     label: 'Bibit Diterima',
                        //     value: listPerTrees.reduce((acc,val) => {
                        //             return acc + parseInt(val.total_received)
                        //         }, 0),
                        //     transform: 'concat_bibit'
                        // },
                        {
                            label: 'Pupuk Dimuat',
                            value: listPupuk.reduce((acc,val) => {
                                    return acc + parseInt(val.total_pupuk)
                                }, 0),
                            transform: 'concat_pupuk'
                        },{
                            label: 'Mobil Masuk',
                            value: selectedTransportation.scanned_time,
                            transform: 'longDateTime'
                        },{
                            label: 'Mulai Load Bibit',
                            value: selectedTransportation.load_start_time,
                            transform: 'longDateTime'
                        },{
                            label: 'Selesai Load Bibit',
                            value: selectedTransportation.load_after_time,
                            transform: 'longDateTime'
                        },{
                            label: 'Berangkat',
                            value: selectedTransportation.shipping_date,
                            transform: 'longDateTime'
                        },{
                            label: 'Sampai',
                            value: selectedTransportation.deliver_date,
                            transform: 'longDateTime'
                        }]"
                    ></table-detail>
                <!-- </b-col> -->
                <!-- <b-col cols="6">
                    <table-detail 
                        style="font-weight: bold"
                        :items="[]"
                    ></table-detail>
                </b-col> -->
            <!-- </b-row> -->
            <!-- Daftar Bibit -->
            <h6 class="d-flex align-items-center">
                <i class="ri-plant-line mr-2" style="font-size: 20px;"></i> Daftar Bibit
            </h6>
            <table
                style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                <thead style="text-align: center;">
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th style="border: 1px solid black;width: 150px;">
                            No
                        </th>
                        <th style="border: 1px solid black;width: 250px;">
                            Jenis Bibit
                        </th>
                        <th style="border: 1px solid black;width: 250px;">
                            Dimuat
                        </th>
                        <!-- <th style="border: 1px solid black;width: 250px;">
                            Diterima
                        </th> -->
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
                            {{ Number(label.total_load).toLocaleString("id-ID") }}
                        </td>
                        <!-- <td style="border: 1px solid black;text-align: center;">
                            {{ Number(label.total_received).toLocaleString("id-ID") }}
                        </td> -->
                    </tr>
                </tbody>
                <tfoot>
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th colspan="2" style="border: 1px solid black;text-align: center;">
                            Jumlah
                        </th>
                        <th style="border: 1px solid black;text-align: center;">
                            {{ listPerTrees.reduce((acc,val) => {
                                return acc + parseInt(val.total_load)
                            }, 0) | parse('concat_bibit') }}
                        </th>
                        <!-- <th style="border: 1px solid black;text-align: center;">
                            {{ listPerTrees.reduce((acc,val) => {
                                return acc + parseInt(val.total_received)
                            }, 0) | parse('concat_bibit') }}
                        </th> -->
                    </tr>
                </tfoot>
            </table>
            <!-- Daftar POC -->
            <div class="mt-5">
                <h6 class="d-flex align-items-center">
                    <i class="ri-ink-bottle-line mr-2" style="font-size: 20px;"></i> Daftar POC
                </h6>
                <table
                    v-if="listPupuk.length"
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
                <p v-else style="font-weight: bold;">Kendaraan ini tidak memuat pupuk.</p>
            </div>
            <!-- Detail Bibit Petani -->
            <div class="mt-5">
                <h6 class="d-flex align-items-center">
                    <i class="ri-team-line mr-2" style="font-size: 20px;"></i> Detail Bibit Petani
                </h6>
                <div v-if="farmers.length">
                    <div
                        v-for="(farmer, fIndex) in farmers" :key="`section-farmer-${fIndex}`"
                    >
                        <h5 class="mt-3">{{ fIndex + 1 }}. {{ farmer.farmer_name }}</h5>
                        <table
                            style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                            <thead style="text-align: center;">
                                <tr style="background-color: rgb(217, 217, 217);">
                                    <th style="border: 1px solid black;width: 50px;">
                                        No
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Jenis
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Jumlah
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Dimuat Oleh
                                    </th>
                                    <!-- <th style="border: 1px solid black;">
                                        Diterima
                                    </th> -->
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="(farmerSeed, fsIndex) in farmer.detail_labels" :key="`table-body-farmer-seed-${fsIndex}`">
                                    <td style="border: 1px solid black;text-align: center;">
                                        {{ fsIndex + 1 }}
                                    </td>
                                    <td style="border: 1px solid black;">
                                        {{ farmerSeed.rel_tree_id }}
                                    </td>
                                    <td style="border: 1px solid black;text-align: center;">
                                        {{ farmerSeed.amount | parse('number') }}
                                    </td>
                                    <td style="border: 1px solid black;">
                                        {{ farmerSeed.rel_implementor_load_id }}
                                    </td>
                                    <!-- <td style="border: 1px solid black;text-align: center;">
                                        {{ farmerSeed.total_received | parse('number') }}
                                    </td> -->
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr style="background-color: rgb(217, 217, 217);">
                                    <th colspan="2" style="border: 1px solid black;text-align: center;">
                                        Jumlah
                                    </th>
                                    <th style="border: 1px solid black;text-align: center;">
                                        {{ farmer.detail_labels.reduce((acc,val) => {
                                            return acc + parseInt(val.amount)
                                        }, 0) | parse('concat_bibit') }}
                                    </th>
                                    <th style="border: 1px solid black;text-align: center;"></th>
                                    <!-- <th style="border: 1px solid black;text-align: center;">
                                        {{ farmer.detail_seed_farmers.reduce((acc,val) => {
                                            return acc + parseInt(val.total_received)
                                        }, 0) | parse('concat_bibit') }}
                                    </th> -->
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <p v-else style="font-weight: bold;">Data tidak ditemukan.</p>
            </div>
        </div>
        <b-card v-else
            title="Distribution Report"
        >
            <h1>Data tidak ditemukan!</h1>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'PrintDistributionRepoort',

    data: () => ({
        detailData: null,
        selectedTransportation: null,
        labels: [],
        scannedLabel: [],
        listPerTrees: [],
        listPupuk: [],
        farmers: [],
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
                        this.scannedLabel = labels.filter(v => v.allocation_transportation_id == findArmada.id && v.is_loaded)
                        this.listPupuk = this.detailData.detail_farmers.filter(v => v.load_pupuk_allocation_transportation_id == findArmada.id)

                        // set detail_seed_farmers
                        const listFarmerID =  [...new Set(this.scannedLabel.map(item => item.detail_farmer_id))]
                        console.log('listFarmerID', listFarmerID)
                        this.farmers = this.detailData.detail_farmers.filter(v => listFarmerID.includes(v.id))
                            .map(farmer => {
                                const labelFarmer = this.scannedLabel
                                        .filter(v => v.detail_farmer_id == farmer.id && v.allocation_transportation_id == findArmada.id)
                                return {
                                    ...farmer,
                                    detail_labels: labelFarmer,
                                    total_load: labelFarmer
                                        .reduce((acc, val) => {
                                            return acc + parseInt(val.amount)
                                        }, 0),
                                    total_received: labelFarmer
                                        .filter(v => v.is_distributed)
                                        .reduce((acc, val) => {
                                            return acc + parseInt(val.amount)
                                        }, 0),
                                }
                            })
                        console.log('this.farmers', this.farmers)
                        
                        this.listTableSuratJalan()
                        setTimeout(() => {
                            this.exportPDF()
                            // window.print()
                            // window.close()
                        }, 500);
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
            var elementHTML = document.querySelector(`#distribution-report-export-wrapper`);
            const pdfOption = {
                margin: .2,
                image: { type: 'jpeg', quality: 1 },
                filename: `${this.detailData.program_year} - FF ${this.detailData.ff_name} - NoPlat ${this.selectedTransportation.vehicle.nomer_plat}.pdf`,
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: {mode: ['css', 'legacy']}
            }
            html2pdf().set(pdfOption).from(elementHTML).save();
        },
        listTableSuratJalan() {
            const listTree = []
            this.farmers.map(farmer => {
                farmer.detail_labels.map(val => {
                    const findTree = listTree.find(v => v.tree_id == val.tree_id)
                    if (findTree) {
                        findTree.total_load += parseInt(val.amount)
                        if (val.is_distributed) findTree.total_received += parseInt(val.amount)
                    } else {
                        listTree.push({
                            ...val,
                            total_load: parseInt(val.amount),
                            total_received: val.is_distributed ? parseInt(val.amount) : 0,
                        })
                    }
                })
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