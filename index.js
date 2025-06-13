let bookmarks= [];
const nameInput = document.getElementById("bookMarkName");
const urlInput = document.getElementById("SiteNameInput");  

function addbookmark(){
    const name=nameInput.value.trim();
    const url=urlInput.value.trim();
    
    correctUrl= /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

if(name=="" || url==""){
    alert("Please fill in both fields.");
    return;
}
if(!correctUrl.test(url)){
    alert("Please enter a valid URL.");
    return;
}

const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
const bookmark={
    name,
    url:formattedUrl
};
bookmarks.push(bookmark);
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
displayBookmarks()
clearInputs();
}


function displayBookmarks() {
    const tableContent=document.getElementById('tableContent');
    tableContent.innerHTML = ""; // Clear previous entries
    for(let i=0;i<bookmarks.length;i++){
        const bookmark = bookmarks[i]; // Get the bookmark object
        const table=`
        <tr>
      <td>${i + 1}</td>
      <td>${bookmark.name}</td>
      <td><a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm"><i class="fas fa-eye"></i> Visit</a></td>
      <td><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete</button></td>
    </tr>
    ` ;
        tableContent.innerHTML += table;
    }
}
function clearInputs(){
    nameInput.value = "";
    urlInput.value="";

}
function deleteBookmark(i) {
    bookmarks.splice(i, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); 
    displayBookmarks();
}

function loadBookmarks() {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
        bookmarks = JSON.parse(storedBookmarks);
        displayBookmarks();
    }
}

window.onload = loadBookmarks;
