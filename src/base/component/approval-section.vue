<template>
  <b-card class="animated" :title="`Persetujuan ${config.label || ''}`">
    <b-row>
      <b-col md="6" sm="12">
        <b-card-text>
          <p>
            Apakah anda yakin untuk {{ $t("global.approve") }}
            {{ config.label.toLowerCase() }} ini?
          </p>
        </b-card-text>
      </b-col>
      <b-col md="6" sm="12">
        <div class="float-right">
          <button
            @click="confirmation('approved')"
            class="btn btn-primary mr-3"
          >
            {{ $t("global.approve") }}
          </button>
          <button @click="confirmation('rejected')" class="btn btn-danger">
            {{ $t("global.reject") }}
          </button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    config: {
      required: true
    }
  },
  methods: {
    async confirmation(status) {
      // show confirmation swal
      const statusText = status === "approved" ? "menyetujui" : "menolak";
      const btnColor = status === "approved" ? "#6e9a34" : "#9b0000";
      const confirm = await this.$swal({
        title: "Perhatian!",
        html: `Apakah anda yakin untuk ${statusText} ${this.config.label.toLowerCase()} ini?`,
        icon: "warning",
        input: "textarea",
        inputLabel: "Catatan :",
        inputPlaceholder: "Ketik catatan disini...",
        showConfirmButton: true,
        confirmButtonColor: btnColor,
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Tidak Jadi"
      });
      if (confirm.isConfirmed) {
        if (status !== "approved" && !confirm.value) {
          this.$swal({
            title: "Masalah!",
            text: "Anda belum mengisi catatan!",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#9b0000",
            confirmButtonText: "Oh, oke",
            showCancelButton: false
          });
        } else {
          // do approval
          try {
            const loading = this.$swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              title: this.$t("global.loading"),
              width: 600,
              padding: "3em",
              color: "#716add",
              background: "#fff",
              timer: 10000,
              backdrop: `
                                rgba(0,0,0,0.4)
                                left top
                                no-repeat
                            `,
              didOpen: () => {
                this.$swal.showLoading();
              }
            });
            const dataToStore = {
              id: this.config.id,
              table: this.config.table,
              status: status,
              description: confirm.value
            };
            const approve = await this.$_api.post(
              "/custom/verification",
              dataToStore
            );
            loading.close();
            if (approve.status == "error") {
              this.$swal({
                title: "Masalah!",
                text: approve.message,
                icon: "warning",
                showConfirmButton: true,
                confirmButtonColor: "#9b0000",
                confirmButtonText: "Waduh, oke",
                showCancelButton: false
              });
            } else this.goBack();
          } catch (err) {
            this.$swal({
              title: "Masalah!",
              text: err.message,
              icon: "warning",
              showConfirmButton: true,
              confirmButtonColor: "#9b0000",
              confirmButtonText: "Waduh, oke",
              showCancelButton: false
            });
          }
        }
      }
    },
    goBack() {
      if (this.config.backRoute) this.$router.push(this.config.backRoute);
      else this.$router.go(-1);
    }
  }
};
</script>
