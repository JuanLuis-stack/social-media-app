import { PoolClient } from "pg";
import type { Notification } from "../../shared/Schemas/notificationsSchema.js";

type CreateNotificationsPropsType = {
  recipient_id: number;
  actor_id: number;
  type: Notification["type"];
  post_id?: number | null;
  comment_id?: number | null;
};

async function createNotifications(
  client: PoolClient,
  {
    recipient_id,
    actor_id,
    type,
    post_id = null,
    comment_id = null,
  }: CreateNotificationsPropsType,
) {
  const response = await client.query<Notification>(
    `
    INSERT INTO notifications (
        recipient_id,
        actor_id,
        type,
        post_id,
        comment_id
        ) values ($1,$2, $3, $4, $5) RETURNING *`,
    [recipient_id, actor_id, type, post_id, comment_id],
  );
  console.log({
    message: "notification created successfully",
    notification: response.rows[0],
  });
}

export default createNotifications;
