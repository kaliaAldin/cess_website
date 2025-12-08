import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blog.json";

export default function BlogPost({ lang }) {
  const { id } = useParams();

  const post = blogData.posts.find((p) => p.id === id);

  if (!post) return <h2>Post not found</h2>;

  return (
    <section className="blog-post">
      <h2>{lang === "en" ? post.title_en : post.title_ar}</h2>

      {/* AUTHOR */}
      <p className="author">
        {lang === "en" ? post.author_en : post.author_ar}
      </p>

      <p>{lang === "en" ? post.body_en : post.body_ar}</p>

      <Link to="/blog" className="see-more-btn">
        {lang === "en" ? "← Back to Blog" : "← العودة للمدونة"}
      </Link>
    </section>
  );
}
