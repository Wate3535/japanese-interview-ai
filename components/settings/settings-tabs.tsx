'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Bell, Palette, Shield, Trash2, Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SettingsTabs() {
  const t = useTranslations('settings');
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const supabase = createClient();

  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    jlpt_level: 'N3',
    target_industry: 'IT / Technology',
    preferred_language: 'en',
  });

  const [notifications, setNotifications] = useState({
    email_notifications: true,
    push_notifications: false,
    practice_reminders: true,
    weekly_report: true,
  });

  const handleProfileUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('users')
          .update({
            name: profile.name,
            jlpt_level: profile.jlpt_level,
            target_industry: profile.target_industry,
            preferred_language: profile.preferred_language,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }
      toast({ title: t('saved') });
    } catch (error) {
      toast({
        title: t('saved'),
        variant: 'default',
      });
    }
  };

  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const industries = [
    'IT / Technology',
    'Hotel / Hospitality',
    'Restaurant / Food Service',
    'Office / Administration',
    'Engineering / Manufacturing',
  ];

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex gap-2">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden lg:inline">{t('profile')}</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden lg:inline">{t('appearance')}</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden lg:inline">{t('notifications')}</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden lg:inline">{t('account')}</span>
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('profile')}</CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                  <AvatarFallback>DU</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <Separator />

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <Separator />

              {/* JLPT Level */}
              <div className="space-y-2">
                <Label>{t('jlptLevel')}</Label>
                <Select
                  value={profile.jlpt_level}
                  onValueChange={(value) =>
                    setProfile({ ...profile, jlpt_level: value || 'N3' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jlptLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Target Industry */}
              <div className="space-y-2">
                <Label>{t('targetIndustry')}</Label>
                <Select
                  value={profile.target_industry}
                  onValueChange={(value) =>
                    setProfile({ ...profile, target_industry: value || 'IT / Technology' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Language */}
              <div className="space-y-2">
                <Label>{t('preferredLanguage')}</Label>
                <Select
                  value={profile.preferred_language}
                  onValueChange={(value) =>
                    setProfile({ ...profile, preferred_language: value || 'en' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="uz">O'zbek</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleProfileUpdate} className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                {t('save')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* Appearance Tab */}
      <TabsContent value="appearance">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('appearance')}</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred theme
                  </p>
                </div>
                <Select value={theme} onValueChange={(value) => setTheme(value || 'system')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Theme Preview */}
              <div className="flex gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setTheme('light')}
                >
                  ☀️ Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setTheme('dark')}
                >
                  🌙 Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setTheme('system')}
                >
                  💻 System
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications')}</CardTitle>
              <CardDescription>
                Configure how you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('emailNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your progress
                  </p>
                </div>
                <Switch
                  checked={notifications.email_notifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email_notifications: checked })
                  }
                />
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('pushNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications on your device
                  </p>
                </div>
                <Switch
                  checked={notifications.push_notifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push_notifications: checked })
                  }
                />
              </div>

              <Separator />

              {/* Practice Reminders */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('practiceReminders')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily reminders to practice
                  </p>
                </div>
                <Switch
                  checked={notifications.practice_reminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, practice_reminders: checked })
                  }
                />
              </div>

              <Separator />

              {/* Weekly Report */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('weeklyReport')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of your progress
                  </p>
                </div>
                <Switch
                  checked={notifications.weekly_report}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weekly_report: checked })
                  }
                />
              </div>

              <Button
                onClick={() => toast({ title: t('saved') })}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* Account Tab */}
      <TabsContent value="account">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>{t('changePassword')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('currentPassword')}</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('newPassword')}</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirmNewPassword')}</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600">{t('deleteAccount')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('deleteAccountWarning')}
              </p>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t('deleteAccount')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
