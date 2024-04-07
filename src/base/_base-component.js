import Vue from 'vue'
import BaseDetail from './main-detail.vue'
import BaseForm from './main-form.vue'
import BaseTable from './main-table.vue'
import BaseCard from './main-card.vue'
import BaseCRUD from './main-crud.vue'

import compSingleUpload from './component/single-upload'
import compMultiUpload from './component/multiple-upload'
import compLookupInput from './component/lookup-input'
import compLookupAdd from './component/lookup-add'
import compMappingInput from './component/mapping-input'
import compSingleInput from './component/single-input'
import compTableInput from './component/table-input'
import gmaps from './component/gmap.vue'

import approvalSection from '@/base/component/approval-section'

import tableDetail from '@/base/component/table-detail'

import notFound from '../default-page/404.vue'

Vue.component('tas-base-table', BaseTable)
Vue.component('tas-base-card', BaseCard)
Vue.component('tas-base-form', BaseForm)
Vue.component('tas-base-detail', BaseDetail)
Vue.component('tas-base-crud', BaseCRUD)
Vue.component('s-input', compSingleInput)
Vue.component('single-upload', compSingleUpload)
Vue.component('multi-upload', compMultiUpload)
Vue.component('lookup-input', compLookupInput)
Vue.component('lookup-add', compLookupAdd)
Vue.component('mapping-input', compMappingInput)
Vue.component('table-input', compTableInput)
Vue.component('not-found', notFound)
Vue.component('g-maps', gmaps)

Vue.component('approval-section', approvalSection)
Vue.component('table-detail', tableDetail)
