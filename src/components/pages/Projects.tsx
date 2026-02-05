import { useState } from 'react';
import { FaFolder, FaFile, FaDownload, FaChevronRight } from 'react-icons/fa';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  files: {
    name: string;
    type: 'folder' | 'file';
    size?: string;
    lastModified?: string;
    url?: string;
    children?: { name: string; type: 'file'; size: string; url: string; }[];
  }[];
}

const Projects = () => {
  const [projects] = useState<ProjectItem[]>([
    {
      title: "Legacy Project 1",
      description: "Personal finance tracker with budget planning and expense analytics features",
      technologies: ["React", "TypeScript", "Chart.js", "Firebase"],
      files: [
        {
          name: "Source Code",
          type: "folder",
          children: [
            { name: "index.tsx", type: "file", size: "2.3 MB", url: "/files/legacy-project1/source/index.tsx" },
            { name: "styles.css", type: "file", size: "156 KB", url: "/files/legacy-project1/source/styles.css" }
          ]
        },
        {
          name: "Documentation",
          type: "folder",
          children: [
            { name: "README.md", type: "file", size: "45 KB", url: "/files/legacy-project1/docs/readme.md" }
          ]
        },
        {
          name: "project-bundle.zip",
          type: "file",
          size: "4.2 MB",
          url: "/files/legacy-project1.zip"
        }
      ]
    },
    {
      title: "Legacy Project 2",
      description: "Social media dashboard for content creators with analytics and post scheduling",
      technologies: ["Next.js", "MongoDB", "TailwindCSS", "OAuth"],
      files: [
        {
          name: "Source Code",
          type: "folder",
          children: [
            { name: "index.tsx", type: "file", size: "2.3 MB", url: "/files/legacy-project2/source/index.tsx" },
            { name: "styles.css", type: "file", size: "156 KB", url: "/files/legacy-project2/source/styles.css" }
          ]
        },
        {
          name: "Documentation",
          type: "folder",
          children: [
            { name: "README.md", type: "file", size: "45 KB", url: "/files/legacy-project2/docs/readme.md" }
          ]
        },
        {
          name: "project-bundle.zip",
          type: "file",
          size: "4.2 MB",
          url: "/files/legacy-project2.zip"
        }
      ]
    },
    {
      title: "Legacy Project 3",
      description: "Real-time collaborative code editor with syntax highlighting and version control",
      technologies: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
      files: [
        {
          name: "Source Code",
          type: "folder",
          children: [
            { name: "index.tsx", type: "file", size: "2.3 MB", url: "/files/legacy-project3/source/index.tsx" },
            { name: "styles.css", type: "file", size: "156 KB", url: "/files/legacy-project3/source/styles.css" }
          ]
        },
        {
          name: "Documentation",
          type: "folder",
          children: [
            { name: "README.md", type: "file", size: "45 KB", url: "/files/legacy-project3/docs/readme.md" }
          ]
        },
        {
          name: "project-bundle.zip",
          type: "file",
          size: "4.2 MB",
          url: "/files/legacy-project3.zip"
        }
      ]
    }
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (projectIndex: number, folderName: string) => {
    const key = `${projectIndex}-${folderName}`;
    setExpandedFolders(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Project Storage</h1>
        <div className="space-y-8">
          {projects.map((project, projectIndex) => (
            <div key={projectIndex} className="bg-neutral-900 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-400 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="divide-y divide-neutral-800">
                {project.files.map((file, fileIndex) => (
                  <div key={fileIndex}>
                    {file.type === 'folder' ? (
                      <div>
                        <button
                          onClick={() => toggleFolder(projectIndex, file.name)}
                          className="w-full px-6 py-4 flex items-center text-gray-300 hover:bg-neutral-800"
                        >
                          <FaFolder className="text-yellow-500 mr-3" />
                          <span className="flex-1 text-left">{file.name}</span>
                          <FaChevronRight
                            className={`transition-transform ${
                              expandedFolders[`${projectIndex}-${file.name}`] ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        {expandedFolders[`${projectIndex}-${file.name}`] && file.children && (
                          <div className="bg-neutral-950">
                            {file.children.map((child, childIndex) => (
                              <a
                                key={childIndex}
                                href={child.url}
                                download
                                className="px-6 py-4 flex items-center text-gray-300 hover:bg-neutral-800 pl-12"
                              >
                                <FaFile className="text-gray-500 mr-3" />
                                <span className="flex-1">{child.name}</span>
                                <span className="text-gray-500 text-sm">{child.size}</span>
                                <FaDownload className="ml-4 text-gray-500" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={file.url}
                        download
                        className="px-6 py-4 flex items-center text-gray-300 hover:bg-neutral-800"
                      >
                        <FaFile className="text-gray-500 mr-3" />
                        <span className="flex-1">{file.name}</span>
                        <span className="text-gray-500 text-sm">{file.size}</span>
                        <FaDownload className="ml-4 text-gray-500" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;