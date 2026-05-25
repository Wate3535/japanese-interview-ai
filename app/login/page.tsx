import { SiteHeader } from '@/components/layout/site-header';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant="landing" />
      <main className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </main>
    </div>
  );
}
