import React, { useState, useEffect } from 'react';
import { Github, Star, GitBranch, Code2, ExternalLink, Loader } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  updated_at: string;
}

interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export const GitHubFeed: React.FC<{ username?: string }> = ({ username = 'chaishillomnitech1' }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();

        const formattedRepos: GitHubRepo[] = reposData.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description provided',
          url: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language || 'Unknown',
          updated_at: repo.updated_at,
        }));

        setRepos(formattedRepos);

        // Fetch recent commits from the first repo
        if (formattedRepos.length > 0) {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${username}/${formattedRepos[0].name}/commits?per_page=5`
          );
          if (commitsResponse.ok) {
            const commitsData = await commitsResponse.json();
            const formattedCommits: GitHubCommit[] = commitsData.map((commit: any) => ({
              sha: commit.sha.substring(0, 7),
              message: commit.commit.message.split('\n')[0],
              author: commit.commit.author.name,
              date: commit.commit.author.date,
              url: commit.html_url,
            }));
            setCommits(formattedCommits);
          }
        }
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError('Unable to load GitHub data. Please try again later.');
        // Set mock data for demo
        setRepos([
          {
            id: 1,
            name: 'Quantum-Financial-System-QFS',
            description: 'Advanced quantum-based financial infrastructure',
            url: 'https://github.com/chaishillomnitech1/Quantum-Financial-System-QFS',
            stars: 42,
            language: 'TypeScript',
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Akashic-ip-protection',
            description: 'Sovereign IP protection and encryption protocols',
            url: 'https://github.com/chaishillomnitech1/Akashic-ip-protection',
            stars: 28,
            language: 'Python',
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    Python: '#3776ab',
    JavaScript: '#f1e05a',
    Rust: '#ce422b',
    Go: '#00add8',
    Solidity: '#aa6746',
    Unknown: '#858585',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-[#d4af37]" />
        <div>
          <h3 className="text-xl font-bold text-white">GitHub Activity Feed</h3>
          <p className="text-xs text-gray-400">Latest updates from {username}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-[#d4af37] animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
          {error}
        </div>
      ) : (
        <>
          {/* Repositories Grid */}
          <div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Recent Repositories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-4 hover:border-[#d4af37]/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Code2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                      <h5 className="font-bold text-white text-sm group-hover:text-[#d4af37] transition truncate">
                        {repo.name}
                      </h5>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#d4af37] transition flex-shrink-0" />
                  </div>

                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{repo.description}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || languageColors.Unknown }}
                        />
                        <span className="text-gray-400">{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#d4af37]">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                    <span className="text-gray-500">{formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Commits */}
          {commits.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Recent Commits</h4>
              <div className="space-y-2">
                {commits.map((commit) => (
                  <a
                    key={commit.sha}
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#d4af37]/50 hover:bg-[#0f0f0f] transition-all group"
                  >
                    <GitBranch className="w-4 h-4 text-[#00d9ff] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white group-hover:text-[#d4af37] transition truncate">
                        {commit.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {commit.author} • {commit.sha}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{formatDate(commit.date)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* View Profile Link */}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#ff6b9d] transition text-sm font-bold"
          >
            View Full Profile <ExternalLink className="w-4 h-4" />
          </a>
        </>
      )}
    </div>
  );
};
