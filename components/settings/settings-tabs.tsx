'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import {
  Bell,
  Shield,
  Trash2,
  Save,
  User,
} from 'lucide-react';

export function SettingsTabs() {
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    practice: true,
  });

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">
          <User className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>

        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>

        <TabsTrigger value="account">
          <Shield className="h-4 w-4 mr-2" />
          Account
        </TabsTrigger>
      </TabsList>

      {/* PROFILE */}
      <TabsContent value="profile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Name</Label>

                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  value={profile.email}
                  disabled
                />
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* NOTIFICATIONS */}
      <TabsContent value="notifications">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Email Notifications
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Receive updates by email
                  </p>
                </div>

                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      email: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Practice Reminders
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Daily practice reminders
                  </p>
                </div>

                <Switch
                  checked={notifications.practice}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      practice: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* ACCOUNT */}
      <TabsContent value="account">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600">
                Danger Zone
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Delete your account permanently.
              </p>

              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}