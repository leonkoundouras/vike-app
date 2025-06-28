import vikeReact from 'vike-react/config'
import Layout from '../components/Layout.jsx'
import { AuthProvider } from '../components/AuthContext.jsx'

export default {
  extends: [vikeReact],
  Wrapper: AuthProvider,
  Layout
}