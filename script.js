// Projects array: edit or add projects here. Each project object:
// {id, title, category, tools (array), level, image, short, detailsPage}
const projects = [
  {
    id: 'sales-bi',
    title: 'Sales Dashboard — Power BI',
    category: 'Dashboards',
    tools: ['Power BI','SQL','Excel'],
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1559526324-1b27b5f0b9b0?q=80&w=1200',
    short: 'Interactive sales KPIs dashboard: trends, regional performance, product mix.',
    detailsPage: 'project-sales.html'
  },
  {
    id: 'scm-kpi',
    title: 'Supermarket Sales — KPIs Dashboard',
    category: 'Dashboards',
    tools: ['Power BI','Excel'],
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200',
    short: 'KPIs for sales analytics: total sales, average price, branch comparisons.',
    detailsPage: 'project-scmsales.html'
  },
  {
    id: 'sql-cleaning',
    title: 'SQL Sales Data Cleaning & Analysis',
    category: 'Data Cleaning',
    tools: ['SQL'],
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1581090700227-7d1bdb6f6f7f?q=80&w=1200',
    short: 'Cleaned retail sales dataset: removed duplicates, fixed NULLs and standardized fields.',
    detailsPage: 'project-sqlclean.html'
  },
  {
    id: 'bpm-analytics',
    title: 'Business Process Management — Analytics',
    category: 'Reporting',
    tools: ['Excel','Power BI'],
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1526378722158-3d11b2f2f4f0?q=80&w=1200',
    short: 'Process KPIs analysis to identify bottlenecks and improve workflow efficiency.',
    detailsPage: 'project-bpm.html'
  },
  {
    id: 'diabetes-ml',
    title: 'Diabetes Progression Prediction',
    category: 'ML Model',
    tools: ['Python','scikit-learn'],
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1531498860504-8a6aa05d0e3d?q=80&w=1200',
    short: 'Regression model to predict disease progression with preprocessing and evaluation.',
    detailsPage: 'project-diabetes.html'
  },
  {
    id: 'cashcarry',
    title: 'Cash & Carry — Sales Insights',
    category: 'Dashboards',
    tools: ['Power BI','Excel'],
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200',
    short: 'Store-level sales and product analysis dashboard for merchandising decisions.',
    detailsPage: 'project-cashcarry.html'
  }
];

// Render projects into grid element with id "projectsGrid"
function renderProjects(list) {
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-category', p.category);
    card.setAttribute('data-tools', p.tools.join(','));
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="project-body">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div><span class="tag">${p.level}</span></div>
          <div class="meta">${p.category}</div>
        </div>
        <h3 style="margin:6px 0 0 0">${p.title}</h3>
        <p class="meta">${p.short}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <small class="meta">${p.tools.join(' • ')}</small>
          <a class="btn-link" href="${p.detailsPage}">View Project</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  updateCounters();
}

// Filters
function filterBy(tag){
  if(tag === 'all') renderProjects(projects);
  else renderProjects(projects.filter(p => p.category.toLowerCase() === tag.toLowerCase() || p.tools.map(t=>t.toLowerCase()).includes(tag.toLowerCase())));
}

// Counters: projects and unique tools shown
function updateCounters(){
  const visible = document.querySelectorAll('.project-card');
  const projectsCount = visible.length;
  document.getElementById('projectsCount')?.innerText = projectsCount;
  const toolSet = new Set();
  visible.forEach(v=>{
    const t = (v.getAttribute('data-tools')||'').split(',').map(x=>x.trim()).filter(Boolean);
    t.forEach(x=>toolSet.add(x));
  });
  document.getElementById('toolsCount')?.innerText = toolSet.size;
}

// init on DOM load
document.addEventListener('DOMContentLoaded', ()=>{
  renderProjects(projects);
});