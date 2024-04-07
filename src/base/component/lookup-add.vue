<template>
  <!-- <div class="lookup-wrapper">
        <button type="button" @click="openModal()" :class="classes" class="btn btn-light-info btn-block text-truncate">{{ caption | parse(pipeLabel) }}</button>
    </div> -->
  <div>
    <button @click="openModal()" class="btn btn-sm btn-outline-primary float-right mt-2 mb-2">
      <span>
        <i class="ri-add-line btn-icon"></i>
      </span>
      Tambah baru
    </button>

    <b-modal ref="lookup-modal-s" id="lookup-modal-s" :centered="true" :hide-footer="true" :hide-header="true" :size="'xl'" @hide="$emit('input', revertValue(modelData))">
      <h1>
        adsa
      </h1>
    </b-modal>
  </div>

</template>

<script>
export default {
  name: 'lookup-add',
  props: {
    // title: { type: String, required: false, default: '' },
    // value: { required: true },
    // multiple: { type: Boolean, required: false, default: true },
    // endpoint: { type: String, required: true },
    // param: { type: Object, required: false },
    // placeholder: { type: String, required: false },
    // pointer: { type: Object, required: false },
    // errors: { type: Array, required: false },
    // classes: { type: Object, required: false },
    // defaultCaption: { type: String, required: false, default: null }
  },
  data () {
    return {
      // dataList: null,
      // tableHeader: null,
      // paramAPI: {
      //   search: null,
      //   page: 1,
      //   limit: 10
      // },
      // inputSearch: null,
      // maxPage: 0,
      // temp_page: 1,
      // modelData: this.multiple ? [] : {},
      // selectedOffset: 0,
      // errorList: false
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    openModal () {
      this.$refs['lookup-modal-s'].show()
    }
  }

}
</script>
