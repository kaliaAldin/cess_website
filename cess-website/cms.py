import json
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import subprocess

# ======================================================================
#   ENABLE PASTE IN ALL TEXT FIELDS (FIX FOR WINDOWS / macOS / LINUX)
# ======================================================================

def enable_paste(widget):
    widget.bind("<Control-v>", lambda e: widget.event_generate("<<Paste>>"))
    widget.bind("<Control-V>", lambda e: widget.event_generate("<<Paste>>"))
    widget.bind("<Command-v>", lambda e: widget.event_generate("<<Paste>>"))  # macOS
    widget.bind("<Button-3>", lambda e: widget.event_generate("<<Paste>>"))   # right-click paste


# ======================================================================
#   FILE HELPERS
# ======================================================================

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# ======================================================================
#   FILE PATHS
# ======================================================================

EN_PATH = "src/data/en.json"
AR_PATH = "src/data/Ar.json"
BLOG_PATH = "src/data/blog.json"
TICKER_PATH = "src/data/ticker.json"

en_data = load_json(EN_PATH)
ar_data = load_json(AR_PATH)
blog_data = load_json(BLOG_PATH)
ticker_data = load_json(TICKER_PATH)


# ======================================================================
#   TKINTER WINDOW
# ======================================================================

root = tk.Tk()
root.title("CESS Local CMS")
root.geometry("1100x1000")

notebook = ttk.Notebook(root)
notebook.pack(fill="both", expand=True)


# ======================================================================
#   TAB: TICKER
# ======================================================================

frame_ticker = ttk.Frame(notebook)
notebook.add(frame_ticker, text="Ticker")

# ------------- Ticker 1 -----------------

ttk.Label(frame_ticker, text="Ticker 1 Text").pack(anchor="w", pady=4)
ticker1_box = scrolledtext.ScrolledText(frame_ticker, height=3, wrap="word")
ticker1_box.pack(fill="x", padx=10, pady=4)
ticker1_box.insert("1.0", ticker_data["ticker_1"]["text"])
enable_paste(ticker1_box)

# ------------- Ticker 2 -----------------

ttk.Label(frame_ticker, text="Ticker 2 Segments").pack(anchor="w", pady=6)

ticker_rows = []

def render_ticker_rows():
    for r in ticker_rows:
        r["frame"].destroy()
    ticker_rows.clear()

    for segment in ticker_data["ticker_2"]["segments"]:
        add_ticker_row(segment)

def add_ticker_row(segment=None):
    if segment is None:
        segment = {"type": "text", "value": ""}

    row_frame = ttk.Frame(frame_ticker)
    row_frame.pack(fill="x", pady=3, padx=10)

    type_var = tk.StringVar(value=segment["type"])
    type_menu = ttk.Combobox(row_frame, textvariable=type_var, values=["text", "link"], width=8)
    type_menu.grid(row=0, column=0, padx=3)

    label_var = tk.StringVar(value=segment.get("value") or segment.get("label") or "")
    label_entry = ttk.Entry(row_frame, textvariable=label_var, width=35)
    label_entry.grid(row=0, column=1, padx=3)

    url_var = tk.StringVar(value=segment.get("url", ""))
    url_entry = ttk.Entry(row_frame, textvariable=url_var, width=35)
    url_entry.grid(row=0, column=2, padx=3)

    if segment["type"] == "text":
        url_entry.grid_remove()

    def update_url(event=None):
        if type_var.get() == "link":
            url_entry.grid()
        else:
            url_entry.grid_remove()

    type_menu.bind("<<ComboboxSelected>>", update_url)

    def delete_row():
        ticker_rows.remove(row_dict)
        row_frame.destroy()

    tk.Button(row_frame, text="X", fg="red", command=delete_row).grid(row=0, column=3, padx=4)

    row_dict = {
        "frame": row_frame,
        "type": type_var,
        "label": label_var,
        "url": url_var
    }

    ticker_rows.append(row_dict)
    update_url()

tk.Button(frame_ticker, text="+ Add Segment", command=lambda: add_ticker_row(None)).pack(pady=6)

