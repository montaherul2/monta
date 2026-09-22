/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Github,
  Search,
  RefreshCw,
  Star,
  GitFork,
  ExternalLink,
  Plus,
  Check,
  Code2,
  AlertCircle,
  Filter,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  GitHubRepo,
  fetchGitHubRepos,
  repoToProjectItem,
  GITHUB_LANGUAGE_COLORS,
} from '../services/github';
import { playCyberClick, playSuccessChime } from '../utils/audio';

interface GithubRepoBrowserProps {
  onProjectImported?: (title: string) => void;
  compact?: boolean;
}

export const GithubRepoBrowser: React.FC<GithubRepoBrowserProps> = ({
  onProjectImported,
  compact = false,
}) => {
  const { portfolio, addProject, importGitHubProjects } = usePortfolio();

  // Extract default username from portfolio.github URL
  const defaultUser = useMemo(() => {
    return portfolio.github.split('/').filter(Boolean).pop() || 'montaherul';
  }, [portfolio.github]);

  const [username, setUsername] = useState<string>(defaultUser);
  const [activeUsername, setActiveUsername] = useState<string>(defaultUser);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [isFallbackData, setIsFallbackData] = useState<boolean>(false);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [importingRepoId, setImportingRepoId] = useState<number | null>(null);
  const [justImportedIds, setJustImportedIds] = useState<Set<number>>(new Set());

  // Existing portfolio projects titles for checking if already present
  const existingProjectTitles = useMemo(() => {
    return new Set(portfolio.projects.map((p) => p.title.toLowerCase()));
  }, [portfolio.projects]);

  const loadRepos = async (userToFetch: string) => {
    setLoading(true);
    playCyberClick(700, 0.04);
    try {
      const result = await fetchGitHubRepos(userToFetch);
      setRepos(result.repos);
      setIsFallbackData(result.isFallback);
      setIsRateLimited(result.rateLimitExceeded);
      setActiveUsername(userToFetch);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos(defaultUser);
  }, [defaultUser]);

  const handleFetchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      loadRepos(username.trim());
    }
  };

  // Filter & Sort
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos
      .filter((r) => {
        if (selectedLanguage !== 'all' && r.language !== selectedLanguage) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchDesc = (r.description || '').toLowerCase().includes(q);
          const matchTopics = (r.topics || []).some((t) => t.toLowerCase().includes(q));
          const matchLang = (r.language || '').toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTopics && !matchLang) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      });
  }, [repos, search, selectedLanguage, sortBy]);

  const handleImportSingle = (repo: GitHubRepo) => {
    setImportingRepoId(repo.id);
    const newProject = repoToProjectItem(repo);
    addProject(newProject);
    setJustImportedIds((prev) => new Set([...prev, repo.id]));
    playSuccessChime();
    if (onProjectImported) {
      onProjectImported(newProject.title);
    }
    setTimeout(() => {
      setImportingRepoId(null);
    }, 1000);
  };

  const handleImportAllVisible = () => {
    const unimported = filteredRepos.filter((r) => {
      const generated = repoToProjectItem(r);
      return !existingProjectTitles.has(generated.title.toLowerCase());
    });

    if (unimported.length === 0) return;

    const newProjects = unimported.map(repoToProjectItem);
    importGitHubProjects(newProjects);
    const newlyAddedIds = new Set(unimported.map((r) => r.id));
    setJustImportedIds((prev) => new Set([...prev, ...newlyAddedIds]));
    playSuccessChime();
    if (onProjectImported) {
      onProjectImported(`${newProjects.length} repositories`);
    }
  };

  return (
    <div className="w-full bg-[#08100c] border border-[#162b20] rounded-2xl p-5 sm:p-7 shadow-xl">
      {/* Top Bar: Live Status & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#14261d]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Github size={18} className="text-[#00df81]" />
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>GitHub Repositories Live Feed</span>
              <span className="w-2 h-2 rounded-full bg-[#00df81] animate-ping" />
            </h3>
          </div>
          <p className="text-xs text-[#7e9587]">
            Direct sync with <strong className="text-white">@{activeUsername}</strong>'s GitHub repositories. Browse, inspect, or import directly into the portfolio.
          </p>
        </div>

        {/* Sync & Target Handle Form */}
        <form onSubmit={handleFetchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#546d5f]">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github username"
              className="w-36 sm:w-44 bg-[#0e1c15] border border-[#1a3829] focus:border-[#00df81] rounded-xl pl-7 pr-3 py-1.5 text-xs text-white font-mono placeholder-[#546d5f] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-[#00df81] hover:bg-[#00c572] text-[#070c0a] text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Fetch live repositories"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Fetch</span>
          </button>
        </form>
      </div>

      {/* Status Notice if Rate-Limited or Fallback */}
      {isFallbackData && (
        <div className="mt-4 p-3 rounded-xl bg-[#142319] border border-[#234232] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#95ad9f]">
            <AlertCircle size={15} className="text-[#00df81] shrink-0" />
            <span>
              {isRateLimited
                ? 'GitHub API unauthenticated hourly rate limit active. Displaying cached repository data.'
                : 'Displaying curated active repository feed for @' + activeUsername + '.'}
            </span>
          </div>
          {lastSyncTime && (
            <span className="text-[10px] font-mono text-[#61796c] shrink-0">Synced at {lastSyncTime}</span>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-5">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7364]" />
            <input
              type="text"
              placeholder="Search repo name, topic, or language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a1410] border border-[#182f23] focus:border-[#00df81] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#5a7364] outline-none"
            />
          </div>

          {/* Language filter */}
          <div className="flex items-center gap-1.5 bg-[#0a1410] border border-[#182f23] rounded-xl px-2.5 py-1.5 text-xs text-[#8ca094]">
            <Filter size={13} className="text-[#00df81]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-white text-xs outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0a1410] text-white">All Languages</option>
              {languages.map((l) => (
                <option key={l} value={l} className="bg-[#0a1410] text-white">{l}</option>
              ))}
            </select>
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-1.5 bg-[#0a1410] border border-[#182f23] rounded-xl px-2.5 py-1.5 text-xs text-[#8ca094]">
            <ArrowUpDown size={13} className="text-[#00df81]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white text-xs outline-none cursor-pointer"
            >
              <option value="updated" className="bg-[#0a1410] text-white">Recently Updated</option>
              <option value="stars" className="bg-[#0a1410] text-white">Most Stars</option>
              <option value="name" className="bg-[#0a1410] text-white">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Import All Action */}
        <button
          type="button"
          onClick={handleImportAllVisible}
          className="px-3.5 py-2 rounded-xl bg-[#0f2419] hover:bg-[#143323] border border-[#1c452e] hover:border-[#00df81]/60 text-xs font-mono text-[#00df81] flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          title="Import all displayed repositories into the portfolio project gallery"
        >
          <Plus size={14} />
          <span>Import All ({filteredRepos.length}) to Portfolio</span>
        </button>
      </div>

      {/* Repositories Grid */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
          <RefreshCw size={24} className="animate-spin text-[#00df81]" />
          <p className="text-xs font-mono text-[#789283]">Fetching repositories from GitHub API...</p>
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="py-12 text-center bg-[#0a1410] rounded-xl border border-[#162a20] p-6">
          <p className="text-xs text-[#7e9587]">No repositories match your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo) => {
            const isAlreadyInPortfolio =
              existingProjectTitles.has(repo.name.replace(/-/g, ' ').toLowerCase()) ||
              portfolio.projects.some((p) => p.githubUrl === repo.html_url);
            const isJustImported = justImportedIds.has(repo.id);
            const isCurrentlyImporting = importingRepoId === repo.id;
            const langColor = repo.language ? GITHUB_LANGUAGE_COLORS[repo.language] || '#00df81' : '#00df81';

            return (
              <div
                key={repo.id}
                className="p-4 rounded-xl bg-[#0b1611] hover:bg-[#0e1d16] border border-[#162e22] hover:border-[#00df81]/50 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Title & External Link */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-[#00df81] transition-colors flex items-center gap-1.5 break-all group-hover:underline"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink size={12} className="shrink-0 text-[#647c6f] group-hover:text-[#00df81]" />
                    </a>

                    {/* Visibility badge */}
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#102419] text-[#7ea08d] border border-[#173826] uppercase shrink-0">
                      {repo.fork ? 'Fork' : 'Public'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#8ca094] leading-relaxed mb-4 line-clamp-2">
                    {repo.description || 'No description provided.'}
                  </p>

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0a1410] text-[#00df81] border border-[#143022]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Language, Stars, Forks, and Import Button */}
                <div className="pt-3 border-t border-[#14281e] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#789283]">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        <span className="text-white">{repo.language}</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1 hover:text-white" title="Stars">
                      <Star size={12} className="text-yellow-400 fill-yellow-400/40" />
                      <span>{repo.stargazers_count}</span>
                    </span>

                    <span className="flex items-center gap-1 hover:text-white" title="Forks">
                      <GitFork size={12} className="text-[#789283]" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>

                  {/* Import Button */}
                  <button
                    type="button"
                    onClick={() => handleImportSingle(repo)}
                    disabled={isAlreadyInPortfolio || isJustImported || isCurrentlyImporting}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isAlreadyInPortfolio || isJustImported
                        ? 'bg-[#122b1e] text-[#00df81] border border-[#1b4e33] cursor-default'
                        : 'bg-[#00df81] hover:bg-[#00c572] text-[#070c0a] shadow-[0_0_10px_rgba(0,223,129,0.3)]'
                    }`}
                    title={isAlreadyInPortfolio || isJustImported ? 'Already in Portfolio' : 'Add to Portfolio'}
                  >
                    {isAlreadyInPortfolio || isJustImported ? (
                      <>
                        <Check size={11} />
                        <span>Imported</span>
                      </>
                    ) : isCurrentlyImporting ? (
                      <span>Adding...</span>
                    ) : (
                      <>
                        <Plus size={11} />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
