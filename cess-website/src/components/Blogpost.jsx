import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blog.json";
import Footer from "../components/Footer.jsx";

// Load translations
import en from "../data/en.json";
import ar from "../data/Ar.json";

/** Inline parser: turns **bold** into <strong> */
function renderInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const isBold = part.startsWith("**") && part.endsWith("**");
    if (isBold) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/** Block parser: supports ## headings and normal paragraphs */
function renderRichBody(bodyText) {
  if (!bodyText) return null;

  const lines = bodyText.split("\n");
  const blocks = [];
  let listBuffer = [];

  const flushList = (keyBase) => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`${keyBase}-ul`} className="blog-ul">
          {listBuffer.map((item, idx) => (
            <li key={`${keyBase}-li-${idx}`}>{renderInlineBold(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();

    // Empty line => paragraph spacing
    if (line.trim() === "") {
      flushList(idx);
      blocks.push(<div key={`sp-${idx}`} className="blog-space" />);
      return;
    }

    // Bullet list "- item"
    if (line.trim().startsWith("- ")) {
      listBuffer.push(line.trim().slice(2));
      return;
    }

    // If we hit non-list content, flush any pending list
    flushList(idx);

    // Headings
    if (line.startsWith("### ")) {
      blocks.push(<h4 key={`h4-${idx}`}>{renderInlineBold(line.slice(4))}</h4>);
      return;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h3 key={`h3-${idx}`}>{renderInlineBold(line.slice(3))}</h3>);
      return;
    }
    if (line.startsWith("# ")) {
      blocks.push(<h2 key={`h2-${idx}`}>{renderInlineBold(line.slice(2))}</h2>);
      return;
    }

    // Normal paragraph
    blocks.push(<p key={`p-${idx}`}>{renderInlineBold(line)}</p>);
  });

  flushList("end");
  return blocks;
}

export default function BlogPost({ lang }) {
  const { id } = useParams();

  // Choose correct language file
  const t = lang === "en" ? en : ar;

  const post = blogData.posts.find((p) => p.id === id);

  if (!post) return <h2>Post not found</h2>;

  const body = lang === "en" ? post.body_en : post.body_ar;

  return (
    <>
      <section className="blog-post">
        <h2>{lang === "en" ? post.title_en : post.title_ar}</h2>

        <p className="author">
          {lang === "en" ? post.author_en : post.author_ar}
        </p>

        <div className="blog-body">
          {renderRichBody(body)}
        </div>

        <Link to="/blog" className="see-more-btn">
          {lang === "en" ? "← Back to Blog" : "← العودة للمدونة"}
        </Link>
      </section>

      <Footer text={t.footer} lang={lang} />
    </>
  );
}
