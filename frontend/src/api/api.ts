import axios from 'axios'
import { Toast } from 'primereact/toast'

interface CustomAxios extends ReturnType<typeof axios.create> {
  toast?: React.RefObject<Toast | null>
}

export const api: CustomAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
})

// global error interceptor
api.interceptors.response.use(
  (response) => {
    const toast = api.toast

    // ✅ Optionally show success messages for POST, PUT, DELETE
    if (toast?.current && ['post', 'put', 'delete'].includes(response.config.method || '')) {
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation completed successfully.',
        life: 3000
      })
    }

    return response
  },
  (error) => {
    const toast = api.toast
    if (toast?.current) {
      const message =
        error.response?.data?.error || error.response?.data?.message || 'Unexpected error occurred.'
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000
      })
    }
    return Promise.reject(error)
  }
)