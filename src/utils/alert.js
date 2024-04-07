import Vue from "vue";

const _alert = {
  show(option) {
    return Vue.swal(option);
  },
  error(err, title = null, text = null, toast = false, icon = null) {
    return Vue.swal({
      position: "center",
      icon: icon || "error",
      title: title || "Error",
      text: toast ? '' : text || (err && err.data ? err.data.message : (err || 'Error')),
      toast: toast,
      position: toast ? "top-right" : "center",
      timer: 3000,
      showConfirmButton: false,
      didOpen: () => {
        Vue.swal.hideLoading()
      },
    });
  },
  success(title = null, text = null) {
    return Vue.swal({
      position: "top-right",
      icon: "success",
      title: title || text,
      // text: text,
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  },
  confirm(title = null, text = null, agree = null, disagree = null) {
    return Vue.swal({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonColor: "#6e9a34",
      cancelButtonColor: "#868e96",
      confirmButtonText: agree || "Ya, Lanjutkan",
      cancelButtonText: disagree || "Batalkan"
    });
  },
  confirmWithDeny(title = null, text = null, agree = null, disagree = null, agreeColor = null, denyColor = null) {
    return Vue.swal({
      title: title,
      text: text,
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonColor: agreeColor || "#6e9a34",
      cancelButtonColor: "#d4d4d4",
      denyButtonColor: denyColor || "#f44336",
      confirmButtonText: agree || "Ya, Lanjutkan",
      denyButtonText: disagree || "Batalkan",
      cancelButtonText: 'Kembali'
    });
  },
  loading(html = null, toast = null) {
    return Vue.swal({
      title: toast ? (html || 'Memuat ...') : '',
      toast: toast || false,
      position: toast ? "top-right" : "center",
      allowOutsideClick: false,
      showCloseButton: false,
      html: toast ? '' : (html || 'Memuat ...'),
      didOpen: () => {
        Vue.swal.showLoading()
      },
    })
  }
};

export default _alert;
