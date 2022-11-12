const divComments = document.getElementById("comments");
let commentsAdd = "";

const allComments = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/comments?_limit=15");
  return await data.map((comment) => {
    commentsAdd += `<p>
        <strong>${comment.name}</strong> <small>${comment.email}</small>
        <br />
        ${comment.body}
      </p>`;
   return  divComments.innerHTML = commentsAdd;
  });
};

allComments();