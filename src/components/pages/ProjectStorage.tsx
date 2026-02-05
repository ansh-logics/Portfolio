"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  downloadUrl?: string;
  children?: FileItem[];
}

const projectStructure: Record<string, FileItem[]> = {
  'legacy-project1': [
    {
      name: 'Source Code',
      type: 'folder',
      children: [
        { name: 'src.zip', type: 'file', size: '2.4 MB', downloadUrl: '' }
      ]
    },
    {
      name: 'Documentation',
      type: 'folder',
      children: [
        { name: 'docs.pdf', type: 'file', size: '1.2 MB', downloadUrl: '/files/legacy-project1/docs.pdf' }
      ]
    }
  ],
  'legacy-project2': [
    {
      name: 'Source Code',
      type: 'folder',
      children: [
        { name: '5622.rar', type: 'file', size: '2.4 MB', downloadUrl: '/projects/5622.rar' }
      ]
    },
  ],
  'legacy-project3': [
    // Similar structure for project 3
  ]
};

const ProjectStorage = () => {
  const [searchParams] = useSearchParams();
  const [currentFiles, setCurrentFiles] = useState<FileItem[]>([]);
  const projectId = searchParams.get('project');

  useEffect(() => {
    if (projectId && projectStructure[projectId]) {
      setCurrentFiles(projectStructure[projectId]);
    }
  }, [projectId]);

  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Project Files</h1>
          <p className="text-gray-400">Project ID: {projectId}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentFiles.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800 transition-colors cursor-pointer"
              onClick={() => {
                if (item.type === 'file' && item.downloadUrl) {
                  window.location.href = item.downloadUrl;
                }
              }}
            >
              <div className="flex items-center gap-3">
                {item.type === 'folder' ? (
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  {item.size && <p className="text-sm text-gray-400">{item.size}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStorage;