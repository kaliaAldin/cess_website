import json
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import subprocess
import os

# ==== Helper functions ====


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ==== Load JSON files ====
EN_PATH = "src/data/en.json"
AR_PATH = "src/data/Ar.json"
BLOG_PATH = "src/data/blog.json"
TICKER_PATH = "src/data/ticker.json"
en_data = load_json(EN_PATH)
ar_data = load_json(AR_PATH)
blog_data = load_json(BLOG_PATH)
ticker_data = load_json(TICKER_PATH)

root = tk.Tk()
root.title("CESS Local CMS")
root.geometry("1000x1000")

notebook = ttk.Notebook(root)
notebook.pack(fill="both", expand=True)

# ============================================================
#Ticker
#=============================================================
frame_ticker = ttk.Frame(notebook)
notebook.add(frame_ticker, text="Ticker")
# Ticker 1
ttk.Label(frame_ticker, text="Ticker 1 Text").pack(anchor="w")
ticker1_box = scrolledtext.ScrolledText(frame_ticker, height=3, wrap="word")
ticker1_box.pack(fill="x", padx=10, pady=5)
ticker1_box.insert("1.0", ticker_data["ticker_1"]["text"])

# Ticker 2
ttk.Label(frame_ticker, text="Ticker 2 Segments (JSON)").pack(anchor="w")
ticker2_box = scrolledtext.ScrolledText(frame_ticker, height=12, wrap="word")
ticker2_box.pack(fill="both", padx=10, pady=5)
ticker2_box.insert("1.0", json.dumps(ticker_data["ticker_2"]["segments"], ensure_ascii=False, indent=2))
def save_ticker():
    try:
        ticker_data["ticker_1"]["text"] = ticker1_box.get("1.0", "end").strip()

        segments_json = ticker2_box.get("1.0", "end")
        ticker_data["ticker_2"]["segments"] = json.loads(segments_json)

        save_json(TICKER_PATH, ticker_data)
        messagebox.showinfo("Saved", "Ticker updated successfully.")
    except Exception as e:
        messagebox.showerror("Error", str(e))
tk.Button(frame_ticker, text="Save Ticker", command=save_ticker).pack(pady=10)


# ============================================================
#  TAB 1: ENGLISH
# ============================================================

frame_en = ttk.Frame(notebook)
notebook.add(frame_en, text="English")

# Textboxes dictionary
en_fields = {}


def create_text_field(parent, label, initial):
    ttk.Label(parent, text=label).pack(anchor="w")
    box = scrolledtext.ScrolledText(parent, height=4, wrap="word")
    box.pack(fill="x", pady=3)
    box.insert("1.0", initial)
    return box

# Create fields for English JSON
en_fields["hero_title"] = create_text_field(frame_en, "Hero Title", en_data["hero"]["title"])
en_fields["hero_text"] = create_text_field(frame_en, "Hero Text", en_data["hero"]["text"])
en_fields["about_heading"] = create_text_field(frame_en, "About Heading", en_data["about"]["heading"])
en_fields["about_body"] = create_text_field(frame_en, "About Body", en_data["about"]["body"])

def save_en():
    try:
        en_data["hero"]["title"] = en_fields["hero_title"].get("1.0", "end").strip()
        en_data["hero"]["text"] = en_fields["hero_text"].get("1.0", "end").strip()
        en_data["about"]["heading"] = en_fields["about_heading"].get("1.0", "end").strip()
        en_data["about"]["body"] = en_fields["about_body"].get("1.0", "end").strip()

        save_json(EN_PATH, en_data)
        messagebox.showinfo("Saved", "English content saved successfully.")
    except Exception as e:
        messagebox.showerror("Error", str(e))

tk.Button(frame_en, text="Save English", command=save_en).pack(pady=10)

# ============================================================
#  TAB 2: ARABIC
# ============================================================

frame_ar = ttk.Frame(notebook)
notebook.add(frame_ar, text="Arabic")

ar_fields = {}

ar_fields["hero_title"] = create_text_field(frame_ar, "Hero Title AR", ar_data["hero"]["title"])
ar_fields["hero_text"] = create_text_field(frame_ar, "Hero Text AR", ar_data["hero"]["text"])
ar_fields["about_heading"] = create_text_field(frame_ar, "About Heading AR", ar_data["about"]["heading"])
ar_fields["about_body"] = create_text_field(frame_ar, "About Body AR", ar_data["about"]["body"])

