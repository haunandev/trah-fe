<template>
    <div style="background-color: white;">
        <b-button block variant="outline-danger" class="hide-print" @click="exportPDF()">Export PDF</b-button>
        <div id="distribution-report-export-wrapper" v-if="detailData" 
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
                },
                {
                    label: 'Jumlah Petani',
                    value: farmers.length,
                    transform: 'concat_petani'
                }
                ]"
            ></table-detail>
            <!-- Daftar Kendaraan -->
            <h6 class="d-flex align-items-center">
                <i class="ri-truck-line mr-2" style="font-size: 20px;"></i> Daftar Kendaraan
            </h6>
            <table
                style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                <thead style="text-align: center;">
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th style="border: 1px solid black;width: 20px;">
                            No
                        </th>
                        <th style="border: 1px solid black;">
                            Kendaraan
                        </th>
                        <th style="border: 1px solid black;">
                            Sopir
                        </th>
                        <th style="border: 1px solid black;">
                            Jml Label Dimuat
                        </th>
                        <th style="border: 1px solid black;">
                            Jml Bibit Dimuat
                        </th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(lArmada, lArmadaIndex) in armadas" :key="`table-body-armada-${lArmada.id}`">
                        <td style="border: 1px solid black;text-align: center;">
                            {{ lArmadaIndex + 1 }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ lArmada.rel_vehicle_id }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ lArmada.rel_driver_id }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ scannedLabel.filter(v => v.allocation_transportation_id == lArmada.id).length | parse('number') }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ scannedLabel.filter(v => v.allocation_transportation_id == lArmada.id).reduce((acc, val) => {
                                return acc + parseInt(val.amount)
                            }, 0) | parse('number') }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th colspan="3" style="border: 1px solid black;text-align: center;">
                            Jumlah
                        </th>
                        <th style="border: 1px solid black;text-align: center;">
                            {{ scannedLabel.length | parse('concat_label') }}
                        </th>
                        <th style="border: 1px solid black;text-align: center;">
                            {{ scannedLabel.reduce((acc, val) => {
                                return acc + parseInt(val.amount)
                            }, 0) | parse('concat_bibit') }}
                        </th>
                    </tr>
                </tfoot>
            </table>
            <!-- Daftar Bibit -->
            <h6 class="d-flex align-items-center mt-5">
                <i class="ri-plant-line mr-2" style="font-size: 20px;"></i> Daftar Bibit
            </h6>
            <table
                style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: bold;background-color: white;">
                <thead style="text-align: center;">
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th style="border: 1px solid black;width: 20px;">
                            No
                        </th>
                        <th style="border: 1px solid black;width: 150px;">
                            Jenis Bibit
                        </th>
                        <th style="border: 1px solid black;">
                            Dimuat
                        </th>
                        <th style="border: 1px solid black;">
                            Rusak
                        </th>
                        <th style="border: 1px solid black;">
                            Ditolak
                        </th>
                        <th style="border: 1px solid black;">
                            Diterima
                        </th>
                        <th style="border: 1px solid black;">
                            Hilang
                        </th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(listPT, listPTIndex) in listPerTrees" :key="`table-body-${listPT.id}`">
                        <td style="border: 1px solid black;text-align: center;">
                            {{ listPTIndex + 1 }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ listPT.rel_tree_id }}
                        </td>
                        <td v-for="colData in [
                                'total_load','total_damaged','total_reject','total_received','total_missing'
                            ]" :key="`table-row-listPerTrees-${colData}`" 
                            style="border: 1px solid black;text-align: center;"
                        >
                            {{ Number(listPT[colData]).toLocaleString("id-ID") }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr style="background-color: rgb(217, 217, 217);">
                        <th colspan="2" style="border: 1px solid black;text-align: center;">
                            Jumlah
                        </th>
                        <th v-for="colData in [
                                'total_load','total_damaged','total_reject','total_received','total_missing'
                            ]" :key="`table-row-total-listPerTrees-${colData}`" 
                            style="border: 1px solid black;text-align: center;"
                        >
                            {{ listPerTrees.reduce((acc,val) => {
                                return acc + parseInt(val[colData])
                            }, 0) | parse('concat_bibit') }}
                        </th>
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
                            <th style="border: 1px solid black;width: 20px;">
                                No
                            </th>
                            <th style="border: 1px solid black;">
                                Nama Petani
                            </th>
                            <th style="border: 1px solid black;">
                                Jumlah Pupuk
                            </th>
                            <th style="border: 1px solid black;">
                                Kendaraan
                            </th>
                            <th style="border: 1px solid black;">
                                Status
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
                            <td style="border: 1px solid black;">
                                {{ pupuk.load_pupuk_allocation_transportation_id && pupuk.is_pupuk_load ? 
                                    armadas.find(v => v.id == pupuk.load_pupuk_allocation_transportation_id).rel_vehicle_id +
                                    ' ~ ' +
                                    armadas.find(v => v.id == pupuk.load_pupuk_allocation_transportation_id).rel_driver_id
                                    : '-' 
                                }}
                            </td>
                            <td style="border: 1px solid black;">
                                {{ pupuk.is_pupuk_load == 1 ? pupuk.is_pupuk_distributed ? 'Sudah Diterima' : 'Dimuat' : 'Tidak Dimuat' }}
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
                            <th colspan="2" style="border: 1px solid black;text-align: center;"></th>
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
                        <h5 class="mt-3">{{ fIndex + 1 }}. {{ farmer.farmer_no }} - {{ farmer.farmer_name }}</h5>
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
                                        Dimuat
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Rusak
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Ditolak
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Diterima
                                    </th>
                                    <th style="border: 1px solid black;">
                                        Hilang
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="(farmerSeed, fsIndex) in farmer.detail_seed_farmers" :key="`table-body-farmer-seed-${fsIndex}`">
                                    <td style="border: 1px solid black;text-align: center;">
                                        {{ fsIndex + 1 }}
                                    </td>
                                    <td style="border: 1px solid black;">
                                        {{ farmerSeed.rel_tree_id }}
                                    </td>
                                    <td  v-for="colData in [
                                            'total_load','total_damaged','total_reject','total_received','total_missing'
                                        ]" :key="`table-row-perFarmerSeed-${colData}`" 
                                        style="border: 1px solid black;text-align: center;"
                                    >
                                        {{ farmerSeed[colData] | parse('number') }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr style="background-color: rgb(217, 217, 217);">
                                    <th colspan="2" style="border: 1px solid black;text-align: center;">
                                        Jumlah
                                    </th>
                                    <th v-for="colData in [
                                            'total_load','total_damaged','total_reject','total_received','total_missing'
                                        ]" :key="`table-row-perFarmerSeedTotal-${colData}`" style="border: 1px solid black;text-align: center;">
                                        {{ farmer[colData] | parse('concat_bibit') }}
                                    </th>
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
import { C } from '@fullcalendar/core/internal-common';
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
        armadas: []
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
                this.armadas = []
                this.detailData = await this.$_api.single('loading_line', null, route.loading_line_id).then(res => res.data)
                if (this.detailData) {
                    const labels = [] 
                    this.detailData.detail_farmers.map(v => {
                        labels.push(...v.detail_labels)
                    })
                    this.labels = labels
                    const listArmada = this.detailData.detail_allocation_transportation
                    this.armadas = listArmada
                    this.scannedLabel = labels.filter(v => v.is_loaded)
                    this.listPupuk = this.detailData.detail_farmers

                    // set detail_seed_farmers & list per trees
                    const listTree = []
                    this.farmers = this.detailData.detail_farmers
                        .map(farmer => {
                            // set farmer total
                            const totalLoadFarmer = farmer.detail_seed_farmers
                                .reduce((acc, val) => {
                                    return acc + parseInt(val.total_load)
                                }, 0)
                            const totalDamagedFarmer = farmer.detail_seed_farmers
                                .reduce((acc, val) => {
                                    return acc + parseInt(val.total_damaged)
                                }, 0)
                            const totalMissingFarmer = farmer.detail_seed_farmers
                                .reduce((acc, val) => {
                                    return acc + parseInt(val.total_missing)
                                }, 0)
                            const totalReceivedFarmer = farmer.detail_seed_farmers
                                .reduce((acc, val) => {
                                    return acc + parseInt(val.total_received)
                                }, 0)
                            let totalRejectFarmer = 0
                            // set listPerTrees
                            farmer.detail_seed_farmers.map(val => {
                                const findTree = listTree.find(v => v.tree_id == val.tree_id)
                                val.total_load = parseInt(val.total_load)
                                val.total_damaged = parseInt(val.total_damaged)
                                val.total_missing = parseInt(val.total_missing)
                                val.total_received = parseInt(val.total_received)
                                val.total_reject = val.total_load - (val.total_damaged + val.total_missing + val.total_received)
                                if (!farmer.status || farmer.status == 0) val.total_reject = 0
                                totalRejectFarmer += val.total_reject
                                if (findTree) {
                                    findTree.total_load += val.total_load
                                    findTree.total_damaged += val.total_damaged
                                    findTree.total_missing += val.total_missing
                                    findTree.total_received += val.total_received
                                    findTree.total_reject += val.total_reject
                                } else {
                                    listTree.push({
                                        ...val,
                                        total_load: val.total_load,
                                        total_damaged: val.total_damaged,
                                        total_missing: val.total_missing,
                                        total_received: val.total_received,
                                        total_reject: val.total_reject,
                                    })
                                }
                            })
                            return {
                                ...farmer,
                                total_load: totalLoadFarmer,
                                total_damaged: totalDamagedFarmer,
                                total_missing: totalMissingFarmer,
                                total_received: totalReceivedFarmer,
                                total_reject: totalRejectFarmer,
                            }
                        })
                    this.listPerTrees = listTree.sort((a,b) => b.amount - a.amount)
                    console.log('this.farmers', this.farmers)
                    
                    this.listTableSuratJalan()
                    setTimeout(() => {
                        this.exportPDF()
                        // window.print()
                        // window.close()
                    }, 500);
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
                filename: `${this.detailData.program_year} - FF ${this.detailData.ff_name}.pdf`,
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: {mode: ['css', 'legacy']}
            }
            html2pdf().set(pdfOption).from(elementHTML).save();
        },
        listTableSuratJalan() {
            const listTree = []
            this.farmers.map(farmer => {
                farmer.detail_seed_farmers.map(val => {
                    const findTree = listTree.find(v => v.tree_id == val.tree_id)
                    const totalLoad = parseInt(val.total_load)
                    const totalDamaged = parseInt(val.total_damaged)
                    const totalMissing = parseInt(val.total_missing)
                    const totalReceived = parseInt(val.total_received)
                    let totalReject = totalLoad - (totalDamaged + totalMissing + totalReceived)
                    if (!farmer.status || farmer.status == 0) totalReject = 0
                    if (totalReject < 0) totalReject = 0
                    if (findTree) {
                        findTree.total_load += totalLoad
                        findTree.total_damaged += totalDamaged
                        findTree.total_missing += totalMissing
                        findTree.total_received += totalReceived
                        findTree.total_reject += totalReject
                    } else {
                        listTree.push({
                            ...val,
                            total_load: totalLoad,
                            total_damaged: totalDamaged,
                            total_missing: totalMissing,
                            total_received: totalReceived,
                            total_reject: totalReject,
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