import { SiteHeader } from '@/components/layout/site-header';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant="landing" />
      <main className="flex-1 flex items-center justify-center p-8">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
