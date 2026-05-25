'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  History,
  BarChart3,
  Settings,
  Home,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { href: '/interview', icon: MessageSquare, labelKey: 'nav.interview' },
  { href: '/history', icon: History, labelKey: 'nav.history' },
  { href: '/feedback', icon: BarChart3, labelKey: 'nav.feedback' },
  { href: '/settings', icon: Settings, labelKey: 'nav.settings' },
];

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex h-full w-64 flex-col border-r bg-background">
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {t(item.labelKey)}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Link href="/">
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Home className="h-5 w-5" />
            {t('nav.home')}
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
