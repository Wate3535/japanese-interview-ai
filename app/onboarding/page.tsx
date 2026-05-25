import { RedirectOnAuth } from '@/components/auth/redirect-on-auth';
import { OnboardingForm } from '@/components/auth/onboarding-form';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 flex items-center justify-center p-8">
        <RedirectOnAuth requireAuth>
          <OnboardingForm />
        </RedirectOnAuth>
      </main>
    </div>
  );
}
