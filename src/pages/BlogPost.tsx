import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { blogs } from "./Blog";

const BlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = blogs.find(b => b.id === Number(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        <article className="prose prose-lg max-w-none">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <span>By {blog.author}</span>
            </div>
            <div>{blog.date}</div>
            <div>{blog.readTime}</div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full">
              {blog.category}
            </div>
          </div>

          <div className="text-lg leading-relaxed">
            {blog.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;