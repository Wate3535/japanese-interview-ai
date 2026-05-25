import { SiteHeader } from '@/components/layout/site-header';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant="landing" />
      <main className="flex-1 flex items-center justify-center p-8">
        <SignupForm />
      </main>
    </div>
  );
}
