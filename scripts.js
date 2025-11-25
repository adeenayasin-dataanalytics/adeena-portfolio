document.addEventListener("DOMContentLoaded", () => {

    // === PROJECTS LIST ===
    const projects = [
        {
            id: "sales-bi",
            title: "Sales Dashboard - Power BI",
            category: "Dashboards",
            tools: ["Power BI", "SQL", "Excel"],
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1559526324-10a757f4f09b?auto=format&w=1200",
            short: "Interactive sales KPI dashboard · trends · regional performance · product mix.",
            detailsPage: "project-sales.html",
        },
        {
            id: "scm-kpi",
            title: "Supermarket Sales - KPI Dashboard",
            category: "Dashboards",
            tools: ["Power BI", "Excel"],
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1525660716253-771705e06b04?auto=format&w=1200",
            short: "Store-level sales and product analysis dashboard for merchandising decisions.",
            detailsPage: "project-scmkpi.html",
        },
        {
            id: "sql-cleaning",
            title: "SQL Sales Data Cleaning & Analysis",
            category: "Data Cleaning",
            tools: ["SQL"],
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1581090700227-7dbd0b66f677?auto=format&w=1200",
            short: "Cleaned retail sales dataset · removed duplicates · fixed NULLs · standardized fields.",
            detailsPage: "project-sqlean.html",
        },
        {
            id: "diabetes-ml",
            title: "Diabetes Progression Prediction",
            category: "Machine Learning",
            tools: ["Python", "Pandas", "Scikit-learn"],
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1531497865148-8a8a50ed03a7?auto=format&w=1200",
            short: "Regression model to predict disease progression with preprocessing and evaluation.",
            detailsPage: "project-diabetesml.html",
        }
    ];

    // === RENDER PROJECT CARDS ===
    function renderProjects(list) {
        const grid = document.getElementById("projectsGrid");
        if (!grid) return;

        grid.innerHTML = ""; // clear old cards

        list.forEach(p => {
            const card = document.createElement("article");
            card.className = "project-card";
            card.setAttribute("data-category", p.category);
            card.setAttribute("data-tools", p.tools.join(", "));

            card.innerHTML = `
                <img src="${p.image}" alt="${p.title}">
                <div class="project-body">
                    <div class="meta">
                        <span>${p.category}</span>
                        <span>${p.level}</span>
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.short}</p>
                    <a class="btn link" href="${p.detailsPage}">View Project</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // === FILTER BY CATEGORY ===
    function filterBy(tag) {
        if (tag === "all") {
            renderProjects(projects);
        } else {
            const filtered = projects.filter(p =>
                p.category.toLowerCase() === tag.toLowerCase() ||
                p.tools.join(" ").toLowerCase().includes(tag.toLowerCase())
            );
            renderProjects(filtered);
        }
        updateCounters();
    }

    // === UPDATE COUNTERS ===
    function updateCounters() {
        document.getElementById("projectsCount").innerText =
            document.querySelectorAll(".project-card").length;

        const toolsSet = new Set();
        document.querySelectorAll(".project-card").forEach(c => {
            c.getAttribute("data-tools")
             .split(",")
             .map(x => x.trim())
             .forEach(t => toolsSet.add(t));
        });

        document.getElementById("toolsCount").innerText = toolsSet.size;
    }

    // === INIT LOADING ===
    renderProjects(projects);
    updateCounters();
});