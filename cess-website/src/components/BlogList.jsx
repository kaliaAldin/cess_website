import React from "react";
import { Link } from "react-router-dom";
import blogData from "../data/blog.json";

export default function BlogList({ lang }) {

  const posts = blogData.posts;

  return (
    <section id="blog" className="blog-list">
      <h2>{lang === "en" ? "Blog and Readings" : "المدونة والقراءات"}</h2>

      <div className="blog-grid">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <h3>{lang === "en" ? post.title_en : post.title_ar}</h3>

            {/* AUTHOR */}
            <p className="author">
              {lang === "en" ? post.author_en : post.author_ar}
            </p>

            <p>{lang === "en" ? post.preview_en : post.preview_ar}</p>

            <Link to={`/blog/${post.id}`} className="see-more-btn">
              {lang === "en" ? "Read more" : "اقرأ المزيد"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
