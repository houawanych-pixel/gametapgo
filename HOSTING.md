# Run GameTapGo on the home PC (free, private preview)

Runs next to AIXClips on the same PC. GameTapGo uses **port 3001** (AIXClips uses 3000).

## Start
```bash
git clone -b dev https://github.com/houawanych-pixel/gametapgo.git
cd gametapgo
npm ci
npm run build
```
Windows (PowerShell):
```powershell
$env:PREVIEW_PASSWORD="pick-a-password"; npx next start -p 3001
```

## Fixed address: preview.gametapgo.com (free, same Cloudflare tunnel)
1. In the same Cloudflare account: Add a domain → `gametapgo.com` → Free plan.
2. Porkbun → gametapgo.com → Authoritative Nameservers → Cloudflare's two. Wait for "Active".
3. On the PC (reuse the AIXClips tunnel):
```bash
cloudflared tunnel route dns aixclips preview.gametapgo.com
```
4. Add a rule to the existing `~/.cloudflared/config.yml`, above the final `http_status:404` line:
```yaml
  - hostname: preview.gametapgo.com
    service: http://localhost:3001
```
5. Restart cloudflared (or the cloudflared Windows service). Open https://preview.gametapgo.com → password prompt.

## Rules
Never commit the password. Keep it password-protected until accounts, parent controls and the kids' privacy checks are done and the owner approves launch.
