'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReadmeStore } from '@/store/readmeStore';
import { profileSchema } from '@/lib/validation';

export function ProfileTab() {
  const profile = useReadmeStore((s) => s.state.profile);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const set = (field: keyof typeof profile, value: string) =>
    updateSection('profile', { ...profile, [field]: value });

  const result = profileSchema.safeParse(profile);
  const errors = result.success ? {} : result.error.flatten().fieldErrors;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Display name</Label>
          <Input id="name" value={profile.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">GitHub username</Label>
          <Input id="username" value={profile.username} onChange={(e) => set('username', e.target.value)} placeholder="johndoe" />
          {errors.username && (
            <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">{errors.username[0]}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={profile.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Full-stack developer passionate about open source" rows={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={profile.location} onChange={(e) => set('location', e.target.value)} placeholder="San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" value={profile.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yoursite.dev" />
          {errors.website && (
            <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">{errors.website[0]}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profile.email} onChange={(e) => set('email', e.target.value)} placeholder="hello@example.com" />
        {errors.email && (
          <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">{errors.email[0]}</p>
        )}
      </div>
    </div>
  );
}
