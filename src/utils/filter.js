import Vue from "vue";
import moment from "moment";
moment.locale("id");
Vue.filter("parse", (value, id) => {
  if (id === null || id === undefined) return value;
  if (value === null || value === undefined) return value;
  let toReturn = "";
  if (id.search("-") === -1) {
    switch (id) {
      case "active":
        toReturn = value === "1" || value === 1 ? "Aktif" : "Non Aktif";
        break;
      case "sampling_status":
        toReturn = value === "1" || value === 1 ? "Selesai" : "Proses";
        break;
      case "is_done":
        toReturn = value === "1" || value === 1 ? "Selesai" : "Proses";
        break;
      case "is_exist":
        toReturn = value === "1" || value === 1 ? "Ada" : "Tidak Ada";
        break;
      case "load_status":
        toReturn =
          value === "1" || value === 1 ? "Sudah Diangkut" : "Belum Diangkut";
        break;
      case "print_status":
        toReturn =
          value === "1" || value === 1 ? "Sudah Dicetak" : "Belum Dicetak";
        break;
      case "treatment_category":
        toReturn = value === "1" || value === 1 ? "Pembibitan" : "Pre-Pembibitan";
        break;
      case "category_vendor":
        toReturn = value === "1" || value === 1 ? "Personal" : "Perusahaan";
        break;
      case "category_block":
        toReturn =
          value === "0" || value === 0
            ? "Tabur"
            : value === "1" || value === 1
            ? "Tanam"
            : value === "2" || value === 2
            ? "Open Area"
            : "-";
        break;
      case "growing_type":
        toReturn =
          value === "1" || value === 1
            ? "Fast-Growing"
            : value === "2" || value === 2
            ? "Medium-Growing"
            : value === "3" || value === 3
            ? "Slow-Growing"
            : "-";
        break;
      case "status_delivery_po":
        toReturn =
          value === "0" || value === 0
            ? "Belum Ada Pengiriman"
            : value === "1" || value === 1
            ? "Dikirim Sebagian"
            : value === "2" || value === 2
            ? "Pengiriman Selesai"
            : "-";
        break;
      case "source_seed_inisiasi":
        toReturn =
            value === "1" || value === 1
            ? "Bibit Mitra"
            : value === "2" || value === 2
            ? "Pembibitan Internal"
            : value === "3" || value === 3
            ? "Pengembalian Bibit Dari Petani"
            : value === "4" || value === 4
            ? "Distribusi Internal"
            : value === "5" || value === 5
            ? "Persiapan Untuk Perpindahan Dari Bedeng Lain"
            : "-";
        break;
      case "seed_phase":
        toReturn =
          value === "0" || value === 0
            ? "Mentah"
            : value === "1" || value === 1
            ? "Penaburan"
            : value === "2" || value === 2
            ? "Perkecambahan"
            : value === "3" || value === 3
            ? "Semai"
            : value === "4" || value === 4
            ? "Pemotongan Akar"
            : value === "5" || value === 5
            ? "BST"
            : "-";
        break;
      case "category_material":
        toReturn =
          value === "1" || value === 1
            ? "Pestisida"
            : value === "2" || value === 2
            ? "Nutrisi"
            : value === "3" || value === 3
            ? "Pupuk"
            : "-";
        break;
      case "category_master_pest":
        toReturn =
          value === "1" || value === 1
            ? "Hama"
            : value === "2" || value === 2
            ? "Penyakit"
            : "-";
        break;
      case "category_action_monitoring":
        toReturn =
          value === "1" || value === 1
            ? "Pemeliharaan Tambahan"
            : value === "2" || value === 2
            ? "Perawatan"
            : "-";
        break;
      case "category_monitoring":
        toReturn =
          value === "1" || value === 1
            ? "Seleksi"
            : value === "2" || value === 2
            ? "Ada Masalah"
            : value === "3" || value === 3
            ? "Tidak Ada Masalah"
            : value === "4" || value === 4
            ? "Audit"
            : "-";
        break;
      case "category_activity":
        toReturn =
          value === "1" || value === 1
            ? "Menabur"
            : value === "2" || value === 2
            ? "Monitoring"
            : value === "3" || value === 3
            ? "Sapih"
            : "-";
        break;
      case "status_approval":
        toReturn =
          value === "1" || value === 1
            ? "Disetujui"
            : value === "2" || value === 2
            ? "Ditolak"
            : "Menunggu";
        break;
      case "is_movement_bibit":
        toReturn =
          value === "1" || value === 1
            ? "Ada"
            : "Tidak Ada";
        break;
      case "status_harvest_plant":
        toReturn =
          value === "0" || value === 0
            ? "Proses"
            : value === "1" || value === 1
            ? "Siap Disapih"
            : value === "2" || value === 2
            ? "Selesai"
            : "-";
        break;
      case "type_movement_bibit":
        toReturn =
          value === "1" || value === 1
            ? "Penambahan"
            : value === "2" || value === 2
            ? "Pengurangan"
            : value === "3" || value === 3
            ? "Pertukaran"
            : value === "4" || value === 4
            ? "Pindah Fase"
            : "???";
        break;
      case "status_did":
        toReturn =
          value === "1" || value === 1
            ? "Sudah Dilakukan"
            : value === "2" || value === 2
            ? "Tidak Dilakukan"
            : "Belum Dilakukan";
        break;
      case "status_approval_nursery":
        toReturn =
          value === "1" || value === 1
            ? "Disetujui"
            : value === "2" || value === 2
            ? "Ditolak"
            : "Menunggu";
        break;
      case "status_allocation":
        toReturn =
          value === "1" || value === 1
            ? "Pre-Alokasi"
            : value === "2" || value === 2
            ? "Alokasi"
            : "???";
        break;
      case "status_allocation_vehicle":
        toReturn =
          value === "1" || value === 1
            ? "Sudah Alokasi"
            : "Belum Alokasi";
        break;
      case "status_verification_addendum":
        toReturn =
          value === "0" || value === 0
            ? "Belum Verifikasi"
            : value === "1" || value === 1
            ? "Sudah Verifikasi"
            : value === "2" || value === 2
            ? "Sudah Verifikasi"
            : "???";
        break;
      case "status_inisiasi_addendum":
        toReturn =
          value === "0" || value === 0
            ? "Belum Verifikasi Request"
            : value === "1" || value === 1
            ? "Belum Inisiasi"
            : value === "2" || value === 2
            ? "Sudah Inisiasi"
            : "???";
        break;
      case "status_qa_nursery":
        toReturn =
          value === "1" || value === 1
            ? "Disetujui"
            : value === "2" || value === 2
            ? "Ditolak"
            : value === "3" || value === 3
            ? "Close"
            : "Menunggu";
        break;
      case "status_received":
        toReturn =
          value === "1" || value === 1 ? "Sudah Diterima" : "Belum Diterima";
        break;
      case "concat_bibit":
        toReturn = (typeof parseInt(value) == 'number' ? Number(value).toLocaleString("id-ID") : value) + " Bibit";
        break;
      case "concat_inch":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " Inch";
        break;
      case "concat_benih":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " Benih";
        break;
      case "concat_holes":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + "";
        break;
      case "concat_pupuk":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " ml";
        break;
      case "concat_lahan":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " Lahan";
        break;
      case "concat_petani":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " Petani";
        break;
      case "concat_label":
        toReturn = (typeof parseInt(value) == 'number' && parseInt(value) >= 0 ? Number(value).toLocaleString("id-ID") : value) + " Label";
        break;
      case "status_user":
        toReturn = value === "user_active" ? "Aktif" : "Non Aktif";
        break;
      case "paid":
        toReturn = value === "1" || value === 1 ? "Lunas" : "Belum Lunas";
        break;
      case "status_overall":
        toReturn = value ? "Selesai" : "Belum Selesai";
        break;
      case "uppercase":
        toReturn = value.toUpperCase();
        break;
      case "allow":
        toReturn =
          value.toLowerCase() === "y" ? "DIperbolehkan" : "Tidak diizinkan";
        break;
      case "lock":
        toReturn = value.toLowerCase() === "y" ? "Close" : "Open";
        break;
      case "yn":
        toReturn = value.toLowerCase() === "y" ? "Ya" : "Tidak";
        break;
      case "prosen":
        toReturn = Number(value).toLocaleString("id-ID") + "%";
        break;
      case "s_komponen":
        toReturn = value + " Komponen";
        break;
      case "count_day":
        toReturn = value + " Hari";
        break;
      case "count_day_of_work":
        toReturn = value + " Hari Kerja";
        break;
      case "planting_category":
        toReturn =
          value === "1" || value === 1 ? "Indirect" :
          value === "2" || value === 2 ? "Direct" : "-";
        break;
      case "category_custom_project":
        toReturn =
          value === "1" || value === 1 ? "Tree Planting" :
          value === "2" || value === 2 ? "Event Planting" :
          value === "3" || value === 3 ? "Tree & Event Planting" : "-";
        break;
      case "status_custom_distribution":
        toReturn =
          value === "0" || value === 0 ? "Belum Alokasi" :
          value === "1" || value === 1 ? "Sudah Alokasi" :
          value === "2" || value === 2 ? "Sudah Load" :
          value === "3" || value === 3 ? "Sudah Distribusi" : "-";
        break;
      case "monitoring_special_maintenance":
        toReturn =
          value === "1" || value === 1 ? "Penyiraman" :
          value === "2" || value === 2 ? "Pemupukan" : "-";
        break;
      case "monitoring_watering_type":
        toReturn =
          value === "1" || value === 1 ? "Pestisida" :
          value === "2" || value === 2 ? "Nutrisi" : "-";
        break;
      case "status_detail_load_cd":
        toReturn =
          value === "0" || value === 0 ? "Belum Muat" :
          value === "1" || value === 1 ? "Sudah Muat" :  "-";
        break;
      case "category_custom_distribution":
        toReturn =
          value === "1" || value === 1 ? "Internal" :
          value === "2" || value === 2 ? "Project" :
          value === "3" || value === 3 ? "Pengiriman Ulang / Susulan" : 
          value === "4" || value === 4 ? "Optimalisasi" : 
          value === "5" || value === 5 ? "Re-Planting Project" : "-";
        break;
      case "status_lahan":
        toReturn =
          value === "1" || value === 1 ? "Lahan Reguler" :
          value === "2" || value === 2 ? "Lahan Umum" : "-";
        break;
        case "status_bast":
          toReturn =
            value === "0" || value === 0 ? "" :
            value === "1" || value === 1 ? "Kekurangan" :
            value === "2" || value === 2 ? "Kelebihan" : 
            value === "3" || value === 3 ? "Lengkap" : "-";
          break;
      case "category_vehicle":
        toReturn =
          value === "1" || value === 1 ? "Harian" :
          value === "2" || value === 2 ? "Kontrak" : "-";
        break;
      case "sampling_seed_status":
        toReturn =
          value === "0" || value === 0 ? "Sedang Proses" :
          value === "1" || value === 1 ? "Selesai, Belum Disapih" : 
          value === "2" || value === 2 ? "Selesai, Sudah Disapih" : 
          "-";
          // value === "2" || value === 2 ? "Sudah Disapih" : "-";
        break;
      case "detail_sampling_seed_status":
        toReturn =
          value === "0" || value === 0 ? "Sedang Proses" :
          value === "1" || value === 1 ? "Selesai, Siap Disapih" : 
          value === "2" || value === 2 ? "Selesai, Sudah Disapih" : "-";
        break;
      case "procurement_seed_type":
        toReturn =
          value === "1" || value === 1 ? "Benih" :
          value === "2" || value === 2 ? "BBST" :
          value === "3" || value === 3 ? "BST" : "-";
        break;
      case "category_harvest_plant":
        toReturn =
          value === "1" || value === 1 ? "Penaburan" :
          value === "2" || value === 2 ? "Penanaman" : "-";
        break;
      case "category_list_addendum":
        toReturn =
          value === "1" || value === 1 ? "Pengembalian Bibit" :
          value === "2" || value === 2 ? "Pengiriman Ulang Bibit" :
          value === "3" || value === 3 ? "Perbaikan Data Kelebihan" :
          value === "4" || value === 4 ? "Perbaikan Data Kekurangan" : "-";
        break;
      case "status_completed":
        toReturn =
          value === "1" || value === 1 ? "Sudah Selesai" : "Masih Proses";
        break;
      case "status_available":
        toReturn =
          value == "available"
            ? "Tersedia"
            : value == "not_available"
            ? "Tidak Tersedia"
            : "-";
        break;
      case "verify":
        if (value === "revision_request") toReturn = "Permintaan Revisi";
        else if (value === "verification_request") {
          toReturn = "Pengajuan Verifikasi";
        } else if (value === "appraisal_request") {
          toReturn = "Permintaan Penilaian";
        } else if (value === "approved") toReturn = "Disetujui";
        else toReturn = "Draft";
        break;
      case "modules":
        if (value === "customer_complaints") toReturn = "Keluhan Pelanggan";
        else if (value === "kkkl_daily_reports") toReturn = "K3L Daily";
        else if (value === "mm_appraisals") toReturn = "SMM";
        else if (value === "qhse_daily_activities") toReturn = "Daily Activity";
        else if (value === "qhse_nc_qa") toReturn = "Non Conformance";
        else if (value === "qpass_appraisals") toReturn = "QPASS";
        else if (value === "smkkkl_appraisals") toReturn = "SMK3L";
        else if (value === "r_appraisals") toReturn = "5R";
        else if (value === "qhse_nc_hse") toReturn = "HSE NC";
        else if (value === "kkkl_accident_cause_analysis") {
          toReturn = "Analisa Penyebab";
        } else if (value === "kkkl_occupt_diss_accidents") {
          toReturn = "Kecelakaan / Penyakit Akibat Kerja";
        } else if (value === "kkkl_critical_plans") {
          toReturn = "Rencana Tugas Kritikal";
        } else if (value === "kkkl_onsite_kkkl_personnels") {
          toReturn = "Tenaga K3L On Site";
        } else if (value === "kkkl_trainings") toReturn = "Pelatihan K3L";
        else if (value === "users_verifications") {
          toReturn = "Verifikasi Pendaftaran";
        } else toReturn = "Unknown";
        break;
      case "number":
        toReturn = !isNaN(value) ? Number(value).toLocaleString("id") : value;
        break;
      case "number2fraction":
        toReturn = !isNaN(value)
          ? Number(value).toLocaleString("id", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          : value;
        break;
      case "money":
        toReturn = !isNaN(value)
          ? "Rp. " + Number(value).toLocaleString("id")
          : value;
        break;
      case "date":
        if (value) toReturn = moment(value).format("DD MMMM YYYY");
        else toReturn = value
        break;
      case "longDate":
        if (moment(value, "YYYY-MM-DD", true).isValid()) {
          toReturn = moment(value).format("LL");
        } else toReturn = value;
        break;
      case "longDateTime":
        toReturn = moment(value).format('dddd, MMMM Do YYYY, HH:mm:ss a');
        break;
      case "longDateTime+7":
        toReturn = moment(value).add(7, 'h').format('dddd, MMMM Do YYYY, HH:mm:ss a');
        break;
      case "longDateTimeFromUtc":
        toReturn = moment(value).add(7, 'h').format('dddd, MMMM Do YYYY, HH:mm:ss a');
        break;
      case "dateTime":
        var str = value;
        var date = moment(str);
        // var dateComponent = date.utc().format("DD MMMM YYYY");
        // var timeComponent = date.utc().format("HH:mm");
        var dateComponent = date.format("DD MMMM YYYY");
        var timeComponent = date.format("HH:mm");
        toReturn = dateComponent + ", " + timeComponent;
        break;
      case "dateTime+7":
        var str = value;
        var date = moment(str).add(7, 'h');
        // var dateComponent = date.utc().format("DD MMMM YYYY");
        // var timeComponent = date.utc().format("HH:mm");
        var dateComponent = date.format("DD MMMM YYYY");
        var timeComponent = date.format("HH:mm");
        toReturn = dateComponent + ", " + timeComponent;
        break;
      case "period":
        if (moment(value, "YYYY-MM-DD", true).isValid()) {
          toReturn = moment(value).format("MMMM YYYY");
        } else toReturn = value;
        break;
      case "year":
        if (moment(value, "YYYY-MM-DD", true).isValid()) {
          toReturn = moment(value).format("YYYY");
        } else toReturn = moment(value).format("YYYY");
        break;
      case "hours":
        let parsed = value.split(":");
        parsed[0] = Number(parsed[0]) > 0 ? Number(parsed[0]) + " Jam" : null;
        parsed[1] = Number(parsed[1]) > 0 ? Number(parsed[1]) + " Menit" : null;
        parsed[2] = Number(parsed[2]) > 0 ? Number(parsed[2]) + " Detik" : null;
        toReturn = parsed.filter(x => x).join(", ");
        break;
      case "time":
        toReturn = moment(value, "HH:mm:ss").format("LTS a");
        break;
      case "kelamin":
        toReturn = value.toLowerCase() === "male" ? "Laki-Laki" : "Perempuan";
        break;
      case "gender":
        toReturn = value.toLowerCase() === "L" ? "Laki-Laki" : "Perempuan";
        break;
      case "kawin":
        if (value === "single") toReturn = "Belum Menikah";
        else if (value === "married") toReturn = "Menikah";
        else if (value === "widow") toReturn = "Janda/Duda";
        else toReturn = "Tidak Diketahui";
        break;
      case "status_code":
        toReturn = value
          .toLowerCase()
          .split("_")
          .map(
            kebab =>
              kebab
                .toLowerCase()
                .charAt(0)
                .toUpperCase() + kebab.slice(1)
          )
          .join(" ");
        break;
      case "qa_criteria":
        toReturn = value.toLowerCase() === "hse" ? "HSE" : "Quality";
        break;
      case "handling_category":
        if (value === "corporate") toReturn = "Corporate";
        else if (value === "department") toReturn = "Departemen";
        else toReturn = "Proyek";
        break;
      case "risk_level":
        if (value === 1) toReturn = "Rendah";
        else if (value === 2) toReturn = "Sedang";
        else toReturn = "Tinggi";
        break;
      case "single_number_type":
        if (value === "smk3l") toReturn = "SMK3L";
        else if (value === "mm") toReturn = "Manajemen Mutu";
        else toReturn = "Penilaian 5R";
        break;
      case "is_structural":
        toReturn = value ? "Jabatan Struktural" : "Jabatan non Struktural";
        break;
      case "is_plt":
        toReturn = value === true ? "PLT" : "Non PLT";
        break;
      case "is_mpp":
        toReturn = value === true ? "MPP" : "Non MPP";
        break;
      case "sync":
        toReturn =
          value === "not_synchronized_yet"
            ? "Belum di Sinkronkan"
            : "Sudah di Sinkronkan";
        break;
      case "holiday":
        toReturn = value === "holiday" ? "Hari Libur" : "Hari Kerja";
        break;
      case "is_kiw":
        toReturn = value === "kiw" ? "KIW" : "Eksternal";
        break;
      case "finished":
        toReturn = value === "finished" ? "Sudah Selesai" : "Belum Selesai";
        break;
      case "cm":
        toReturn = value + " cm";
        break;
      case "CmToM":
        if (value) {
          toReturn = (parseFloat(value) * 0.01).toFixed(2) + " m";
        } else {
          toReturn = null;
        }
        break;
      case "rainfall":
        toReturn = value + " mm";
        break;
      case "humidity":
        toReturn = value + " %";
        break;
      case "temperature":
        toReturn = value + " °C";
        break;
      default:
        toReturn = value;
    }
  } else {
    switch (id.split("-")[0]) {
      case "prefix":
        toReturn = id.split("-")[1] + " " + value;
        break;
      case "suffix":
        toReturn = value + " " + id.split("-")[1];
        break;
      default:
        toReturn = value;
    }
  }
  return toReturn;
});
export default {
  name: "filterTemplate"
};
