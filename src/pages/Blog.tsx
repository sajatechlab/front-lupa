import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "Optimizing Your Electronic Invoicing Process",
    description: "Learn how to streamline your electronic invoicing workflow and improve efficiency with these proven strategies.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2936&fm=jpg",
    author: "María González",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Guides"
  },
  {
    title: "Understanding Colombian Tax Regulations",
    description: "A comprehensive guide to navigating Colombian tax regulations and ensuring compliance in your business operations.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2936&fm=jpg",
    author: "Carlos Ramírez",
    date: "March 12, 2024",
    readTime: "8 min read",
    category: "Compliance"
  },
  {
    title: "The Future of Digital Invoicing",
    description: "Explore emerging trends and technologies shaping the future of digital invoicing and financial management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&fm=jpg",
    author: "Ana Martínez",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Technology"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">
            LUPA Blog
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tips, and best practices for electronic invoicing and business management
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link 
                  to="#" 
                  className="text-primary hover:underline"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;