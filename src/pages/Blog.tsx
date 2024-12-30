import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Github, Twitter, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Optimizing Your Electronic Invoicing Process",
    description: "Learn how to streamline your electronic invoicing workflow and improve efficiency with these proven strategies.",
    content: "Electronic invoicing (e-invoicing) has revolutionized how businesses handle their billing processes. By implementing the right strategies and tools, you can significantly reduce processing time, minimize errors, and improve cash flow...",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2936&fm=jpg",
    author: "María González",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Guides"
  },
  {
    id: 2,
    title: "Understanding Colombian Tax Regulations",
    description: "A comprehensive guide to navigating Colombian tax regulations and ensuring compliance in your business operations.",
    content: "Colombian tax regulations can be complex, but understanding them is crucial for business success. This guide covers the essential aspects of tax compliance, recent changes in legislation, and best practices for maintaining accurate records...",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2936&fm=jpg",
    author: "Carlos Ramírez",
    date: "March 12, 2024",
    readTime: "8 min read",
    category: "Compliance"
  },
  {
    id: 3,
    title: "The Future of Digital Invoicing",
    description: "Explore emerging trends and technologies shaping the future of digital invoicing and financial management.",
    content: "The digital invoicing landscape is rapidly evolving with new technologies and standards. From blockchain integration to AI-powered automation, discover how these innovations are transforming the way businesses handle their invoicing processes...",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&fm=jpg",
    author: "Ana Martínez",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Technology"
  }
];

const Blog = () => {
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-400 p-2 text-center text-sm text-white">
        <span>¡Usa LUPADIAN24 para un 25% descuento! </span>
        <Button variant="secondary" size="sm" className="ml-2 bg-gray-800 text-white hover:bg-gray-700">
          Compra ahora
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">LUPA IA</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm hover:text-primary">Funcionalidad</Link>
          <Link to="/#testimonials" className="text-sm hover:text-primary">Testimonios</Link>
          <Link to="/#pricing" className="text-sm hover:text-primary">Precio</Link>
          <Link to="/blog" className="text-sm hover:text-primary">Blogs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Registrarse</Link>
          </Button>
        </div>
      </nav>

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
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden flex flex-col">
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
              <CardContent className="flex-grow">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                {expandedBlog === blog.id && (
                  <p className="text-sm text-muted-foreground">{blog.content}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  onClick={() => setExpandedBlog(expandedBlog === blog.id ? null : blog.id)}
                >
                  {expandedBlog === blog.id ? "Show less" : "Read more →"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/66b90c17-c299-4882-a96a-de4eec089feb.png" alt="Logo" className="h-8 w-8" />
              <span>LUPA IA</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 LUPA Marketing. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;