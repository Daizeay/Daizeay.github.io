document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('username');
    const gallery = document.getElementById('gallery');

    async function fetchRepos(username) {
        try {
            const url = `https://api.github.com/users/${username}/repos?per_page=20`;
            const response = await fetch(url);
            const repos = await response.json();

            if (repos.message === "Not Found") {
                gallery.innerHTML = "<p>User not found. Please try again.</p>";
                return;
            }

            gallery.innerHTML = "";
            repos.forEach(repo => createRepoCard(repo, username));
        } catch (error) {
            console.error("Error fetching repositories:", error);
            gallery.innerHTML = "<p>Failed to load repositories. Try again later.</p>";
        }
    }

    async function fetchCommits(username, repoName) {
        try {
            const url = `https://api.github.com/repos/${username}/${repoName}/commits`;
            const response = await fetch(url);
            const commits = await response.json();
            return commits.length || "N/A";
        } catch (error) {
            console.error(`Error fetching commits for ${repoName}:`, error);
            return "N/A";
        }
    }

    async function fetchLanguages(url) {
        try {
            const response = await fetch(url);
            const languages = await response.json();
            return Object.keys(languages).join(", ") || "N/A";
        } catch (error) {
            console.error("Error fetching languages:", error);
            return "N/A";
        }
    }

    async function createRepoCard(repo, username) {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        const repoName = document.createElement('h3');
        repoName.classList.add('repo-name');
        repoName.innerHTML = `<i class="fab fa-github"></i> ${repo.name}`;

        const description = document.createElement('p');
        description.textContent = repo.description || "No description available.";

        const createdAt = document.createElement('p');
        createdAt.innerHTML = `<strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}`;

        const updatedAt = document.createElement('p');
        updatedAt.innerHTML = `<strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}`;

        const commits = document.createElement('p');
        commits.innerHTML = `<strong>Commits:</strong> ${await fetchCommits(username, repo.name)}`;

        const languages = document.createElement('p');
        languages.innerHTML = `<strong>Languages:</strong> ${await fetchLanguages(repo.languages_url)}`;

        const watchers = document.createElement('p');
        watchers.innerHTML = `<strong>Watchers:</strong> ${repo.watchers_count}`;

        const link = document.createElement('a');
        link.href = repo.html_url;
        link.target = "_blank";
        link.textContent = "View on GitHub";

        repoCard.append(repoName, description, createdAt, updatedAt, commits, languages, watchers, link);
        gallery.appendChild(repoCard);
    }

    searchButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchRepos(username);
        }
    });

    fetchRepos('Daizeay'); // Default username
});
