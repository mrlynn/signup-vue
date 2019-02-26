<template>
    <div class="signup-container">
        <h2 class="signup-header">Sign Up</h2>
        <form class="signup-form" @submit.prevent="handleSubmit">
            <div class="form-group" :class="{ 'invalid': errors.has('firstName') }">
                <label  for="firstName">First Name<span v-if="errors.has('firstName')" class="invalid-text"> !!!</span></label>
                <p><input @focus="onFocus" type="text" v-model="user.firstName" v-validate="{ required: true}" name="firstName" class="form-control" autocomplete="off" required/></p>
            </div>
            <div class="form-group" :class="{ 'invalid': errors.has('lastName') }">
                <label for="lastName">Last Name<span v-if="errors.has('lastName')" class="invalid-text"> !!!</span></label>
                 <p><input @focus="onFocus" type="text" v-model="user.lastName" v-validate="'required'" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" required/></p>
            </div>
            <div class="form-group" :class="{ 'invalid': errors.has('email') }">
                <label for="email">Email<span v-if="errors.has('email')" class="invalid-text"> !!!</span></label>
                 <p><input @focus="onFocus" type="email" v-model="user.email" v-validate="'required|email'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" placeholder="yourcoolemail@email.com" required/><p>
                <div v-if="errors.has('email')" class="invalid-text">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group" :class="{ 'invalid': errors.has('password') }">
                <label for="password">Password<span v-if="errors.has('password')" class="invalid-text"> !!!</span></label>
                <p><input @focus="onFocus" type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" placeholder="6 characters minimum" required/></p>
                <div v-if="errors.has('password')" class="invalid-text">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password<span v-if="!comparePasswords" class="invalid-text"> !!!</span></label>
                 <p><input @focus="onFocus" type="password" v-model="user.confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': !comparePasswords}" required/></p>
                <div v-if="submitted && !comparePasswords" class="invalid-text" >Uh oh...looks like the passwords don't match!</div>
            </div>
            <div class="form-group button-container">
                <button class="submit-button" type="submit" >Register!</button>
            </div>
        </form>
    </div>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      submitted: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  computed: {
    comparePasswords() {
      return this.user.password === this.user.confirmPassword;
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.signUserUp({
        email: this.user.email,
        password: this.user.password,
        confirmPassword: this.user.confirmPassword,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
    },
    signUserUp(payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid
          };
        })
        .then(this.$router.push("/welcome"))
        .catch(error => {
          console.log(error);
        });
    },
    onFocus(e) {
      e.target.style.transform = "translate(5px 5px)";
    }
  }
};
</script>
<style>
.signup-container {
  width: 500px;
  height: 700px;
  overflow: hidden;
  background: #312fa4;
  border: 1px solid #00bcd4;
  border-radius: 0.2rem;
  z-index: -2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signup-form {
  margin-top: 1rem;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.signup-header {
  font-size: 1.6rem;
}

.form-group {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-family: "Karla", sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.invalid {
  animation: jiggle 10s ease-out infinite;
}

.invalid-text {
  color: red;
}

.form-control {
  font-size: 1rem;
  font-family: "Space Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  border: 1px solid #00bcd4;
  outline: none;
  padding: 0.2rem 0 0.2rem 1rem;
  background: none;
  background: #3c2fa4;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

.form-control:focus {
  border-color: #f0e794;
  background: #f0e794;
  color: #3c2cb6;
  transform: translate(5px, 5px);
}

.form-control:hover,
label:hover {
  cursor: pointer;
}

.button-container {
  position: relative;
}

.button-container:after {
  content: "\0279C";
  color: #fcfbf9;
  bottom: 0;
  left: 85%;
  z-index: 0;
  position: absolute;
  width: 3rem;
  height: 2.5rem;
  font-family: "Space Mono", monospace;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(0px);
  background: #fb6868;
  pointer-events: auto;
  transition: all 0.2s ease;
}

.submit-button {
  font-style: italic;
  font-weight: 800;
  font-size: 1rem;
  color: #3c2fa4;
  cursor: pointer;
  margin-top: 1rem;
  height: 2.5rem;
  border: none;
  background: #fff;
  transition: all 0.7s ease;
  z-index: 1;
  width: 100%;
}

.submit-button:hover {
  width: 86%;
  /* color: transparent; */
}

p {
  position: relative;
  margin: 0 0 10px 0;
  padding: 0;
  z-index: 1;
}

p:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #fb6868;
  transform: translate(5px, 5px);
  transition: all 0.33s ease;
}

p:not(.submit):hover::before {
  background: #fff;
}

::-webkit-input-placeholder {
  font-size: 0.8em;
  color: #3c2fa4;
  opacity: 0.5;
}

@keyframes jiggle {
  0% {
    transform: translate(0);
  }
  2% {
    transform: translateX(1rem);
  }
  4% {
    transform: translate(0);
  }
  100% {
    transform: translate(0);
  }
}
</style>


