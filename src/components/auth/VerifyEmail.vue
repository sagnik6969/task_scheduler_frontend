<template>
  <div>
    <div v-if="loading">Verifying...</div>
    <div v-if="verificationSuccess">Email verified successfully!</div>
    <div v-if="verificationError">Failed to verify email. Please try again.</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      verificationSuccess: false,
      verificationError: false
    }
  },
  created() {
    // Extract user ID and hash from URL parameters
    const userId = this.$route.params.id
    const hash = this.$route.params.hash

    // Send a request to your backend to verify the email
    axios
      .get(`/email/verify/${userId}/${hash}`)
      .then((response) => {
        // Handle successful verification
        this.loading = false
        this.verificationSuccess = true
      })
      .catch((error) => {
        // Handle verification error
        console.error('Verification error:', error)
        this.loading = false
        this.verificationError = true
      })
  }
}
</script>
