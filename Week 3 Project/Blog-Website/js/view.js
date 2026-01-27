document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('blog-content');
    const editLink = document.getElementById('edit-link');
    
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (!blogId) {
        window.location.href = 'index.html';
        return;
    }

    const blog = getBlogById(blogId);

    if (blog) {
        document.title = `${blog.title} - BlogPlatform`;
        editLink.href = `editor.html?id=${blog.id}`;
        
        contentArea.innerHTML = `
            <h1>${escapeHtml(blog.title)}</h1>
            <div class="meta">
                By <strong>${escapeHtml(blog.author || 'Anonymous')}</strong> • Published on ${formatDate(blog.createdAt)}
                ${blog.updatedAt !== blog.createdAt ? ` • Updated on ${formatDate(blog.updatedAt)}` : ''}
            </div>
            <div class="body">${escapeHtml(blog.content)}</div>
        `;
    } else {
        contentArea.innerHTML = `
            <div class="empty-state">
                <h1>Blog Not Found</h1>
                <p>The blog you are looking for does not exist or has been removed.</p>
                <br>
                <a href="index.html" class="btn btn-primary">Go to Home</a>
            </div>
        `;
        editLink.style.display = 'none';
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
