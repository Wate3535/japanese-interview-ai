
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  locales,
  localeNames,
  localeFlags,
  type Locale,
} from '@/messages/i18n.config';

import {
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  LogOut,
  User,
  LayoutDashboard,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { useFirebaseAuth } from '@/providers/firebase-auth-provider';

interface SiteHeaderProps {
  variant?: 'landing' | 'app';
}

export function SiteHeader({
  variant = 'landing',
}: SiteHeaderProps) {
  const t = useTranslations();

  const { theme, setTheme } = useTheme();

  const {
    user,
    logout,
  } = useFirebaseAuth();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const handleLocaleChange = (
    locale: Locale
  ) => {
    localStorage.setItem('locale', locale);

    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="flex items-center"
            >
<span className="text-2xl font-bold text-blue-600">                {t('common.appName')}
              </span>
            </motion.div>
          </Link>

          {variant === 'app' && user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t('nav.dashboard')}
              </Link>

              <Link
                href="/interview"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t('nav.interview')}
              </Link>

              <Link
                href="/history"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t('nav.history')}
              </Link>

              <Link
                href="/feedback"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t('nav.feedback')}
              </Link>
            </nav>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* LANGUAGE */}
          <div className="relative group">
            <button className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors">
              <Globe className="h-4 w-4" />
            </button>

            <div className="absolute right-0 top-10 hidden group-hover:block bg-background border rounded-md shadow-lg p-2 z-50 min-w-[140px]">
              {locales.map((locale) => (
                <div
                  key={locale}
                  onClick={() =>
                    handleLocaleChange(locale)
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-accent"
                >
                  <span>
                    {localeFlags[locale]}
                  </span>

                  <span>
                    {localeNames[locale]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* THEME */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() =>
              setTheme(
                theme === 'dark'
                  ? 'light'
                  : 'dark'
              )
            }
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* USER */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
               className="
               relative
               h-9
               w-9
               rounded-full
               inline-flex
               items-center
               justify-center
               "
>
  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={
                        user.photoURL || ''
                      }
                      alt={
                        user.email || ''
                      }
                    />

                    <AvatarFallback>
                      {user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
               
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56"
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user.displayName ||
                        user.email}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuItem>
                  <Link
                    href="/dashboard"
                    className="cursor-pointer flex items-center w-full"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />

                    {t('nav.dashboard')}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link
                    href="/settings"
                    className="cursor-pointer flex items-center w-full"
                  >
                    <User className="mr-2 h-4 w-4" />

                    {t('nav.settings')}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />

                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : variant === 'landing' ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">
                  {t('nav.login')}
                </Button>
              </Link>

              <Link href="/signup">
                <Button>
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>
          ) : null}

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden border-t bg-background"
          >
            <div className="container px-4 py-4 space-y-4">

              {variant === 'app' &&
              user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-sm font-medium"
                  >
                    {t('nav.dashboard')}
                  </Link>

                  <Link
                    href="/interview"
                    className="block py-2 text-sm font-medium"
                  >
                    {t('nav.interview')}
                  </Link>

                  <Link
                    href="/history"
                    className="block py-2 text-sm font-medium"
                  >
                    {t('nav.history')}
                  </Link>

                  <Link
                    href="/settings"
                    className="block py-2 text-sm font-medium"
                  >
                    {t('nav.settings')}
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {t('nav.login')}
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button className="w-full">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

