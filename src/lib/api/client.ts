import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { getAcceptLanguageHeader } from '@/lib/utils'

// API Client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const TOKEN_COOKIE_NAME = 'access_token'

// Create axios instance
const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth token management
const getAuthToken = (): string | null => {
  return Cookies.get(TOKEN_COOKIE_NAME) || null
}

const clearAuthToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME)
}

// Error handling
const handleUnauthorized = (): void => {
  clearAuthToken()
}

const handleApiError = (error: AxiosError): void => {
  if (error.response?.status === 401) {
    handleUnauthorized()
  } else if (error.response?.status === 403) {
    console.error('Access forbidden')
  } else if (error.response && error.response.status >= 500) {
    console.error('Server error:', error.response.status)
  }
}

// Setup interceptors
const setupInterceptors = (): void => {
  // Request interceptor for auth tokens and locale headers
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = getAuthToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      
      // Add Accept-Language header based on current locale
      if (config.headers) {
        // Check if locale is passed in config params first
        const configLocale = config.params?.locale || config.headers['X-Locale']
        
        if (configLocale) {
          // Use explicitly passed locale
          config.headers['Accept-Language'] = getAcceptLanguageHeader(configLocale)
        } else {
          // Fallback to URL-based detection
          const currentLocale = typeof window !== 'undefined' 
            ? window.location.pathname.split('/')[1] 
            : 'az'
          
          const validLocales = ['az', 'en', 'ru']
          const locale = validLocales.includes(currentLocale) ? currentLocale : 'az'
          config.headers['Accept-Language'] = getAcceptLanguageHeader(locale)
        }
      }

      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      handleApiError(error)
      return Promise.reject(error)
    }
  )
}

// Initialize interceptors
setupInterceptors()

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await client.get<T>(url, config)
  return response.data
}

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response = await client.post<T>(url, data, config)
  return response.data
}

export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response = await client.put<T>(url, data, config)
  return response.data
}

export const patch = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response = await client.patch<T>(url, data, config)
  return response.data
}

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await client.delete<T>(url, config)
  return response.data
}

// Export as object for backward compatibility
export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
}

export default apiClient 