// Storage Key
const STORAGE_KEY = 'blog_platform_data';

// Helper to get all blogs
function getBlogs() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Helper to save all blogs
function saveBlogs(blogs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

// Get a single blog by ID
function getBlogById(id) {
    const blogs = getBlogs();
    return blogs.find(blog => blog.id === id);
}

// Create or Update a blog
function saveBlog(blogData) {
    const blogs = getBlogs();
    
    if (blogData.id) {
        // Update
        const index = blogs.findIndex(b => b.id === blogData.id);
        if (index !== -1) {
            blogs[index] = {
                ...blogs[index],
                ...blogData,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // Create
        const newBlog = {
            ...blogData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        blogs.push(newBlog);
    }
    
    saveBlogs(blogs);
    return true;
}

// Delete a blog
function deleteBlog(id) {
    let blogs = getBlogs();
    blogs = blogs.filter(blog => blog.id !== id);
    saveBlogs(blogs);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Seed technical blogs if empty
function seedTechnicalBlogs() {
    const blogs = getBlogs();
    // Re-seed if empty or if existing blogs are missing author field (old version)
    if (blogs.length === 0 || (blogs.length > 0 && !blogs[0].author)) {
        const technicalBlogs = [
            {
                id: 'tech-1',
                title: 'The Rise of Quantum Computing',
                author: 'TechPioneer',
                content: 'Quantum computing is no longer a theoretical concept. With companies like IBM and Google making breakthroughs, we are entering an era where complex problems that would take classical computers millennia to solve can be processed in minutes. This blog explores the fundamentals of qubits and why they matter for the future of encryption and drug discovery.',
                createdAt: new Date(Date.now() - 400000000).toISOString(),
                updatedAt: new Date(Date.now() - 400000000).toISOString()
            },
            {
                id: 'tech-2',
                title: 'Why Rust is the Future of Systems Programming',
                author: 'CodeMaster',
                content: 'Memory safety without a garbage collector—this is the promise of Rust. As software becomes more complex, the risk of memory leaks and buffer overflows increases. Rust\'s ownership model ensures safety at compile time, making it the preferred choice for new projects at Microsoft, AWS, and Meta. We look at how Rust compares to C++ in 2026.',
                createdAt: new Date(Date.now() - 300000000).toISOString(),
                updatedAt: new Date(Date.now() - 300000000).toISOString()
            },
            {
                id: 'tech-3',
                title: 'Mastering React Server Components',
                author: 'WebDevExpert',
                content: 'The shift from client-side rendering to Server Components has changed how we think about web performance. By moving heavy logic to the server, we reduce the JavaScript bundle size sent to the user, leading to faster load times and better SEO. Learn the best practices for implementing RSC in your next Next.js project.',
                createdAt: new Date(Date.now() - 200000000).toISOString(),
                updatedAt: new Date(Date.now() - 200000000).toISOString()
            },
            {
                id: 'tech-4',
                title: 'AI in DevOps: Automating the Pipeline',
                author: 'CloudArchitect',
                content: 'Artificial Intelligence is revolutionizing DevOps by predicting deployment failures before they happen. From AI-driven log analysis to automated code reviews, the "AIOps" movement is helping teams deploy faster and with more confidence. This article covers the top tools you should be using in 2026.',
                createdAt: new Date(Date.now() - 100000000).toISOString(),
                updatedAt: new Date(Date.now() - 100000000).toISOString()
            },
            {
                id: 'tech-5',
                title: 'Understanding Web3 and Decentralized Identity',
                author: 'CryptoGuru',
                content: 'Beyond the hype of cryptocurrencies lies the true potential of Web3: Decentralized Identity (DID). Imagine owning your data and identity across every platform without needing a central authority like Google or Facebook. We dive into the protocols making this a reality and what it means for user privacy.',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        saveBlogs(technicalBlogs);
    }
}
