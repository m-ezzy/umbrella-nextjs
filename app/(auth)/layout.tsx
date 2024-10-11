import AuthLayout from '@/components/layouts/AuthLayout'

export default async function Layout({ children }: any) {
  return <AuthLayout>{children}</AuthLayout>
}
