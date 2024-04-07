<template>
  <div
    class="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
    id="kt_login"
  >
    <!--begin::Aside-->
    <div
      class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden"
    >
      <!--begin: Aside Container-->
      <div
        class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-7 py-lg-13 px-lg-35"
      >
        <!--begin::Logo-->
        <router-link :to="{ path: '/login' }" class="text-center pt-2">
          <img :src="$_config.logo.lg" alt="Logo" class="max-h-90px" />
        </router-link>
        <!--end::Logo-->
        <!--begin::Aside body-->
        <div class="d-flex flex-column-fluid flex-column flex-center">
          <!--begin::Signin-->
          <div
            v-if="state === 'signin'"
            :class="[state === 'signin' ? 'd-block' : 'd-none']"
            class="login-form login-signin py-11"
          >
            <!--begin::Form-->
            <b-overlay :show="isLoading" rounded="sm">
              <form
                @submit="loginState($event)"
                class="form fv-plugins-bootstrap fv-plugins-framework"
                novalidate="novalidate"
                id="kt_login_signin_form"
              >
                <!--begin::Title-->
                <div class="text-center pb-20">
                  <h2
                    class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg"
                  >
                    Selamat Datang di <br />{{ $_config.name }}
                  </h2>
                  <!-- <span
                    v-if="$_config.options.allowRegister"
                    class="text-muted font-weight-bold font-size-h4"
                    >belum memiliki akun?
                    <router-link
                      :to="{ path: '/register' }"
                      class="pointer text-primary font-weight-bolder"
                      id="kt_login_signup"
                      >Buat Akun Baru
                    </router-link>
                  </span> -->
                </div>
                <!--end::Title-->
                <!--begin::Form group-->
                <div class="form-group fv-plugins-icon-container has-success">
                  <label class="font-size-h6 font-weight-bolder text-dark"
                    >Email / Username</label
                  >
                  <input
                    v-model.lazy.trim="username"
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg "
                    type="text"
                    name="username"
                    autocomplete="off"
                  />
                  <div class="fv-plugins-message-container"></div>
                </div>
                <!--end::Form group-->
                <!--begin::Form group-->
                <div class="form-group fv-plugins-icon-container has-success">
                  <div class="d-flex justify-content-between mt-n5">
                    <label
                      class="font-size-h6 font-weight-bolder text-dark pt-5"
                      >Password</label
                    >
                    <a
                      v-if="$_config.options.forgetPassword"
                      @click="state = 'forgot'"
                      class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5 pointer"
                      id="kt_login_forgot"
                      >Lupa Password ?</a
                    >
                  </div>
                  <input
                    v-model.lazy.trim="password"
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg "
                    type="password"
                    name="password"
                    autocomplete="off"
                  />
                  <div class="fv-plugins-message-container"></div>
                </div>
                <!--end::Form group-->
                <div
                  v-if="errorLogin"
                  class="alert alert-custom alert-default p-2"
                  role="alert"
                >
                  <div class="alert-icon">
                    <i class="ri-error-warning-fill text-danger"></i>
                  </div>
                  <div class="alert-text">
                    {{ errorLogin }}
                    <p class="mt-3 mb-0" v-if="showResendEmail">
                      Belum mendapat email Verifikasi? <br /><a
                        class="text-primary pointer"
                        @click="resendVerification()"
                        >Kirim ulang
                        <span v-if="resendWaiting > 0"
                          >({{ resendWaiting }})</span
                        >
                      </a>
                    </p>
                  </div>
                </div>
                <!--begin::Action-->
                <div class="text-center pt-2">
                  <button
                    id="kt_login_signin_submit"
                    class="pointer btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  >
                    Masuk
                  </button>
                </div>
              </form>
            </b-overlay>
            <!--end::Form-->
          </div>
          <!--end::Signin-->
          <!--begin::Forgot-->
          <div
            v-if="state === 'forgot'"
            :class="[state === 'forgot' ? 'd-block' : 'd-none']"
            class="login-form login-forgot pt-11"
          >
            <!--begin::Form-->
            <form
              @submit.prevent="forgetPassword()"
              class="form fv-plugins-bootstrap fv-plugins-framework"
              novalidate="novalidate"
              id="kt_login_forgot_form"
            >
              <!--begin::Title-->
              <div class="text-center pb-8">
                <h2
                  class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg"
                >
                  Lupa Password ?
                </h2>
                <p class="text-muted font-weight-bold font-size-h4">
                  Kami Akan mengirimkan link untuk mengganti password ke Email
                  Anda
                </p>
              </div>
              <!--end::Title-->
              <!--begin::Form group-->
              <div class="form-group fv-plugins-icon-container">
                <input
                  v-model="forgetEmail"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Ketikkan email Anda"
                  name="email"
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container"></div>
              </div>
              <!--end::Form group-->
              <div
                v-if="errorLogin"
                class="alert alert-custom alert-default p-2"
                role="alert"
              >
                <div class="alert-icon">
                  <i class="ri-error-warning-fill text-danger"></i>
                </div>
                <div class="alert-text">{{ errorLogin }}</div>
              </div>
              <!--begin::Form group-->
              <div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
                <button
                  :disabled="!forgetEmail"
                  type="submit"
                  id="kt_login_forgot_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
                >
                  Kirim
                </button>
                <button
                  @click="state = 'signin'"
                  type="button"
                  id="kt_login_forgot_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4"
                >
                  Batal
                </button>
              </div>
              <!--end::Form group-->
              <div></div>
            </form>
            <!--end::Form-->
          </div>
          <div
            v-if="state === 'forgot-success'"
            :class="[state === 'forgot-success' ? 'd-block' : 'd-none']"
            class="login-form login-forgot pt-11"
          >
            <div class="text-center pb-8">
              <h2
                class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg"
              >
                Email Terkirim
              </h2>
              <div class="text-muted font-weight-bold font-size-h4">
                Silahkan periksa Email Anda, atau <br />
                <a
                  @click="state = 'signin'"
                  class="text-primary font-weight-bold pointer text-hover-primary"
                  >Ke Halaman Login
                </a>
              </div>
            </div>
          </div>
          <!--end::Forgot-->
        </div>
        <!--end::Aside body-->
        <!--begin: Aside footer for desktop-->
        <div class="text-center">
          <a
            v-if="$_config.guide"
            :href="$_config.guide"
            target="_blank"
            class="text-muted text-hover-info"
          >
            <span class="d-block font-weight-bold mb-2">
              Panduan Penggunaan</span
            >
            <span class="font-weight-bolder font-size-h5">{{
              $_config.name
            }}</span>
          </a>
          <span v-else class="font-weight-bolder font-size-h5 text-muted">{{
            $_config.name
          }}</span>
        </div>
        <!--end: Aside footer for desktop-->
      </div>
      <!--end: Aside Container-->
    </div>
    <!--begin::Aside-->
    <!--begin::Content-->
    <div
      class="content order-1 order-lg-2 d-flex flex-column w-100 pb-0 aside-bg"
    >
      <!--begin::Title-->
      <div
        class="d-flex flex-column justify-content-center text-center pt-lg-40 pt-md-5 pt-sm-5 px-lg-0 pt-5 px-7"
      >
        <h3
          class="display4 font-weight-bolder mb-7 mt-20 text-white"
          style="color: #986923;"
        >
          {{ $_config.company }}
        </h3>
        <h3
          class="display2 font-weight-bolder my-7 text-white"
          style="color: #986923;"
        >
          {{ $_config.name }}
        </h3>
        <p
          class="font-weight-bolder font-size-h2-md font-size-lg text-dark opacity-70"
        ></p>
      </div>
      <!--end::Title-->
      <!--begin::Image-->
      <!-- <div class="content-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-center" style="background-image: url(/static/img/default/login.svg);"></div> -->
      <!--end::Image-->
    </div>
    <!--end::Content-->
  </div>
