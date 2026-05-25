import { SiteHeader } from '@/components/layout/site-header';
import { AppSidebar } from '@/components/layout/app-sidebar';

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant="app" />
      <div className="flex-1 flex">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