def save_ticker():
    ticker_data["ticker_1"]["text"] = ticker1_box.get("1.0", "end").strip()

    new_segments = []
    for r in ticker_rows:
        if r["type"].get() == "text":
            new_segments.append({
                "type": "text",
                "value": r["label"].get()
            })
        else:
            new_segments.append({
                "type": "link",
                "label": r["label"].get(),
                "url": r["url"].get()
            })

    ticker_data["ticker_2"]["segments"] = new_segments

    save_json(TICKER_PATH, ticker_data)
    messagebox.showinfo("Saved", "Ticker updated successfully.")

tk.Button(frame_ticker, text="Save Ticker", command=save_ticker).pack(pady=10)

render_ticker_rows()


# ======================================================================
#   FUNCTION: CREATE TEXT FIELD
# ======================================================================

def create_text_field(parent, label, initial):
    ttk.Label(parent, text=label).pack(anchor="w", pady=2)
    box = scrolledtext.ScrolledText(parent, height=4, wrap="word")
    box.pack(fill="x", pady=3)
    box.insert("1.0", initial)
    enable_paste(box)
    return box


# ======================================================================
#   TAB: ENGLISH
# ======================================================================

frame_en = ttk.Frame(notebook)
notebook.add(frame_en, text="English")

en_fields = {}
en_fields["hero_title"] = create_text_field(frame_en, "Hero Title", en_data["hero"]["title"])
en_fields["hero_text"] = create_text_field(frame_en, "Hero Text", en_data["hero"]["text"])
en_fields["about_heading"] = create_text_field(frame_en, "About Heading", en_data["about"]["heading"])
en_fields["about_body"] = create_text_field(frame_en, "About Body", en_data["about"]["body"])


def save_en():
    en_data["hero"]["title"] = en_fields["hero_title"].get("1.0", "end").strip()
    en_data["hero"]["text"] = en_fields["hero_text"].get("1.0", "end").strip()
    en_data["about"]["heading"] = en_fields["about_heading"].get("1.0", "end").strip()
    en_data["about"]["body"] = en_fields["about_body"].get("1.0", "end").strip()

    save_json(EN_PATH, en_data)
    messagebox.showinfo("Saved", "English content saved.")

tk.Button(frame_en, text="Save English", command=save_en).pack(pady=10)


# ======================================================================
#   TAB: ARABIC
# ======================================================================

frame_ar = ttk.Frame(notebook)
notebook.add(frame_ar, text="Arabic")

ar_fields = {}
ar_fields["hero_title"] = create_text_field(frame_ar, "Hero Title AR", ar_data["hero"]["title"])
ar_fields["hero_text"] = create_text_field(frame_ar, "Hero Text AR", ar_data["hero"]["text"])
ar_fields["about_heading"] = create_text_field(frame_ar, "About Heading AR", ar_data["about"]["heading"])
ar_fields["about_body"] = create_text_field(frame_ar, "About Body AR", ar_data["about"]["body"])

def save_ar():
    ar_data["hero"]["title"] = ar_fields["hero_title"].get("1.0", "end").strip()
    ar_data["hero"]["text"] = ar_fields["hero_text"].get("1.0", "end").strip()
    ar_data["about"]["heading"] = ar_fields["about_heading"].get("1.0", "end").strip()
    ar_data["about"]["body"] = ar_fields["about_body"].get("1.0", "end").strip()

    save_json(AR_PATH, ar_data)
    messagebox.showinfo("Saved", "Arabic content saved.")

tk.Button(frame_ar, text="Save Arabic", command=save_ar).pack(pady=10)
#======================================================================================
#Tap projects
#======================================================================================
frame_projects = ttk.Frame(notebook)
notebook.add(frame_projects, text="projects")
project_fields = {}
project_Endata = en_data["projects"]
project_fields["project_1_header"] = create_text_field(frame_projects, "Project-1 Header", project_Endata ["project_1"]["header"])
project_fields["project_1_body"] = create_text_field(frame_projects, "Project-1 details", project_Endata ["project_1"]["body"])
project_fields["project_2_header"] = create_text_field(frame_projects, "Project-2 Header", project_Endata ["project_2"]["header"])
project_fields["project_2_body"] = create_text_field(frame_projects, "Project-2 details", project_Endata ["project_2"]["body"])
project_fields["project_3_header"] = create_text_field(frame_projects, "Project-3 Header", project_Endata ["project_3"]["header"])
project_fields["project_3_body"] = create_text_field(frame_projects, "Project-3 details", project_Endata ["project_3"]["body"])
project_fields["project_4_header"] = create_text_field(frame_projects, "Project-4 Header", project_Endata ["project_4"]["header"])
project_fields["project_4_body"] = create_text_field(frame_projects, "Project-4 details", project_Endata ["project_4"]["body"])

