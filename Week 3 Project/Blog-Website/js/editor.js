document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const pageTitle = document.getElementById('page-title');
    const submitBtn = document.getElementById('submit-btn');
    
    // Check if we are editing an existing blog
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    
    if (blogId) {
        const blog = getBlogById(blogId);
        if (blog) {
            pageTitle.textContent = 'Edit Blog';
            submitBtn.textContent = 'Update Blog';
            document.getElementById('title').value = blog.title;
            document.getElementById('author').value = blog.author || '';
            document.getElementById('content').value = blog.content;
        } else {
            alert('Blog not found!');
            window.location.href = 'index.html';
        }
    }

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const blogData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            content: document.getElementById('content').value
        };

        if (blogId) {
            blogData.id = blogId;
        }

        saveBlog(blogData);
        window.location.href = 'index.html';
    });
});
