import { AuthLayout } from "@/client/components/private/auth/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}