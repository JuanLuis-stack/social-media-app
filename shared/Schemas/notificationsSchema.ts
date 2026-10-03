import { z } from "zod";

export const notificationSchema = z.object({
  id: z.number(),
  recipient_id: z.number(),
  actor_id: z.number(),
  type: z.enum(["like", "comment", "follow", "new_post"]),
  post_id: z.number().nullable(),
  is_read: z.boolean(),
  created_at: z.string(),
  comment_id: z.number().nullable(),
});

export const notificationsSchema = z.array(notificationSchema);

export const retrieveNotifications = z.object({
  message: z.string(),
  notifications: notificationsSchema,
});

export type Notification = z.infer<typeof notificationSchema>;
export type Notifications = z.infer<typeof notificationsSchema>;
