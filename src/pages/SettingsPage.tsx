import { useState, useEffect } from "react";
import { Moon, Sun, User, Bell, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences</p>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          <h2 className="font-semibold text-foreground">Appearance</h2>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode</Label>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Profile</h2>
        </div>
        <div className="space-y-2 text-muted-foreground">
          <p>Name: —</p>
          <p>Email: —</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notif" className="cursor-pointer">Push Notifications</Label>
          <Switch id="push-notif" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notif" className="cursor-pointer">Email Notifications</Label>
          <Switch id="email-notif" />
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Privacy</h2>
        </div>
        <p className="text-muted-foreground">Manage your data and privacy settings.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
