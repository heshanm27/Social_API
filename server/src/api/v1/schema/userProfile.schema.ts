import { z } from "zod";

export const userProfileSchema = z.object({
  body: z.object({
    profilePicture: z.string().optional(),
    coverPicture: z.string().optional(),
    followers: z.array(z.string()).optional(),
    followings: z.array(z.string()).optional(),
    bio: z.string().optional(),
    city: z.string().optional(),
    from: z.string().optional(),
    relationship: z.string().optional(),
    otherSoialMedia: z.array(z.string()).optional(),
    userRef: z.string(),
  }),
});