def save_ar():
    try:
        ar_data["hero"]["title"] = ar_fields["hero_title"].get("1.0", "end").strip()
        ar_data["hero"]["text"] = ar_fields["hero_text"].get("1.0", "end").strip()
        ar_data["about"]["heading"] = ar_fields["about_heading"].get("1.0", "end").strip()
        ar_data["about"]["body"] = ar_fields["about_body"].get("1.0", "end").strip()

        save_json(AR_PATH, ar_data)
        messagebox.showinfo("Saved", "Arabic content saved successfully.")
    except Exception as e:
        messagebox.showerror("Error", str(e))

tk.Button(frame_ar, text="Save Arabic", command=save_ar).pack(pady=10)

# ============================================================
#  TAB 3: BLOG EDITOR
# ============================================================

frame_blog = ttk.Frame(notebook)
notebook.add(frame_blog, text="Blog")

post_selector = ttk.Combobox(frame_blog, values=[p["id"] for p in blog_data["posts"]])
post_selector.pack(pady=5)

blog_fields = {}

def create_blog_field(label):
    ttk.Label(frame_blog, text=label).pack(anchor="w")
    box = scrolledtext.ScrolledText(frame_blog, height=3, wrap="word")
    box.pack(fill="x", padx=5, pady=2)
    return box

# Blog textboxes
blog_fields["title_en"] = create_blog_field("Title (EN)")
blog_fields["title_ar"] = create_blog_field("Title (AR)")
blog_fields["preview_en"] = create_blog_field("Preview (EN)")
blog_fields["preview_ar"] = create_blog_field("Preview (AR)")
blog_fields["body_en"] = create_blog_field("Body (EN)")
blog_fields["body_ar"] = create_blog_field("Body (AR)")
blog_fields["author_en"] = create_blog_field("Author (EN)")
blog_fields["author_ar"] = create_blog_field("Author (AR)")

def load_post(event=None):
    pid = post_selector.get()
    post = next((p for p in blog_data["posts"] if p["id"] == pid), None)
    if not post: return

    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")
        blog_fields[key].insert("1.0", post[key])

post_selector.bind("<<ComboboxSelected>>", load_post)

def delete_post():
    pid = post_selector.get()

    if not pid:
        messagebox.showerror("Error", "Select a post to delete.")
        return

    # confirm
    if not messagebox.askyesno("Delete Post", f"Are you sure you want to delete post {pid}?"):
        return

    # remove
    blog_data["posts"] = [p for p in blog_data["posts"] if p["id"] != pid]

    # save
    save_json(BLOG_PATH, blog_data)

    # update UI
    post_selector["values"] = [p["id"] for p in blog_data["posts"]]

    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")

    post_selector.set("")
    messagebox.showinfo("Deleted", f"Post {pid} deleted.")

def add_new_post():
    # Automatically find next ID
    existing_ids = [int(p["id"]) for p in blog_data["posts"]]
    next_id = str(max(existing_ids) + 1) if existing_ids else "1"

    new_post = {
        "id": next_id,
        "title_en": "",
        "title_ar": "",
        "preview_en": "",
        "preview_ar": "",
        "body_en": "",
        "body_ar": "",
        "author_en": "",
        "author_ar": ""
    }

    # Add to local data
    blog_data["posts"].append(new_post)

    # Update dropdown list
    post_selector["values"] = [p["id"] for p in blog_data["posts"]]
    post_selector.set(next_id)

    # Clear and load fields
    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")
        blog_fields[key].insert("1.0", "")

    messagebox.showinfo("New Post", f"Created new post with ID {next_id}")

def save_post():
    pid = post_selector.get()
    post = next((p for p in blog_data["posts"] if p["id"] == pid), None)

    if not post:
        messagebox.showerror("Error", "Post ID not selected.")
        return

    for key in blog_fields:
        post[key] = blog_fields[key].get("1.0", "end").strip()

    save_json(BLOG_PATH, blog_data)
    messagebox.showinfo("Saved", "Blog post updated.")


tk.Button(frame_blog, text="+ Add New Post", command=add_new_post).pack(pady=5)
tk.Button(frame_blog, text="Delete Post", fg="red", command=delete_post).pack(pady=5)
tk.Button(frame_blog, text="Save Post", command=save_post).pack(pady=10)

# ============================================================
# Build button
# ============================================================

def run_build():
    subprocess.Popen(["npm", "run", "build"], shell=True)
    messagebox.showinfo("Build", "Build started in background.")

tk.Button(root, text="Run npm build", bg="green", fg="white", command=run_build).pack(pady=20)

root.mainloop()
