<template>
    <div>
        <b-button block variant="outline-danger" class="hide-print" @click="exportPDF()">Export PDF</b-button>
        <div 
            v-if="loadingLine && farmer && labels.length"
            id="receipt-seed-farmer-wrapper"
            style="background-color: white;break-inside: auto;"
        >
            <div style="background-color: white;padding: 20px;">
                <div style="display: flex;justify-content: center;background-color: white;">
                    <div style="margin-right: 10px;">
                        <img :src="$_config.logo.black2" 
                            style="height: 65px;"
                        />
                    </div>
                    <div v-if="$route.query.type != 'checklist-manual'" style="display: flex;flex-direction: column;justify-content: center;">
                        <h1 style="font-weight: normal;">Bukti Unloading & Serah Terima</h1>
                        <h1 style="font-weight: normal;">Bibit Petani</h1>
                    </div>
                    <div v-else style="display: flex;flex-direction: column;justify-content: center;">
                        <h1 style="font-weight: normal;">Checklist Manual</h1>
                        <h1 style="font-weight: normal;">Loading</h1>
                    </div>
                </div>
                <b-row style="background-color: white;">
                    <b-col>
                        <table-detail
                            v-if="farmer"
                            style="font-weight: normal;background-color: white;"
                            :items="tableDetailItems"
                        ></table-detail>
                    </b-col>
                    <b-col>
                        <table-detail
                            style="font-weight: normal;background-color: white;"
                            :items="[
                                {
                                    label: 'Tanggal Distribusi',
                                    value: loadingLine.distribution_date,
                                    transform: 'longDate'
                                },
                                {
                                    label: 'Alamat Distribusi',
                                    value: loadingLine.location_distribution
                                },
                                {
                                    label: 'Koordinat Distribusi',
                                    value: loadingLine.distribution_coordinates
                                },
                                // {
                                //     label: 'Jumlah',
                                //     value: `${labels.length} Label 
                                //         ${Number(labels.reduce((acc,val) => {
                                //             return acc + parseInt(val.amount)
                                //         }, 0)).toLocaleString('id-ID')} Bibit`
                                // },
                                {
                                    label: `Waktu Kedatangan`,
                                    value: '____ : ____'
                                },
                            ]"
                        ></table-detail>
                    </b-col>
                </b-row>
                <div class="mb-5">
                    <h6 class="d-flex align-items-center">
                        <i class="ri-file-list-line mr-2" style="font-size: 20px;"></i> Summary / Rangkuman Pengiriman
                    </h6>
                    <table
                        style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: normal;background-color: white;">
                        <thead style="text-align: center;background-color: rgb(217, 217, 217);">
                            <tr>
                                <th style="border: 1px solid black;width: 50px;">
                                    No
                                </th>
                                <th style="border: 1px solid black;width: 200px;">
                                    Jenis
                                </th>
                                <th style="border: 1px solid black;">
                                    Jml Label
                                </th>
                                <th style="border: 1px solid black;">
                                    Jml Bibit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sVal, sIndex) in summaries" :key="`table-body-${sIndex}`">
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ sIndex + 1 }}
                                </td>
                                <td style="border: 1px solid black;">
                                    {{ sVal.rel_tree_id }}
                                </td>
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ Number(sVal.total_label).toLocaleString("id-ID") }}
                                </td>
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ Number(sVal.amount).toLocaleString("id-ID") }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr style="background-color: rgb(217, 217, 217);">
                                <th colspan="2" style="border: 1px solid black;text-align: center;">
                                    Jumlah
                                </th>
                                <th style="border: 1px solid black;text-align: center;">
                                    {{ summaries.reduce((acc,val) => {
                                        return acc + parseInt(val.total_label)
                                    }, 0) }}
                                </th>
                                <th style="border: 1px solid black;text-align: center;">
                                    {{ Number(summaries.reduce((acc,val) => {
                                        return acc + parseInt(val.amount)
                                    }, 0)).toLocaleString("id-ID") }}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <h6 class="d-flex align-items-center">
                        <i class="ri-survey-line mr-2" style="font-size: 20px;"></i> Checklist Form
                    </h6>
                    <table
                        style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: normal;background-color: white;">
                        <thead v-if="$route.query.type != 'checklist-manual'" style="text-align: center;background-color: rgb(217, 217, 217);">
                            <tr>
                                <th rowspan="3" style="border: 1px solid black;width: 150px;">
                                    No. Kantong
                                </th>
                                <th rowspan="3" style="border: 1px solid black;width: 100px;">
                                    Jenis
                                </th>
                                <th rowspan="3" style="border: 1px solid black;width: 50px;">
                                    Jml
                                </th>
                                <th rowspan="2" style="border: 1px solid black;width: 50px;">
                                    QC
                                </th>
                                <th colspan="5" style="border: 1px solid black;">
                                    Checklist (✔)
                                </th>
                            </tr>
                            <tr>
                                <th colspan="2" style="border: 1px solid black;">
                                    Diterima
                                </th>
                                <th colspan="2" style="border: 1px solid black;">
                                    Ditolak
                                </th>
                                <th rowspan="2" style="border: 1px solid black;">
                                    Note
                                </th>
                            </tr>
                            <tr>
                                <th style="border: 1px solid black;">
                                    (✔)
                                </th>
                                <th style="border: 1px solid black;width: 50px;">
                                    (✔)
                                </th>
                                <th style="border: 1px solid black;width: 70px;">
                                    Jml
                                </th><th style="border: 1px solid black;width: 50px;">
                                    (✔)
                                </th>
                                <th style="border: 1px solid black;width: 70px;">
                                    Jml
                                </th>
                            </tr>
                        </thead>
                        <thead
                            v-else
                            style="text-align: center;background-color: rgb(217, 217, 217);"
                        >
                            <tr>
                                <th rowspan="2" style="border: 1px solid black;width: 150px;">
                                    No. Kantong
                                </th>
                                <th rowspan="2" style="border: 1px solid black;width: 100px;">
                                    Jenis
                                </th>
                                <th rowspan="2" style="border: 1px solid black;width: 50px;">
                                    Jml
                                </th>
                                <th colspan="2" style="border: 1px solid black;">
                                    Checklist (✔)
                                </th>
                                <th rowspan="2" style="border: 1px solid black;">
                                    Note
                                </th>
                            </tr>
                            <tr>
                                <th style="border: 1px solid black;">
                                    QC
                                </th>
                                <th style="border: 1px solid black;">
                                    Fisik
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="label in labels" :key="`table-body-${label.id}`">
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ label.label_code }}
                                </td>
                                <td style="border: 1px solid black;">
                                    {{ label.rel_tree_id }}
                                </td>
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ label.amount }}
                                </td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                            </tr>
                            <tr>
                                <td  style="border: 1px solid black;text-align: center;">Pupuk Organik Cair</td>
                                <td  style="border: 1px solid black;text-align: center;">POC</td>
                                <td  style="border: 1px solid black;text-align: center;">{{ farmer.total_pupuk }} ml</td>
                                <td  style="border: 1px solid black;text-align: center;"></td>
                                <td  style="border: 1px solid black;text-align: center;"></td>
                                <td  style="border: 1px solid black;text-align: center;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                                <td v-if="$route.query.type != 'checklist-manual'" style="border: 1px solid black;"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="$route.query.type != 'checklist-manual'">
                        <b>NB: *Checklist QC dilakukan dan diisi oleh FF saat Unload bibit. </b>
                    </div>
                </div>
                <div v-if="$route.query.type != 'checklist-manual'" style="display: flex;align-items: stretch;font-size: larger;height: 150px;margin-top: 20px;font-weight: normal;page-break-inside: avoid;">
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Diterima Oleh,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
                    </div>
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Diserahkan Oleh,</p>
                        <p v-if="loadingLine.status == 2" style="width: 200px;border-bottom: 2px solid black;"></p>
                        <p v-else style="width: 200px;">( {{ loadingLine.ff_name }} )</p>
                    </div>
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Mengetahui,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
                    </div>
                </div>
                <div v-else style="display: flex;align-items: stretch;font-size: larger;height: 150px;margin-top: 20px;font-weight: normal;page-break-inside: avoid;">
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Checklist Oleh,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
                    </div>
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Mengetahui,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
                    </div>
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
    name: 'NurseryManagementBastSeed',

    data: () => ({
        loadingLine: null,
        farmer: null,
        labels: [],
        summaries: [],
        tableDetailItems: []
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
                if (loadingLine) {
                    const listFarmers = loadingLine.detail_farmers
                    const findFarmer = listFarmers.find(v => v.farmer_no == route.farmer_no)
                    if (findFarmer) {
                        this.farmer = findFarmer
                        let summaries = []
                        const labels = findFarmer.detail_labels
                            .map(v => {
                                const findSummary = summaries.find(fs => fs.tree_id == v.tree_id)
                                if (findSummary) {
                                    findSummary.amount += parseInt(v.amount)
                                    findSummary.total_label += 1
                                } else {
                                    summaries.push({
                                        tree_id: v.tree_id,
                                        rel_tree_id: v.rel_tree_id,
                                        amount: parseInt(v.amount),
                                        total_label: 1
                                    })
                                }
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
                        // console.log('labels', labels)
                        this.loadingLine = loadingLine
                        this.labels = labels
                        this.summaries = summaries
                        // set tableDetailItems
                        let picName = 'Nama FF'
                        let picCode = 'Kode FF'
                        if (loadingLine.status == 2) {
                            picName = 'Nama PIC Lahan'
                            picCode = 'NIK PIC Lahan'
                        }
                        const itemsTable = [
                            {
                                label: 'Tahun Program',
                                value: loadingLine.program_year
                            },
                            // {
                            //     label: 'Lahan Program',
                            //     value: loadingLine.status,
                            //     transform: 'status_lahan',
                            // },
                            {
                                label: 'Management Unit',
                                value: loadingLine.mu_name
                            }
                        ]
                        if (loadingLine.status != 2) {
                            itemsTable.push(...[
                                {
                                    label: 'Nama Petani',
                                    value: findFarmer.farmer_name
                                },
                                // {
                                //     label: 'Kode Petani',
                                //     value: findFarmer.farmer_no
                                // }
                            ])
                        }
                        itemsTable.push(...[
                            {
                                label: picName,
                                value: loadingLine.ff_name
                            },
                            // {
                            //     label: picCode,
                            //     value: loadingLine.ff_no
                            // },
                        ])
                        this.tableDetailItems = itemsTable
                        
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
            var elementHTML = document.querySelector(`#receipt-seed-farmer-wrapper`);
            const pdfOption = {
                margin: .2,
                image: { type: 'jpeg', quality: 1 },
                filename: `${this.loadingLine.program_year} - FF ${this.loadingLine.ff_name} - Petani ${this.farmer.farmer_name}.pdf`,
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: {mode: ['css', 'legacy']}
            }
            html2pdf().set(pdfOption).from(elementHTML).save();
        }
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