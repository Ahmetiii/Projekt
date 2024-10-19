let posts = []; 
let currentPostId = null;

document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('new-post-btn');
    const submitPostBtn = document.getElementById('submit-post');
    const cancelPostBtn = document.getElementById('cancel-post');
    const submitCommentBtn = document.getElementById('submit-comment');

    newPostBtn.addEventListener('click', () => {
        document.getElementById('new-post-section').classList.remove('hidden');
        document.getElementById('post-list').classList.add('hidden');
        document.getElementById('post-detail').classList.add('hidden');
    });

    submitPostBtn.addEventListener('click', () => {
        const title = document.getElementById('new-post-title').value;
        const content = document.getElementById('new-post-content').value;
        if (title && content) {
            const newPost = {
                id: Date.now(),
                title: title,
                content: content,
                comments: []
            };
            posts.push(newPost);
            displayPosts();
            document.getElementById('new-post-section').classList.add('hidden');
            document.getElementById('post-list').classList.remove('hidden');
        }
    });

    cancelPostBtn.addEventListener('click', () => {
        document.getElementById('new-post-section').classList.add('hidden');
        document.getElementById('post-list').classList.remove('hidden');
    });

    submitCommentBtn.addEventListener('click', () => {
        const commentText = document.getElementById('comment-input').value;
        if (commentText && currentPostId !== null) {
            const post = posts.find(p => p.id === currentPostId);
            if (post) {
                post.comments.push(commentText);
                displayPostDetail(currentPostId);
            }
        }
    });
});

function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.textContent = post.title;
        postElement.addEventListener('click', () => {
            displayPostDetail(post.id);
        });
        postsContainer.appendChild(postElement);
    });
}

function displayPostDetail(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        currentPostId = postId;
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-content').textContent = post.content;
        
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        post.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });

        document.getElementById('post-detail').classList.remove('hidden');
        document.getElementById('post-list').classList.add('hidden');
        document.getElementById('new-post-section').classList.add('hidden');
    }
}
