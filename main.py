from flask import Flask, abort, Response
from jinja2 import Environment, FileSystemLoader
from markdown import Markdown
import os
import re
import mimetypes

# flask init
app = Flask("main")
app.config.from_pyfile("config.py")


def parse_md(text):
    md = Markdown(extensions=[
        'markdown.extensions.meta',
        "markdown.extensions.footnotes",
        "markdown.extensions.tables"
    ])
    html = md.convert(text)
    metadata = md.Meta

    return html, metadata


def parse_md_file(filename):
    with open(filename) as text:
        return parse_md(text.read())


def file_inside_folder(folder, filename):
    """Joins the {folder} path string and the {filename} path string while
    preventing directory traversal attacks (../../)"""
    # <https://security.openstack.org/guidelines/dg_using-file-paths.html>
    if os.path.abspath(os.path.join(folder, filename))\
            .startswith(os.path.abspath(folder)):
        return os.path.join(folder, filename)
    else:
        abort(403)

# jinja2 init
about_md = parse_md_file("page/about.md")
env = Environment(loader=FileSystemLoader("templates/"))
env.globals = {
    "site_title": "Daniel Zachary Franklin",
    "about_image": about_md[1]["navigation_image"][0],
    "about_tagline": about_md[1]["tagline"][0],
    "email": about_md[1]["email"][0]
}


@app.route("/")
def index_page():
    template = env.get_template("home.html")

    pages = []
    page_name_regex = re.compile("(.+)\.md$")
    partial_content_regex = re.compile("^((?:\n|.)+)\
<\!--(?: |)full(?: |_)content(?: |)-->", re.MULTILINE)
    for page_name in os.listdir("page/"):
        if page_name[0] != "_":
            md = parse_md_file("page/%s" % page_name)

            meta = md[1]
            url = "/page/%s" % page_name_regex.match(page_name).group(1)
            content = partial_content_regex.match(md[0])
            if content:  # there is something to cut off
                content = content.group(1) +\
                    "<a href=\"%s\">Continue ...</a>" % url
            else:  # just take the entire thing
                content = md[0]

            pages.append({
                "page_name": url,
                "title": meta["title"][0],
                "small_image": meta["image"][1] if "image" in meta and
                len(meta["image"]) > 1 else False,
                "order": meta["order"][0],
                "content": content
            })

    def page_numberer(page):
        if page["order"] == "top":
            return -float("inf")
        else:
            return -int(page["order"])
    pages.sort(key=page_numberer)

    return template.render(pages=pages)


@app.route("/page/<path:path>")
def standard_page(path):
    try:
        template = env.get_template("page.html")

        md = parse_md_file(file_inside_folder("page", path + ".md"))
        content = md[0]

        p_strip_regex = re.compile("<p>(.+)</p>")
        metadata = md[1]
        md_ified_metadata = {}
        for name, list_of_items in metadata.items():
            md_ified_entry_list = []
            for item in list_of_items:
                md_ified_entry_list.append(
                    p_strip_regex.match(parse_md(item)[0]).group(1)
                )
            md_ified_metadata[name] = md_ified_entry_list

        return template.render(content=content, metadata=md_ified_metadata)
    except IOError:
        abort(404)


@app.route("/project/<path:path>")
def project_page(path):
    try:
        if path[len(path) - 1] == "/":  # it is a folder:
            path = path + "index.html"

        with open(file_inside_folder("project", path)) as text:
            filename = path.split("/")[len(path.split("/")) - 1]
            filename = "application/octet-stream" if filename is None\
                else filename
            return Response(text.read(),
                            mimetype=mimetypes.guess_type(filename)[0])
    except IOError as e:
        print(str(e))
        abort(404)