</template>
<style scoped>
.aside-bg {
  background-image: url("/static/img/default/login.svg");
  background-color: #492c9e;
  background-repeat: no-repeat;
  background-clip: content-box;
  background-size: cover;
  /* background-position: right bottom; */
  background-position: center center;
}
.login.login-2 .login-forgot,
.login.login-2 .login-signin,
.login.login-2 .login-signup {
  display: none;
}
.login.login-2.login-signin-on .login-signup {
  display: none;
}
.login.login-2.login-signin-on .login-signin {
  display: block;
}
.login.login-2.login-signin-on .login-forgot {
  display: none;
}
.login.login-2.login-signup-on .login-signup {
  display: block;
}
.login.login-2.login-signup-on .login-signin {
  display: none;
}
.login.login-2.login-signup-on .login-forgot {
  display: none;
}
.login.login-2.login-forgot-on .login-signup {
  display: none;
}
.login.login-2.login-forgot-on .login-signin {
  display: none;
}
.login.login-2.login-forgot-on .login-forgot {
  display: block;
}
.login.login-2 .content .content-img {
  min-height: 450px;
}
@media (min-width: 992px) {
  .login.login-2 .login-aside {
    width: 100%;
    max-width: 600px;
  }
  .login.login-2 .content .content-img {
    min-height: 600px !important;
  }
  .login.login-2 .login-form {
    width: 100%;
    max-width: 450px;
  }
}
@media (min-width: 992px) and (max-width: 1399.98px) {
  .login.login-2 .login-aside {
    width: 100%;
    max-width: 600px;
  }
}
@media (max-width: 991.98px) {
  .login.login-2 .content .content-img {
    min-height: 470px !important;
    background-size: 700px;
  }
  .login.login-2 .login-form {
    width: 100%;
    max-width: 400px;
  }
}
@media (max-width: 575.98px) {
  .login.login-2 .content .content-img {
    min-height: 280px !important;
    background-size: 400px;
  }
  .login.login-2 .login-form {
    width: 100%;
    max-width: 100%;
  }
}
</style>
<script>
export default {
  name: "login-page",
  data() {
    return {
      state: "signin",
      username: "",
      password: "",
      errorLogin: null,
      forgetEmail: null,
      showResendEmail: false,
      tmp_user: null,
      resendWaiting: 0,
      isLoading: false
    };
  },
  methods: {
    loginState(e) {
      e.preventDefault();
      if (this.username && this.password) {
        let data = { username: this.username, password: this.password };
        this.isLoading = true;
        this.$_api
          .post("/login", data)
          .then(res => {
            this.isLoading = false;
            if (res) this.saveProfile(res);
            else this.actionUser(res.data_user_before_login, res.message);
          })
          .catch(err => {
            this.isLoading = false;
            this.errorLogin = err.data.message;
            let msg = JSON.parse(err.data.message);
            this.errorLogin = msg.errorMessage;
          });
        this.errorLogin = null;
      } else {
        this.errorLogin = "Username & Password harus diisi";
      }
    },
    actionUser(data, message) {
      this.tmp_user = data;
      if (data.status_code === "email_unverified") {
        this.showResendEmail = true;
        this.errorLogin = message;
      } else if (data.status_code === "email_verified") {
        this.$router.push({ name: "waiting-apps", params: { user: data } });
      }
    },
    resendVerification() {
      if (this.resendWaiting === 0) {
        this.$_api
          .post("/request_email_verification", this.tmp_user)
          .then(res => {
            this.resendWaiting = 60;
            this.setWaiting();
          })
          .catch(err => {
            this.errorLogin = err.data.message;
          });
      }
    },
    setWaiting() {
      setTimeout(() => {
        if (this.resendWaiting > 0) {
          this.resendWaiting--;
          this.$nextTick();
          this.setWaiting();
        }
      }, 1000);
    },
    async saveProfile(e) {
      this.$store.commit("set", ["profile", e.user, true]);
      this.$store.commit("set", ["_token", e.token, true]);
      this.$store.commit("set", ["permission", e.tasks, true]);
      await this.$store.dispatch("setModule");
      this.$router.push({ name: "main-module" });
    },
    forgetPassword() {
      this.$_api
        .post("/request_forgot_password", { email: this.forgetEmail })
        .then(res => {
          this.forgetEmail = null;
          this.state = "forgot-success";
        })
        .catch(err => {
          this.errorLogin = err.data.message;
        });
    }
  }
};
</script>
