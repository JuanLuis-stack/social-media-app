async function createNotifications(
  client,
  { recipient_id, actor_id, type, post_id = null, comment_id = null },
) {
  const response = await client.query(
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

module.exports = {
  createNotifications,
};
