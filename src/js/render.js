export function renderPost(post) {
  const container = div();
  container.style.clear = "both";
  container.style.margin = "8px 0";
  container.style.border = "1px solid #eaeaea";

  container.appendChild(
    header(avatar(post.avatar), author(post.author), created(post.created))
  );
  container.appendChild(image(post.image));
  container.appendChild(comments(post.comments));
  return container;
}

function header(avatar, author, created) {
  const container = div();
  container.style.padding = "8px";
  avatar.style.float = "left";
  container.appendChild(avatar);
  container.appendChild(author);
  container.appendChild(created);
  return container;
}
function author(name) {
  const el = document.createElement("div");
  el.style.fontWeight = "bolder";
  el.style.lineHeight = "1";
  el.style.marginBottom = "4px";
  el.innerText = name;
  return el;
}
function created(date) {
  date = new Date(date);
  const el = document.createElement("span");
  el.innerText = (date).toLocaleString();
  return el;
}
function avatar(url) {
  const el = document.createElement("img");
  el.src = url;
  el.style.borderRadius = "50%";
  el.style.width = "36px";
  el.style.height = "36px";
  el.style.display = "block";
  el.style.margin = "0 4px 0 0";
  return el;
}

function image(url) {
  url =
    "https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const container = div();
  container.style.maxHeight = "150px";
  container.style.backgroundImage = `url(${url})`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.padding = "100px 0";
  return container;
}

function comments(comments) {
  const container = div();
  container.style.padding = "0 8px 4px";
  const title = document.createElement("h3");
  title.innerText = "Comments";
  container.appendChild(title);
  comments.forEach(data => container.appendChild(comment(data)));
  return container;
}

function comment(data) {
  const avatarEl = avatar(data.avatar);
  const createdEl = created(data.created);
  const content = div();

  avatarEl.style.flexBasis = "36px";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.flexGrow = "1";
  content.appendChild(author(data.author));
  content.appendChild(text(data.content));

  const container = div();
  container.style.display = "flex";
  container.style.margin = "8px 0";
  container.appendChild(avatarEl);
  container.appendChild(content);
  container.appendChild(createdEl);

  return container;
}

function div() {
  return document.createElement("div");
}
function text(t) {
  const el = div();
  el.innerText = t;
  return el;
}
