<template>
    <div>
        <b-button block variant="outline-danger" class="hide-print" @click="exportPDF()">Export PDF</b-button>
        <div
            v-if="mainData"
            id="receipt-seed-custom-distribution"
            style="background-color: white;break-inside: auto;"
        >
            <div style="background-color: white;padding: 20px;">
                <div style="display: flex;justify-content: center;background-color: white;">
                    <div style="margin-right: 10px;">
                        <img :src="$_config.logo.black2"
                            style="height: 65px;"
                        />
                    </div>
                    <div style="display: flex;flex-direction: column;justify-content: center;">
                        <h1 style="font-weight: normal;">Checklist Manual</h1>
                        <h1 style="font-weight: normal;">Loading</h1>
                    </div>
                </div>
                <table-detail
                    style="font-weight: normal;background-color: white;"
                    :items="tableDetailItems"
                ></table-detail>
                <div class="mb-5">
                    <h6 class="d-flex align-items-center">
                        <i class="ri-file-list-line mr-2" style="font-size: 20px;"></i> Jenis Bibit
                    </h6>
                    <table
                        style="width: 100%;border-collapse: collapse;border: 1px solid black;font-weight: normal;background-color: white;">
                        <thead style="text-align: center;background-color: rgb(217, 217, 217);">
                            <tr>
                                <th style="border: 1px solid black;width: 50px;">
                                    No
                                </th>
                                <th style="border: 1px solid black;">
                                    Kendaraan
                                </th>
                                <th style="border: 1px solid black;">
                                    Sopir
                                </th>
                                <th style="border: 1px solid black;">
                                    Jenis
                                </th>
                                <th style="border: 1px solid black;">
                                    Jml Bibit
                                </th>
                                <th style="border: 1px solid black;">
                                    Checklist (✔)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sVal, sIndex) in mainData.detail_loaded_allocation" :key="`table-body-${sIndex}`">
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ sIndex + 1 }}
                                </td>
                                <td style="border: 1px solid black;">
                                    {{ sVal.vehicle }}
                                </td>
                                <td style="border: 1px solid black;">
                                    {{ sVal.driver }}
                                </td>
                                <td style="border: 1px solid black;">
                                    {{ sVal.rel_tree_id }}
                                </td>
                                <td style="border: 1px solid black;text-align: center;">
                                    {{ Number(sVal.amount).toLocaleString("id-ID") }}
                                </td>
                                <td style="border: 1px solid black;">
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr style="background-color: rgb(217, 217, 217);">
                                <th colspan="4" style="border: 1px solid black;text-align: center;">
                                    Jumlah
                                </th>
                                <th style="border: 1px solid black;text-align: center;">
                                    {{ Number(mainData.detail_loaded_allocation.reduce((acc,val) => {
                                        return acc + parseInt(val.amount)
                                    }, 0)).toLocaleString("id-ID") }}
                                </th>
                                <th style="border: 1px solid black;text-align: center;">
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div v-if="$route.query.type != 'checklist-manual'" style="display: flex;align-items: stretch;font-size: larger;height: 150px;margin-top: 20px;font-weight: normal;page-break-inside: avoid;">
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Diterima Oleh,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
                    </div>
                    <div style="flex: 1;text-align: center;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
                        <p>Diserahkan Oleh,</p>
                        <p style="width: 200px;border-bottom: 2px solid black;"></p>
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
            title="Custom Distribusi"
        >
            <h1>Data tidak ditemukan!</h1>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'NurseryManagementBastSeedCustomDistributionPrint',

    data: () => ({
        api: 'custom_request_distribution',
        mainData: null,
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
                if (!route.id) {
                    loading.close()
                    setTimeout(() => {
                        this.$_alert.error(null,'Gagal','Data tidak ditemukan!')
                    }, 100);
                    return;
                }
                const data = await this.$_api.single(this.api, null, route.id).then(res => res.data)
                data.detail_loaded_allocation = data.detail_loaded_allocation.map(dla => {
                    const findVehicle = data.detail_custom_allocation_transportation.find(v => v.id == dla.allocation_transportation_id)
                    console.log('findVehicle', findVehicle)
                    return {
                        ...dla,
                        vehicle: findVehicle ? findVehicle.rel_vehicle_internal_id : '-',
                        driver: findVehicle ? findVehicle.driver_name || findVehicle.rel_driver_id : '-'
                    }
                })
                await this.setTableDetailItems(data)
                this.mainData = data
                setTimeout(() => {
                    this.exportPDF()
                }, 200);
            } catch (err) {
                console.log('initData() error',err)
                this.$_alert.error(err)
            } finally {
                loading.close()
            }
        },
        exportPDF() {
            var elementHTML = document.querySelector(`#receipt-seed-custom-distribution`);
            const pdfOption = {
                margin: .2,
                image: { type: 'jpeg', quality: 1 },
                filename: `Custom Distribusi - ${this.mainData.rel_location_nursery_id} - ${this.mainData.date_distribution}.pdf`,
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: {mode: ['css', 'legacy']}
            }
            html2pdf().set(pdfOption).from(elementHTML).save();
        },
        setTableDetailItems: async function (data) {
            const items = [
                {
                    label: 'Lokasi Persemaian',
                    value: data.rel_location_nursery_id
                },
                {
                    label: 'PJ Distribusi',
                    value: data.rel_pic_id
                }
            ]
            if (data.category_id == 1) {
                items.push({
                    label: 'Lokasi Persemaian Tujuan',
                    value: data.rel_to_location_nursery_id
                })
            }
            if (data.category_id == 2) {
                const project = await this.$_api.single('master_custom_project', null, data.custom_project_id).then(res => res.data)
                items.push({
                    label: 'Kode Projek',
                    value: project.code_custom_project
                },{
                    label: 'Nama Project',
                    value: project.project_name
                },{
                    label: 'Sponsor Project',
                    value: project.rel_sponsor_id
                })
            } else if (data.category_id == 3 && data.detail_adendum_id) {
              const adendumDetail = await this.$_api.single('detail_adendum', null, data.detail_adendum_id).then(res => res.data)
              const loadingLineDetail = await this.$_api.single('loading_line', null, adendumDetail.loading_line_id).then(res => res.data)
              items.push(...[{
                  label: 'Tahun Program',
                  value: loadingLineDetail.program_year
              },{
                  label: 'Management Unit',
                  value: loadingLineDetail.mu_name
              },{
                  label: 'Nama FF',
                  value: loadingLineDetail.ff_name
              }])
            }
            items.push({
                label: 'Tanggal Distribusi',
                value: data.date_distribution,
                transform: 'longDate'
            },{
                label: 'Alamat Distribusi',
                value: data.address
            },{
                label: 'Koordinat Distribusi',
                value: `${data.latitude}, ${data.longitude}`
            })
            this.tableDetailItems = items
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
