import { z } from 'zod';

const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const hexColorRegex = /^[0-9a-fA-F]{3,6}$/;
const commaSepHexRegex = /^[0-9a-fA-F]{3,6}(?:,[0-9a-fA-F]{3,6})*$/;

export const profileSchema = z.object({
  name: z.string(),
  username: z.string().refine((val) => !val || githubUsernameRegex.test(val), {
    message: 'Invalid GitHub username (only alphanumeric and single hyphens)',
  }),
  bio: z.string(),
  location: z.string(),
  website: z.string().refine((val) => !val || /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d+)?(\/.*)?$/i.test(val), {
    message: 'Invalid URL format (e.g. https://yourdomain.com)',
  }),
  email: z.string().refine((val) => !val || z.string().email().safeParse(val).success, {
    message: 'Invalid email format (e.g. name@domain.com)',
  }),
});

export const headerSchema = z.object({
  capsuleEnabled: z.boolean(),
  capsuleType: z.enum(['animated', 'gradient', 'waving', 'soft']),
  capsuleColor: z.string().refine((val) => !val || commaSepHexRegex.test(val), {
    message: 'Must be comma-separated hex values (e.g., 0ea5e9,8b5cf6)',
  }),
  capsuleHeight: z.number().int().min(50, 'Minimum height is 50px').max(600, 'Maximum height is 600px'),
  typingEnabled: z.boolean(),
  typingLines: z.array(z.string()),
  typingColor: z.string().refine((val) => !val || hexColorRegex.test(val), {
    message: 'Must be a valid hex color without # (e.g. 36BCF7)',
  }),
  typingSpeed: z.number().int().min(10, 'Speed must be at least 10ms').max(1000, 'Speed must be under 1000ms'),
});
