import { SiteHeader } from '@/components/layout/site-header';

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant="app" />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