def save_project():
    project_Endata["project_1"]["header"] = project_fields["project_1_header"].get("1.0", "end").strip()
    project_Endata["project_1"]["body"] = project_fields["project_1_body"].get("1.0", "end").strip()
    project_Endata["project_2"]["header"] = project_fields["project_2_header"].get("1.0", "end").strip()
    project_Endata["project_2"]["body"] = project_fields["project_2_body"].get("1.0", "end").strip()
    project_Endata["project_3"]["header"] = project_fields["project_3_header"].get("1.0", "end").strip()
    project_Endata["project_3"]["body"] = project_fields["project_3_body"].get("1.0", "end").strip()
    project_Endata["project_4"]["header"] = project_fields["project_4_header"].get("1.0", "end").strip()
    project_Endata["project_4"]["body"] = project_fields["project_4_body"].get("1.0", "end").strip()

    save_json(EN_PATH , en_data)
    messagebox.showinfo("Saved", "Project Change content saved.")

tk.Button(frame_projects, text="Save Project", command=save_project).pack(pady=10)
# ======================================================================
#   TAB: BLOG MANAGER
# ======================================================================

frame_blog = ttk.Frame(notebook)
notebook.add(frame_blog, text="Blog")

post_selector = ttk.Combobox(frame_blog, values=[p["id"] for p in blog_data["posts"]])
post_selector.pack(pady=5)

blog_fields = {}

def create_blog_field(label):
    ttk.Label(frame_blog, text=label).pack(anchor="w")
    box = scrolledtext.ScrolledText(frame_blog, height=3, wrap="word")
    box.pack(fill="x", padx=5, pady=3)
    enable_paste(box)
    return box

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
    if not post:
        return

    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")
        blog_fields[key].insert("1.0", post[key])

post_selector.bind("<<ComboboxSelected>>", load_post)

def add_new_post():
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

    blog_data["posts"].append(new_post)
    post_selector["values"] = [p["id"] for p in blog_data["posts"]]
    post_selector.set(next_id)

    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")

    messagebox.showinfo("New Post", f"Created new post: {next_id}")

def delete_post():
    pid = post_selector.get()
    if not pid:
        messagebox.showerror("Error", "Select a post to delete.")
        return

    if not messagebox.askyesno("Confirm", f"Delete post {pid}?"):
        return

    blog_data["posts"] = [p for p in blog_data["posts"] if p["id"] != pid]
    save_json(BLOG_PATH, blog_data)

    post_selector["values"] = [p["id"] for p in blog_data["posts"]]
    post_selector.set("")

    for key in blog_fields:
        blog_fields[key].delete("1.0", "end")

    messagebox.showinfo("Deleted", f"Post {pid} deleted.")

def save_post():
    pid = post_selector.get()
    post = next((p for p in blog_data["posts"] if p["id"] == pid), None)

    if not post:
        messagebox.showerror("Error", "Select a post first.")
        return

    for key in blog_fields:
        post[key] = blog_fields[key].get("1.0", "end").strip()

    save_json(BLOG_PATH, blog_data)
    messagebox.showinfo("Saved", "Blog post updated.")

tk.Button(frame_blog, text="+ Add New Post", command=add_new_post).pack(pady=5)
tk.Button(frame_blog, text="Delete Post", fg="red", command=delete_post).pack(pady=5)
tk.Button(frame_blog, text="Save Post", command=save_post).pack(pady=10)


# ======================================================================
#   BUILD BUTTON
# ======================================================================

def run_build():
    subprocess.Popen(["npm", "run", "build"], shell=True)
    messagebox.showinfo("Build", "npm build started.")

tk.Button(root, text="Run Build", bg="green", fg="white", command=run_build).pack(pady=20)


# ======================================================================
#   START APP
# ======================================================================

root.mainloop()
