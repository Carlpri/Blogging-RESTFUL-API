
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const client = new PrismaClient()

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Blog post API")
})


//Creating a single user
app.post('/users', async (req, res) => {
  const { firstName, lastName, emailAddress, userName } = req.body;
  try {
    const user = await client.user.create({
      data: { firstName, lastName, emailAddress, userName }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
});

//Getting many users.
app.get("/users", async (req, res) => {
  try {
    const users = await client.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "There was an error getting the user" });
  }
});

//Getting a specified user by ID

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await client.user.findUnique({
      where: {
        id: id
      },
      include: {
        post: true
      }
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching the user and posts:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Deleting a user + their posts
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await client.posts.deleteMany({
      where: {
        userid: id
      }
    });

    await client.user.delete({
      where: {
        id: id
      }
    });
    res.status(200).json({ message: "User deleted together with all their posts" })
  }
  catch (error) {
    console.error("Error deleting the specified user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

//creating a single post
app.post('/blog_posts', async (req, res) => {
  try {
    const { title, content, userid } = req.body
    const newBlogPost = await client.posts.create({
      data: {
        title,
        content,
        userid,
      }
    });
    console.log("created post:", newBlogPost);
    res.status(201).json(newBlogPost)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error creating  a post. Try again later" })
  }
})


//Getting many posts
app.get("/blog_posts", async (req, res) => {
  try {
    const blog_posts = await client.posts.findMany();
    res.status(200).json(blog_posts);
  } catch (error) {
    res.status(500).json({ error: "There was an error getting all the blog posts" });
  }
});

//Getting a single post by id

app.get("/blog_posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog_post = await client.posts.findUnique({
      where: {
        postId: id
      },
      include: {
        user: true
      }
    });
    if (blog_post) {
      return res.status(200).json(blog_post);
    } else {
      return res.status(404).json({ message: "Blog post was not found" });
    }
  } catch (error) {
    console.error("Error fetching the specified blog post", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//Deleting a post

app.delete("/blog_posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await client.posts.delete({
      where: {
        postId: id
      }
    });

    res.status(200).json({ message: "Post deleted successfully" })
  }
  catch (error) {
    console.error("Error deleting the specified post:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
})

app.patch("/blog_posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const blog_post = await client.posts.update({
      where: {
        postId:id
      },
      data: {
        ...(title && {title}),
        ...(content && {content}),
      },
    });
      res.status(200).json(blog_post);
       }
       catch(error) {
  console.error("Error deleting the specified post:", error);
  res.status(500).json({ message: "Something went wrong" });
}

  });

// If my port specified is taken, I can work with another port given to me by the deployment platform
let port;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 4000
}

// const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});