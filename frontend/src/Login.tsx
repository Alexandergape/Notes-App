import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

interface LoginForm {
  username: string
  password: string
}

const Login = () => {
  const { control, handleSubmit } = useForm<LoginForm>()
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
      localStorage.setItem('token', res.data.token)

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully!',
        life: 3000
      })

      navigate('/')
    } catch (err: unknown) {
      // narrow error
      const detail = axios.isAxiosError(err)
        ? err.response?.data?.error || 'Login failed'
        : 'Login failed'

      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail,
        life: 3000
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center from-slate-50 to-indigo-50/40">
      <Toast ref={toast} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/80 rounded-2xl p-8 shadow-lg flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-slate-800">Sign in to continue</h1>
        </div>

        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm text-slate-600 mb-1">
                Username
              </label>
              <InputText id="username" {...field} className="w-full p-3 rounded-lg shadow-sm" />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className=" w-full flex flex-col ">
              <label htmlFor="password" className="text-sm text-slate-600 mb-1">
                Password
              </label>
              <div className="w-full">
                <Password
                  id="password"
                  {...field}
                  toggleMask
                  feedback={false}
                  style={{ width: '100%' }}
                  className="w-full"
                  inputClassName="w-full p-3 rounded-lg shadow-sm"
                />
              </div>
            </div>
          )}
        />

        <div className="w-full flex items-center justify-between gap-4">
          <Button
            label="Login"
            type="submit"
            className="w-full p-button-rounded p-button-primary"
          />
        </div>
      </form>
    </div>
  )
}

export default Login
