import {useState} from 'react';
import {Check, Copy, GitBranch} from 'lucide-react';

export function GithubDeploySection() {
  const [username, setUsername] = useState('your-github-username');
  const [repoName, setRepoName] = useState('noel-christmas-2026');
  const [copied, setCopied] = useState(false);

  const safeUser = username.trim() || 'your-github-username';
  const safeRepo = repoName.trim() || 'noel-christmas-2026';

  const commands = [
    `git remote add origin https://github.com/${safeUser}/${safeRepo}.git`,
    `git branch -M main`,
    `git push -u origin main`,
  ].join('\n');

  const handleCopyCommands = async () => {
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="github-publish"
      className="mx-auto max-w-[1280px] border-t border-[#F5F1E8]/10 px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-widest text-[#D4A853]">
            04. GitHub Pages Deployment
          </p>
          <h2 className="font-editorial mt-2 text-3xl font-semibold tracking-tight text-[#F5F1E8] sm:text-4xl [text-wrap:balance]">
            已預先配置 GitHub Actions，一鍵推送即可上線
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#B8B2A6]">
            本專案已設定好 Vite 相對路徑打包（<code className="font-mono-tabular text-xs text-[#F5F1E8]">base: &apos;./&apos;</code>）與 <code className="font-mono-tabular text-xs text-[#F5F1E8]">.github/workflows/deploy.yml</code> 自動部署流程，並在工作區完成本地 Git 提交。只需在 GitHub 建立新儲存庫並執行右側指令，即可自動發佈至 GitHub Pages。
          </p>

          <dl className="mt-8 divide-y divide-[#F5F1E8]/10 border-y border-[#F5F1E8]/10 text-sm">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">Workflow 路徑</dt>
              <dd className="font-mono-tabular text-xs text-[#F5F1E8]">.github/workflows/deploy.yml</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">靜態建置輸出</dt>
              <dd className="font-mono-tabular text-xs text-[#F5F1E8]">npm run build → dist/</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">發佈網址格式</dt>
              <dd className="font-mono-tabular text-xs text-[#D4A853]">
                https://{safeUser}.github.io/{safeRepo}/
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] p-6 lg:col-span-7 lg:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gh-user" className="block text-xs font-medium text-[#B8B2A6]">
                你的 GitHub 帳號
              </label>
              <input
                id="gh-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-mono-tabular mt-2 w-full rounded-md border border-[#F5F1E8]/15 bg-[#090D0B] px-3.5 py-2.5 text-sm text-[#F5F1E8] focus:border-[#D4A853] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gh-repo" className="block text-xs font-medium text-[#B8B2A6]">
                GitHub 儲存庫名稱
              </label>
              <input
                id="gh-repo"
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="font-mono-tabular mt-2 w-full rounded-md border border-[#F5F1E8]/15 bg-[#090D0B] px-3.5 py-2.5 text-sm text-[#F5F1E8] focus:border-[#D4A853] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-[#F5F1E8]/12 bg-[#090D0B] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-[#F5F1E8]/10 pb-3">
              <span className="inline-flex items-center gap-2 text-xs text-[#B8B2A6]">
                <GitBranch className="h-3.5 w-3.5 text-[#D4A853]" />
                <span>推送至 GitHub 指令</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCommands}
                className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/15 px-3 py-1.5 text-xs font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8]/10 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#D4A853]" />
                    <span>已複製指令</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>複製指令</span>
                  </>
                )}
              </button>
            </div>

            <pre className="font-mono-tabular mt-4 overflow-x-auto text-xs leading-7 text-[#E6E0D3]">
              <code>{commands}</code>
            </pre>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#B8B2A6]">
            推送完成後，請至 GitHub 儲存庫的 <strong className="font-medium text-[#F5F1E8]">Settings → Pages → Build and deployment</strong>，將 Source 切換為 <strong className="font-medium text-[#F5F1E8]">GitHub Actions</strong>，約 1 分鐘後即可自動部署上線。
          </p>
        </div>
      </div>
    </section>
  );
}
