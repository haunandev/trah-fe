<template>
    <b-card class="h-100">
      <!-- loading spinner -->
      <div v-if="isLoading" class="card-img-overlay d-flex align-items-center justify-content-center flex-column" style="background-color: #ffffffaa;z-index: 2;">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mr-2 text-muted">{{ $t('global.loading') }} ...</div>
          <div class="spinner spinner-primary mr-10"></div>
        </div>
      </div>
      <b-card-title>
        <h1 class="mb-2">
          Selamat {{ time.isMorning() }},
          {{profile.fullname || '' }}!
        </h1>
        <p>
          <span v-if="time.date">
            {{ time.date || '-' }}.
            {{ time.clock || '-' }}
          </span>
        </p>
      </b-card-title>
      <p>Selamat datang di Nursery Management System (NMS) {{ mode == 'development' ? 'Development' : '' }} Trees4Trees.</p>
      <div class="d-flex align-items-center mt-5">
        <div class="symbol symbol-100 mr-5">
          <div v-if="profile.img_photo_user" class="symbol-label" :style="{backgroundImage: 'url(' + profile.img_photo_user.url + ')' }"></div>
          <div v-else class="symbol-label" style="background-image: url(/static/img/default/no-profile.svg)"></div>
          <i class="symbol-badge bg-success"></i>
        </div>
        <div class="d-flex flex-column">
          <p class="mb-1">Anda log in menggunakan akun,</p>
          <table-detail
            style="font-weight: bold;"
            :items="tableDetailProfile"
          ></table-detail>
        </div>
      </div>
    </b-card>
</template>

<script>
import mode from "@/mode.js";

export default {
  name: 'NurseryFeGreetings',

  data() {
    return {
      isLoading: true,
      mode: mode || 'development',
      profile: {},
      tableDetailProfile: [],
      time: {
        isMorning() {
          const hour = new Date().getHours()
          let time = ''
          if (hour < 12) time = 'Pagi'
          if (hour >= 12 && hour < 15) time = 'Siang'
          if (hour >= 15 && hour < 18) time = 'Sore'
          if (hour >= 18 && hour < 24) time = 'Malam'
          return `${time}`
        },
        date: '',
        clock: ''
      },
    };
  },

  mounted() {
    // set clock
    this.dateTimeNow()
    // init profile data
    this.initProfile()
  },

  methods: {
    dateTimeNow() {
      this.time.date = new Date().toLocaleDateString('ID', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      setInterval(() => {
        this.time.clock = new Date().toLocaleTimeString('US')
      }, 100)
    },
    initProfile: async function () {
      this.isLoading = true
      try {
        let profile = this.$_sys.userInfo()
        const tableDetailProfileItems = [{
          label: 'Nama',
          value: profile.fullname
        },{
          label: 'Posisi',
          value: profile.role_name
        }]
        if (profile.location_nursery_id) {
          const nursery = await this.$_api.single('master_location_nurserys', null, profile.location_nursery_id).then(res => res.data)
          tableDetailProfileItems.push({
            label: 'Lokasi Persemaian',
            value: nursery ? nursery.name_location_nursery : '???'
          })
        }

        this.profile = profile
        this.tableDetailProfile = tableDetailProfileItems
      } catch (err) {
        console.log('initProfile() error', err)
        this.$_alert.error(err)
      } finally {
        this.isLoading = false
      }
    },
  },
};
</script>