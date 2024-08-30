<script setup lang="ts">
import { ref} from 'vue';
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
import axios from 'axios';

const firstName = ref<string>('');
const lastName = ref<string>('');
const workEmail = ref<string>('');
const phoneNumber = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const otpPhone = ref<string>('');
const otpEmail = ref<string>('');
const valid = ref<boolean[]>([false, false, false, false]);
const forms = ref<(HTMLFormElement | null)[]>([]);
const step = ref<number>(1);

const { handleExecute } = useRecaptcha();

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
  handleExecute(widgetId);
};

const checkOtp = (otp: string, index: number, validOtp: string) => {
  if (otp === validOtp) {
    valid.value[index] = true;
    goNext();
  } else {
    alert('Please Enter OTP');
  }
};

const goNext = () => {
  const currentForm = forms.value[step.value - 1] as HTMLFormElement;
  currentForm?.validate();
 
  if(valid.value[step.value - 1])
  {
    //send axios request
    step.value++;
  } 
};

const goBack = () => {
  step.value--;
};

const handleNextClick = () => {
  alert('Next clicked');
};

const resendOtpEmail = () => {
  alert('Resend OTP Email');
};

const resendOtpPhone = () => {
  alert('Resend OTP Phone');
};
</script>

<template>
<div>
  <div class="d-flex justify-center mb-6">
    <template v-if="step == 1">
      <v-card flat class="my-5 signup-form">
        <h2 class="mb-5">Create your account</h2>
        <v-form v-model="valid[0]" ref="el => forms.value[0] = el">
          <v-text-field
            v-model="firstName"
            label="First Name"
            :rules="[v => !!v || 'First name is required']"
            :error-messages="!firstName ? ['First name is required'] : []"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last Name"
            :rules="[v => !!v || 'Last name is required']"
            :error-messages="!lastName ? ['Last name is required'] : []"
            required
          ></v-text-field>
          <v-text-field
            v-model="workEmail"
            label="Work Email Address"
            :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
            :error-messages="!workEmail ? ['Email is required'] : []"
            required
          ></v-text-field>
          <p class="mt-3">
            By clicking "Next" you agree to our
            <a href="https://qeeping.se/terms-and-conditions?locale=en_US" target="_blank">Terms & Conditions</a>
            and
            <a href="https://qeeping.se/privacy-policy?locale=en_US" target="_blank">Privacy Policy</a>.
          </p>
          <div class="d-flex justify-right mb-5">
            <v-btn @click="goNext" variant="flat" color="blue-darken-1" class="mt-3">Next</v-btn>
          </div>
          <RecaptchaV2 @widget-id="handleWidgetId" size="invisible" />
        </v-form>
      </v-card>
    </template>

    <template v-if="step == 2">
      <v-card flat class="my-5 signup-form text-center">
        <h3 class="h6 mb-2">
          Please enter the one time password to verify your account
        </h3>
        <div>A code has been sent to {{ workEmail }}</div>
        <v-form v-model="valid[1]" ref="el => forms.value[1] = el">
          <v-otp-input
            v-model="otpEmail"
            length="6"
            @finish="() => checkOtp(otpEmail, 1, '159909')"
          ></v-otp-input>
          <div class="d-flex justify-center mb-5 mt-3">
            <div><v-btn @click="goBack" variant="flat" color="grey" class="mr-2">Go back</v-btn></div>
            <div><v-btn @click="() => checkOtp(otpEmail, 1, '159909')" variant="flat" color="blue-darken-1" class="ml-2 pl-5 pr-5">Verify</v-btn></div>
          </div>
          <div class="text-caption">
            Didn't receive the code? <a href="#" @click.prevent="resendOtpEmail">Resend</a>
          </div>
        </v-form>
      </v-card>
    </template>

    <template v-if="step == 3">
      <v-card flat class="my-5 signup-form text-center">
        <h2 class="mb-5">Please enter your phone number and choose a password</h2>
        <v-form v-model="valid[2]" ref="el => forms.value[2] = el">
          <v-phone-input v-model="phoneNumber"
            :error-messages="!phoneNumber ? ['Phone Number is required'] : []"
             />
          <v-text-field
            v-model="password"
            label="Password"
            :type="'password'"
            :rules="[
              v => !!v || 'Password is required'
            ]"
             :error-messages="!password ? ['password is required'] : []"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirm password"
            :type="'password'"
            :rules="[v => !!v || 'Confirm password is required', v => v === password || 'Passwords do not match']"
            :error-messages="!confirmPassword ? ['Confirm Password is required'] : []"
            required
          ></v-text-field>
          <div class="d-flex justify-center mb-5 mt-3">
            <div><v-btn @click="goBack" variant="flat" color="grey" class="mr-2">Go back</v-btn></div>
            <div><v-btn @click="goNext" variant="flat" color="blue-darken-1" class="ml-2 pl-5 pr-5">Next</v-btn></div>
          </div>
        </v-form>
      </v-card>
    </template>

    <template v-if="step == 4">
      <v-card flat class="my-5 signup-form text-center">
        <h3 class="h6 mb-2">
          Please enter the one time password to verify your account
        </h3>
        <div>A code has been sent to {{ phoneNumber }}</div>
        <v-form v-model="valid[3]" ref="el => forms.value[3] = el">
          <v-otp-input
            v-model="otpPhone"
            length="6"
            @finish="() => checkOtp(otpPhone, 3, '259909')"
          ></v-otp-input>
          <div class="d-flex justify-center mb-5 mt-3">
            <div><v-btn @click="goBack" variant="flat" color="grey" class="mr-2">Go back</v-btn></div>
            <div><v-btn @click="() => checkOtp(otpPhone, 3, '259909')" variant="flat" color="blue-darken-1" class="ml-2 pl-5 pr-5">Verify</v-btn></div>
          </div>
          <div class="text-caption">
            Didn't receive the code? <a href="#" @click.prevent="resendOtpPhone">Resend</a>
          </div>
        </v-form>
      </v-card>
    </template>

    <template v-if="step == 5">
      <v-card flat class="my-5 signup-form text-center">
        <h3 class="text-h6 mb-5">Your account is created</h3>
        <div><v-btn @click="handleNextClick" variant="flat" color="blue-darken-1" class="ml-2 pl-5 pr-5">Click to enter</v-btn></div>
      </v-card>
    </template>
  </div>
</div>
</template>

<style>
a {
  color: blue;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.signup-form {
  width: 100%;
  max-width: 550px;
}
</style>
