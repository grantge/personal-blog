// DOM variables
 
const postTitle = document.querySelector('.title');
const postMessage = document.querySelector('.text');
const postId = document.querySelector('.id');

const btnCreate = document.querySelector('.create-btn');
const btnEdit = document.querySelector('.update-btn');

const btnDelete = document.querySelector('.delete_btn');
const btnUpdate = document.querySelector('.update_btn');

const out = document.querySelector('.posts-container');

// REST API (Frontend)

// GET request

async function getReq () {

    out.innerHTML = '';

    const posts = await axios.get('/posts');
    posts.data.forEach(post => {

    out.innerHTML +=
    `
    <div class="posts">
        <div class="post-container">
            <h4 class="post-title">${post.title}</h4>
            <p class="post-message">${post.message}</p>
            <div class="buttons">
                <button id="${post._id}" onclick="deleteReq(id)" type="button" class="delete_btn" >delete</button>
                <button id="${post._id}" value="${post.title}" name="${post.message}" onclick="showBtn(id, value, name)" type="button" class="update_btn">update</button>
            </div>
        </div>
    </div>
    `
    postTitle.value = '';
    postMessage.value = '';
        })
};

// POST request

async function postReq() {

    try {
        const response = await axios.post('/posts', {
            title:`${postTitle.value}`,
            message:`${postMessage.value}`
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    } 
};

// DELETE request

async function deleteReq(id) {
    out.innerHTML = '';
    getReq();

    try {
        const response = await axios.delete('./posts/' + id);
        console.log(response);
    } catch (error) {
        console.log(error)
    }
};

// PUT request

async function putReq() {
    
    try {
        const response = await axios.put('/posts', {
            id: postId.value,
            title: postTitle.value,
            message: postMessage.value
        })
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

// Listeners

function showBtn(id, dataTitle, dataMessage) {
    btnEdit.style.display = 'inline';
    postId.style.display = 'block';

    postTitle.style.border = '2px solid #0c6dce';
    postMessage.style.border = '2px solid #0c6dce';
   
    setTimeout( () => {
        postTitle.style.border = '1px solid #353a3f';
        postMessage.style.border = '1px solid #353a3f';
    }, 4000)

    postId.value = id;
    postTitle.value = dataTitle;
    postMessage.value = dataMessage;
}

btnEdit.addEventListener('click', () => {
    putReq();

    btnEdit.style.display = 'none';

    getReq();
})

btnCreate.addEventListener('click', () => { 
    
    postReq();
    getReq();
});

getReq();