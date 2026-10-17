import projects from "./projects";


let _lightCache = null;
const _detailedCache = {};


export function getLightProjects() {
  if (_lightCache) return _lightCache;

  _lightCache = projects.map((p) => ({
    id: p.id,
    name: p.name,
    url: p.url,
    technologies: p.technologies,
    description: p.description,
    githubLink: p.githubLink,
    demoLink: p.demoLink,
    category: p.category,
    year: p.year,
    status: p.status,
    role: p.role,
    duration: p.duration,
    team: p.team,
  }));

  return _lightCache;
}


export function getProjectById(id) {
  if (_detailedCache[id]) return _detailedCache[id];

  const project = projects.find((p) => p.id === id);
  if (project) _detailedCache[id] = project;
  return project;
}


export function getAllProjects() {
  return projects;
}