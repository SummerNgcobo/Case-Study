
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { User, Lock, Bell, Monitor, Shield, Building, UserCog } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  
  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Tech Innovations Ltd.',
    jobTitle: 'Inventory Manager',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York'
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    lowStockAlerts: true,
    newOrderAlerts: true,
    shipmentAlerts: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true
  });
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    lowStockThreshold: '10',
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    autoUpdatePrices: false,
    autoReorder: false,
    autocloseOrders: true
  });
  
  // Handle account settings change
  const handleAccountChange = (field: string, value: string) => {
    setAccountSettings({
      ...accountSettings,
      [field]: value
    });
  };
  
  // Handle notification settings toggle
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field as keyof typeof notificationSettings]
    });
  };
  
  // Handle system settings change
  const handleSystemChange = (field: string, value: string | boolean) => {
    setSystemSettings({
      ...systemSettings,
      [field]: value
    });
  };
  
  // Save settings
  const saveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <Layout className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-light">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences.</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notification" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={accountSettings.name}
                      onChange={(e) => handleAccountChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={accountSettings.email}
                      onChange={(e) => handleAccountChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={accountSettings.company}
                      onChange={(e) => handleAccountChange('company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      value={accountSettings.jobTitle}
                      onChange={(e) => handleAccountChange('jobTitle', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={accountSettings.phone}
                      onChange={(e) => handleAccountChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={accountSettings.timezone}
                      onValueChange={(value) => handleAccountChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast({
                  title: "Password updated",
                  description: "Your password has been updated successfully.",
                })}>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notification" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch 
                      id="email-alerts" 
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={() => handleNotificationToggle('emailAlerts')}
                    />
                  </div>
                  <Separator />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Inventory Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="low-stock">Low Stock Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when stock falls below threshold
                        </div>
                      </div>
                      <Switch 
                        id="low-stock" 
                        checked={notificationSettings.lowStockAlerts}
                        onCheckedChange={() => handleNotificationToggle('lowStockAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-order">New Order Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when a new order is placed
                        </div>
                      </div>
                      <Switch 
                        id="new-order" 
                        checked={notificationSettings.newOrderAlerts}
                        onCheckedChange={() => handleNotificationToggle('newOrderAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shipment">Shipment Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified about shipment status changes
                        </div>
                      </div>
                      <Switch 
                        id="shipment" 
                        checked={notificationSettings.shipmentAlerts}
                        onCheckedChange={() => handleNotificationToggle('shipmentAlerts')}
                      />
                    </div>
                  </div>
                  <Separator />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Report Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="daily-report">Daily Reports</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive daily summary reports
                        </div>
                      </div>
                      <Switch 
                        id="daily-report" 
                        checked={notificationSettings.dailyReports}
                        onCheckedChange={() => handleNotificationToggle('dailyReports')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-report">Weekly Reports</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive weekly summary reports
                        </div>
                      </div>
                      <Switch 
                        id="weekly-report" 
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={() => handleNotificationToggle('weeklyReports')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="monthly-report">Monthly Reports</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive monthly summary reports
                        </div>
                      </div>
                      <Switch 
                        id="monthly-report" 
                        checked={notificationSettings.monthlyReports}
                        onCheckedChange={() => handleNotificationToggle('monthlyReports')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure inventory system behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">General Configuration</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                      <Input 
                        id="low-stock-threshold" 
                        type="number" 
                        value={systemSettings.lowStockThreshold}
                        onChange={(e) => handleSystemChange('lowStockThreshold', e.target.value)}
                      />
                      <div className="text-xs text-muted-foreground">
                        Default minimum quantity for all products
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select 
                        value={systemSettings.defaultCurrency}
                        onValueChange={(value) => handleSystemChange('defaultCurrency', value)}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                          <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                          <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                          <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                          <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select 
                        value={systemSettings.dateFormat}
                        onValueChange={(value) => handleSystemChange('dateFormat', value)}
                      >
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Automation Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-update">Auto-update Prices</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically update prices based on supplier changes
                        </div>
                      </div>
                      <Switch 
                        id="auto-update" 
                        checked={systemSettings.autoUpdatePrices as boolean}
                        onCheckedChange={(checked) => handleSystemChange('autoUpdatePrices', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-reorder">Auto-reorder Products</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically create purchase orders for low stock items
                        </div>
                      </div>
                      <Switch 
                        id="auto-reorder" 
                        checked={systemSettings.autoReorder as boolean}
                        onCheckedChange={(checked) => handleSystemChange('autoReorder', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-close">Auto-close Completed Orders</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically mark orders as completed after shipment
                        </div>
                      </div>
                      <Switch 
                        id="auto-close" 
                        checked={systemSettings.autocloseOrders as boolean}
                        onCheckedChange={(checked) => handleSystemChange('autocloseOrders', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Additional Settings</CardTitle>
                <CardDescription>Configure other system options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                  <Input id="invoice-prefix" defaultValue="INV-" />
                  <div className="text-xs text-muted-foreground">
                    Prefix used for invoice numbering (e.g., INV-001)
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                  <Textarea 
                    id="invoice-notes" 
                    placeholder="Enter default notes for invoices..."
                    defaultValue="Thank you for your business! Payment is due within 30 days."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="8.5" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast({
                  title: "Settings saved",
                  description: "Additional settings have been updated successfully.",
                })}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Two-Factor Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <Separator />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <div className="space-y-2">
                    <Label>Active Sessions</Label>
                    <div className="rounded-md border">
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-muted-foreground">Active now • Your current session</p>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Current
                        </Button>
                      </div>
                      <Separator />
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">Safari on MacOS</p>
                          <p className="text-sm text-muted-foreground">Active 2 days ago • New York, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Logout
                        </Button>
                      </div>
                      <Separator />
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile App on iPhone</p>
                          <p className="text-sm text-muted-foreground">Active 5 days ago • San Francisco, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Logout
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Logout of All Sessions
                    </Button>
                  </div>
                  <Separator />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login History</h3>
                  <div className="rounded-md border">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Successful login</p>
                        <p className="text-sm text-muted-foreground">Today, 10:15 AM • Chrome on Windows</p>
                      </div>
                      <div className="text-sm text-green-500">Successful</div>
                    </div>
                    <Separator />
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Successful login</p>
                        <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM • Safari on MacOS</p>
                      </div>
                      <div className="text-sm text-green-500">Successful</div>
                    </div>
                    <Separator />
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Failed login attempt</p>
                        <p className="text-sm text-muted-foreground">Jul 25, 2023, 8:45 AM • Unknown device</p>
                      </div>
                      <div className="text-sm text-red-500">Failed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">View Full History</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-red-200 transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-red-200 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="organization" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Manage your organization information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" defaultValue="Tech Innovations Ltd." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Business Email</Label>
                    <Input id="org-email" type="email" defaultValue="info@techinnovations.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-phone">Business Phone</Label>
                    <Input id="org-phone" defaultValue="+1 (555) 987-6543" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-website">Website</Label>
                    <Input id="org-website" defaultValue="https://techinnovations.com" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="org-address">Business Address</Label>
                    <Textarea id="org-address" defaultValue="123 Innovation Drive, Suite 400, San Francisco, CA 94107, United States" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="org-logo">Organization Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <p className="text-2xl font-semibold text-muted-foreground">T</p>
                      </div>
                      <Button variant="outline">Upload Logo</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast({
                  title: "Organization updated",
                  description: "Your organization information has been updated successfully.",
                })}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Used for invoices and legal documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                    <Input id="tax-id" defaultValue="US-123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select defaultValue="corporation">
                      <SelectTrigger id="business-type">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietor">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="non-profit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year End</Label>
                    <Select defaultValue="12-31">
                      <SelectTrigger id="fiscal-year">
                        <SelectValue placeholder="Select fiscal year end" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12-31">December 31</SelectItem>
                        <SelectItem value="03-31">March 31</SelectItem>
                        <SelectItem value="06-30">June 30</SelectItem>
                        <SelectItem value="09-30">September 30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast({
                  title: "Business information updated",
                  description: "Your business information has been updated successfully.",
                })}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage user access to the system.</CardDescription>
                </div>
                <Button className="mt-4 sm:mt-0">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <p className="font-semibold text-primary">JS</p>
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">john.smith@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Admin</Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <p className="font-semibold text-blue-500">SD</p>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Davis</p>
                        <p className="text-sm text-muted-foreground">sarah.davis@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Manager</Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <p className="font-semibold text-green-500">MB</p>
                      </div>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">michael.brown@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Sales</Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <p className="font-semibold text-purple-500">EW</p>
                      </div>
                      <div>
                        <p className="font-medium">Emma Wilson</p>
                        <p className="text-sm text-muted-foreground">emma.wilson@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Inventory</Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:smooth-shadow">
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Configure access levels and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Admin</h4>
                        <p className="text-sm text-muted-foreground">
                          Full access to all system features and settings
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit Permissions</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Manager</h4>
                        <p className="text-sm text-muted-foreground">
                          Access to most features, limited settings access
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit Permissions</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Sales</h4>
                        <p className="text-sm text-muted-foreground">
                          Access to sales and product information
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit Permissions</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Inventory</h4>
                        <p className="text-sm text-muted-foreground">
                          Access to inventory and product management
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit Permissions</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Create New Role</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
