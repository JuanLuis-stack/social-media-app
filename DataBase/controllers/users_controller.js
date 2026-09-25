// controllers/users_controller.js

function getUsers(db) {
  return async (req, res) => {
    try {
      if (req.query.type === "AllUsers") {
        console.log("Workign from getUsers function");
      }

      const result = await db.query("SELECT * FROM users");

      console.log(result.rows);
      res.json(result.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getUsersId(db) {
  return async (req, res) => {
    try {
      const userId = req.params.user_id;
      const currentUserId = req.user.id;

      if (req.query.type === "full") {
        return await getFullUserData(db)(req, res);
      }

      const result = await db.query(
        `SELECT 
	        users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation,
	        COUNT(DISTINCT follows.follower_id) as followers,
	        COALESCE(
	        	bool_or(follows.follower_id = $1),
	        	false
	        ) as is_current_user_following
	        from users
	        left join follows on users.id = follows.following_id
	        WHERE users.id = $2
	        group by
	        	users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation`,
        [currentUserId, userId],
      );

      console.log({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });

      res.json({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getUsersByUserName(db) {
  return async (req, res) => {
    try {
      const userProfileName = req.params.user_name;
      const currentUserId = req.user.id;

      if (req.query.type === "full") {
        return await getFullUserData(db)(req, res);
      }

      const result = await db.query(
        `SELECT 
	        users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation,
	        COUNT(DISTINCT follows.follower_id) as followers,
	        COALESCE(
	        	bool_or(follows.follower_id = $1),
	        	false
	        ) as is_current_user_following
	        from users
	        left join follows on users.id = follows.following_id
	        WHERE users.user_name = $2
	        group by
	        	users.id,
	        users.name,
	        users.email,
	        users.password,
	        users.user_name,
	        users.presentation`,
        [currentUserId, userProfileName],
      );

      console.log(result.rows[0]);

      console.log({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });

      res.json({
        user: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          user_name: result.rows[0].user_name,
          presentation: result.rows[0].presentation,
          followers: result.rows[0].followers,
          is_current_user_following: result.rows[0].is_current_user_following,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function getFullUserData(db) {
  return async (req, res) => {
    try {
      const id = req.params.id;
      console.log("Working with full data");
      const data = await db.query(
        `
                    SELECT
                        users.name,
                        posts.id,
                        posts.title,
                        comments.content
                    FROM users
                    JOIN posts ON users.id = posts.user_id
                    JOIN comments ON posts.id = comments.post_id
                    WHERE users.id = $1
                    `,
        [id],
      );
      if (data.rows.length === 0) {
        console.log({ message: "User not found" });
        return res.status(404).json({ message: "User not found" });
      }
      const result = {
        user: data.rows[0].name,
        posts: [],
      };

      const rows = data.rows;

      for (const row of rows) {
        let post = result.posts.find((p) => p.id === row.id);

        if (!post) {
          post = {
            id: row.id,
            title: row.title,
            comments: [],
          };
          result.posts.push(post);
        }

        post.comments.push(row.content);
      }
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function updateUsers(db) {
  return async (req, res) => {
    const { name, email } = req.body;

    try {
      const result = await db.query(
        `
                UPDATE users
                SET name = $1
                WHERE id = $2
                RETURNING *`,
        [name, req.user.id],
      );

      console.log({
        message: "User updated successfully",
        userUpdated: result.rows[0],
      });

      res.status(200).json({
        message: "User updated successfully",
        userUpdated: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

function deleteUsers(db) {
  return async (req, res) => {
    try {
      const result = await db.query(
        `
                DELETE FROM users where id = $1 RETURNING *`,
        [req.user.id],
      );

      console.log({
        message: "User deleted successfully",
        userDeleted: result.rows[0],
      });

      res.status(200).json({
        message: "User deleted successfully",
        userDeleted: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = {
  getUsers,
  getUsersId,
  getUsersByUserName,
  updateUsers,
  deleteUsers,
};
