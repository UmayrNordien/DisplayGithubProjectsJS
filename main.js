// Function to add content to the terminal-like output
function addLine(content, color, level) {
    const output = document.getElementById("output");
    const line = document.createElement("p");
    line.textContent = content;

    if (color === "color1") {
        line.style.color = "#FFB7C3"; // Pastel Pink
    } else if (color === "color2") {
        line.style.color = "#A2D6C4"; // Pastel Mint
    } else {
        line.style.color = "black"; // Default color if not specified
    }

    line.style.marginLeft = `${level * 20}px`;
    output.appendChild(line);
}

// Function to add content to the terminal-like output
function addLine(content, color, level) {
    const output = document.getElementById("output");
    const line = document.createElement("p");
    line.textContent = content;

    if (color === "pink") {
        line.style.color = "#FFB7C3"; // Pastel Pink
    } else if (color === "mint") {
        line.style.color = "#A2D6C4"; // Pastel Mint
    } else if (color === "ice") {
        line.style.color = "#B7B2D6"; // Pastel Blue
    }

    line.style.marginLeft = `${level * 20}px`;
    output.appendChild(line);
}

async function displayGitHubProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const projects = await response.json();

        if (response.ok) {
            projects.forEach((project) => {
                const createdDate = new Date(project.created_at);
                const updatedDate = new Date(project.updated_at);

                addLine(`GitHub Project: ${project.name}`, 'pink', 0);
                addLine(`Description: ${project.description || 'No description'}`, 'mint', 0);
                addLine(`URL: ${project.html_url}`, 'ice', 0);
                addLine(`Created Date: ${createdDate.toDateString()}`, 'mint', 0);
                addLine(`Last Updated: ${updatedDate.toDateString()}`, 'mint', 0);
            });
        } else {
            addLine(`Error fetching GitHub projects: ${projects.message}`, 'error', 0);
        }
    } catch (error) {
        addLine(`Error fetching GitHub projects: ${error.message}`, 'error', 0);
    }
}


// Handle the submit button click event
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
    const inputField = document.getElementById("githubUsernameInput");
    const username = inputField.value.trim();

    if (username) {
        // Clear the previous output
        const output = document.getElementById("output");
        output.innerHTML = "";

        // Display the GitHub projects for the entered username
        displayGitHubProjects(username);
    }
});

// Handle the Enter key press event in the input field
const inputField = document.getElementById("githubUsernameInput");
inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        submitButton.click(); // Trigger the "Submit" button click event
    }
});

