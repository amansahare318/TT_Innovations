document.addEventListener('DOMContentLoaded', () => {
    seedTechnicalBlogs(); // Seed data if platform is empty
    renderBlogs();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderBlogs(searchTerm);
    });
});

function renderBlogs(searchTerm = '') {
    const blogList = document.getElementById('blog-list');
    let blogs = getBlogs();

    if (searchTerm) {
        blogs = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm) || 
            blog.content.toLowerCase().includes(searchTerm) ||
            (blog.author && blog.author.toLowerCase().includes(searchTerm))
        );
    }

    if (blogs.length === 0) {
        blogList.innerHTML = `
            <div class="empty-state">
                <h2>${searchTerm ? 'No matching blogs found' : 'No blogs yet'}</h2>
                <p>${searchTerm ? 'Try a different search term.' : 'Be the first to share your thoughts!'}</p>
                ${searchTerm ? '' : '<br><a href="editor.html" class="btn btn-primary">Create Your First Blog</a>'}
            </div>
        `;
        return;
    }

    // Sort blogs by newest first
    const sortedBlogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    blogList.innerHTML = sortedBlogs.map(blog => `
        <article class="blog-card">
            <h2>${escapeHtml(blog.title)}</h2>
            <div class="meta">
                By <strong>${escapeHtml(blog.author || 'Anonymous')}</strong> • Published on ${formatDate(blog.createdAt)}
            </div>
            <p>${escapeHtml(blog.content.substring(0, 150))}${blog.content.length > 150 ? '...' : ''}</p>
            <div class="actions">
                <a href="view.html?id=${blog.id}" class="btn btn-outline">Read More</a>
                <a href="editor.html?id=${blog.id}" class="btn btn-outline">Edit</a>
                <button onclick="handleDelete('${blog.id}')" class="btn btn-danger">Delete</button>
            </div>
        </article>
    `).join('');
}

function handleDelete(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
        deleteBlog(id);
        renderBlogs();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
