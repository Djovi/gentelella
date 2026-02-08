// Blog functionality for Gentelella

class Blog {
    constructor() {
        this.posts = [];
    }

    addPost(title, content) {
        const post = { title, content, date: new Date() };
        this.posts.push(post);
    }

    getPosts() {
        return this.posts;
    }

    getPost(title) {
        return this.posts.find(post => post.title === title);
    }

    deletePost(title) {
        this.posts = this.posts.filter(post => post.title !== title);
    }
}

// Example usage:
const blog = new Blog();
blog.addPost('My First Blog Post', 'This is the content of my first blog post.');
