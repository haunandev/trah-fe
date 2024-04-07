import Vue from 'vue'
import moment from 'moment'
import config from '../config'
import axios from 'axios'
import 'moment-precise-range-plugin'

const gekoAuth = {
  access_token: null,
  last_login: null
}

const _mixins = {
  programYear(type) {
    return config.programYear[type || 'active']
  },
  userInfo() {
    return JSON.parse(localStorage.getItem('profile'))
  },
  read (value) {
    console.log(value)
  },
  checkInternetConnection() {
    const isOnline = window.navigator.onLine
    if (isOnline) return 'online'
    else return 'offline'
  },
  enumerateDaysBetweenDates(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(moment(currDate.clone().toDate()).format('YYYY-MM-DD'));
    }

    return dates;
  },
  totalDaysBetweenDates(startDate, endDate) {
    var currDate = moment(startDate);
    var lastDate = moment(endDate);
    return lastDate.diff(currDate, 'days') + 1
  },
  preciseDiffDate(startDate, endDate) {
    if (startDate && endDate) {
      return moment.preciseDiff(startDate, endDate)
    }
    return ''
  },
  dateFormat(date, format) {
    if (date) {
      return moment(date).format(format)
    }
    return date
  },
  addDate(date, format, add, type) {
    if (date) {
      return moment(date).add(add, type).format(format)
    }
    return date
  },
  subtractDate(date, format, subtract, type) {
    if (date) {
      return moment(date).subtract(subtract, type).format(format)
    }
    return date
  },
  dateNow (format) {
    return moment(new Date()).format(format)
  },
  monthNow (format) {
    return moment(new Date().setDate(1)).format(format)
  },
  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    const rgb = `${r}, ${g}, ${b}`
    return result ? rgb : null;
  },
  objSort (property, sort) {
    var sortOrder = sort ? 1 : -1
    return function (a, b) {
      /*
       * next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  },
  isAllowed (permission) {
    if (permission && localStorage.getItem('profile')) {
      if (permission === 'template-allow-all') return true
      else {
        if (JSON.parse(localStorage.getItem('profile'))['role_id'] === -1) {
          return true
        } else {
          const _permission =
            JSON.parse(localStorage.getItem('permission')) || []
          return Boolean(_permission.includes(permission))
        }
      }
    } else return false
  },
  relSeparator (item, index) {
    let arr = item.split('-')
    return arr[index]
  },
  snakeToCapitalized(str) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  },
  togleClass (id, classname, boolean) {
    let component = document.getElementById(id)
    if (component) {
      if (boolean) {
        component.classList.add(classname)
      } else {
        component.classList.remove(classname)
      }
    }
  },
  changeLocale (language = 'id') {
    Vue.$i18n.locale = language
  },
  cleansingObj (obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  },
  lock_period (date) {
    const now = new Date()

    const thisMonth = new Date()
    thisMonth.setDate(25)

    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    nextMonth.setDate(25)

    const prevMonth = new Date()
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    prevMonth.setDate(25)

    if (now.getDate() <= 25) {
      return date < prevMonth || date > thisMonth
    } else {
      return date < thisMonth || date > nextMonth
    }
  },
  lockNow (date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return (
      date < today || date > new Date(today.getTime() + 1 * 23 * 3600 * 1000)
    )
  },
  async geocodeFromCoordinate (latitude, longitude) {
    if (!latitude || !longitude) {
      return {
        success: false,
        error_message: 'Latitude & Longitude value is mandotary'
      }
    }

    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.apikey.gmap}`
        )
        .then(async response => {
          const addressComponent = response.data.results[0].address_components
          const addressObject = {
            route: '',
            streetNumber: '',
            village: '',
            subdistrict: '',
            district: '',
            province: '',
            country: '',
            postal_code: ''
          }

          for (const value of addressComponent) {
            if (value.types.includes('street_number')) {
              addressObject.streetNumber = value.short_name
            } else if (value.types.includes('route')) {
              addressObject.route = value.short_name
            } else if (value.types.includes('administrative_area_level_5')) {
              addressObject.village = value.short_name
            } else if (value.types.includes('administrative_area_level_4')) {
              addressObject.subdistrict = value.short_name
            } else if (value.types.includes('administrative_area_level_3')) {
              addressObject.district = value.short_name
            } else if (value.types.includes('administrative_area_level_2')) {
              addressObject.province = value.short_name
            } else if (value.types.includes('administrative_area_level_1')) {
              addressObject.country = value.short_name
            } else if (value.types.includes('postal_code')) {
              addressObject.postal_code = value.short_name
            } else {
            }
          }
          addressObject.pinLink =
            'https://www.google.com/maps/search/?api=1&query=' +
            latitude +
            ',' +
            longitude

          const position = await this.getCoordinates()

          addressObject.directionLink =
            'https://www.google.com/maps?saddr=' +
            position.coords.latitude +
            ',' +
            +position.coords.longitude +
            '&daddr=' +
            latitude +
            ',' +
            longitude

          // Buang karakter Kec.
          addressObject.district = addressObject.district.replace('Kec. ', '')

          if (!addressObject.route) addressObject.route = 'Unnamed Road'
          return resolve({
            success: true,
            result: {
              formatted_address: response.data.results[0].formatted_address,
              ...addressObject
            }
          })
        })
    })
  },
  getCoordinates () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      })
    })
  },
  numToSSColumnLetter (num) {
    // eslint-disable-next-line one-var
    let columnLetter = '',
      t

    while (num > 0) {
      t = (num - 1) % 26
      columnLetter = String.fromCharCode(65 + t) + columnLetter
      num = ((num - t) / 26) | 0
    }
    return columnLetter || undefined
  },
  toggleFullscreen (ref) {
    const elem = this.$refs[ref]
    // Note: this fullscreen check does not work on IE11
    const isFullscreen = document.fullscreenElement !== null

    if (isFullscreen) {
      this.closeFullscreen()
    } else {
      this.openFullscreen(elem)
    }
  },
  openFullscreen (elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen()
    }
  },
  closeFullscreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen()
    }
  },
  getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  },
  getLatLongFromCoordinates(type, coordinate) {
    if (!coordinate) return;

    const coordinatesPattern = /^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/;
    if (!coordinatesPattern.test(coordinate)) return 'Invalid coordinate number.';

    const splitted = coordinate.replace(/\s/g,'').split(',')
    const split1 = splitted[0]
    const split2 = splitted[1]
    
    var latitudeRegex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    var longitudeRegex = /^(-?([1-9]?\d(?:\.\d{1,18})?|1[0-7]\d(?:\.\d{1,18})?|180(?:\.0{1,18})?))$/;

    if (type == 'latitude') {
      if (latitudeRegex.test(split1)) return split1
      else if (latitudeRegex.test(split2)) return split2
      else return false
    } else if (type == 'longitude') {
      if (latitudeRegex.test(split1)) return split2
      else return split1
    }

    return;
  },
  async apiGekoCall(method, endpoint, data = null) {
    const base_url = config.geko.apiUrl
    let access_token = gekoAuth.access_token
    let last_login = gekoAuth.last_login
    let session_end = false
    if (last_login) {
      const diff = moment(last_login).diff(this.dateNow())
      if (diff >= 1800000) session_end = true
    }
    if (!access_token || session_end) {
      const login = await axios.post(`${base_url}LoginWeb`, config.geko.user)
      if (login) {
        access_token = login.data.data.result.access_token
        last_login = this.dateNow()
        gekoAuth.access_token = access_token
        gekoAuth.last_login = last_login
        session_end = false
      }
    }
    if (access_token && !session_end) {
      if (method == 'get'){
        const call = await axios.get(base_url + endpoint, {
          params: data || {},
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        return call
      }
      if (method == 'post'){
        const call = await axios.post(base_url + endpoint, data, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        return call
      }
      return `method "${method}" invalid`
    } else {
      return 'GEKO Unauthenticated'
    }
  },
  // www.malasngoding.com
  terbilang(nilai) {
    // deklarasi variabel nilai sebagai angka matemarika
    // Objek Math bertujuan agar kita bisa melakukan tugas matematika dengan javascript
    nilai = Math.floor(Math.abs(nilai));
    
    // deklarasi nama angka dalam bahasa indonesia
    var huruf = [
      '',
      'Satu',
      'Dua',
      'Tiga',
      'Empat',
      'Lima',
      'Enam',
      'Tujuh',
      'Delapan',
      'Sembilan',
      'Sepuluh',
      'Sebelas',
    ];
    
    // menyimpan nilai default untuk pembagian
    var bagi = 0;
    // deklarasi variabel penyimpanan untuk menyimpan proses rumus terbilang
    var penyimpanan = '';
    
    // rumus terbilang
    if (nilai < 12) {
      penyimpanan = ' ' + huruf[nilai];
    } else if (nilai < 20) {
      penyimpanan = this.terbilang(Math.floor(nilai - 10)) + ' Belas';
    } else if (nilai < 100) {
      bagi = Math.floor(nilai / 10);
      penyimpanan = this.terbilang(bagi) + ' Puluh' + this.terbilang(nilai % 10);
    } else if (nilai < 200) {
      penyimpanan = ' Seratus' + this.terbilang(nilai - 100);
    } else if (nilai < 1000) {
      bagi = Math.floor(nilai / 100);
      penyimpanan = this.terbilang(bagi) + ' Ratus' + this.terbilang(nilai % 100);
    } else if (nilai < 2000) {
      penyimpanan = ' Seribu' + this.terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
      bagi = Math.floor(nilai / 1000);
      penyimpanan = this.terbilang(bagi) + ' Ribu' + this.terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
      bagi = Math.floor(nilai / 1000000);
      penyimpanan = this.terbilang(bagi) + ' Juta' + this.terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
      bagi = Math.floor(nilai / 1000000000);
      penyimpanan = this.terbilang(bagi) + ' Miliar' + this.terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
      bagi = Math.floor(nilai / 1000000000000);
      penyimpanan = this.terbilang(nilai / 1000000000000) + ' Triliun' + this.terbilang(nilai % 1000000000000);
    }
  
    // mengambalikan nilai yang ada dalam variabel penyimpanan
    return penyimpanan;
  }
}
export default _mixins
