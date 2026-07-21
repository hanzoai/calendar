# Hanzo Calendar — cal.hanzo.ai overlay

Hanzo white-label of [Cal.diy](https://github.com/calcom/cal.diy) (the MIT-licensed
cal.com variant), deployed at **cal.hanzo.ai** on
`hanzo-k8s` (DOKS do-sfo3), namespace `hanzo-cal`. Linked from lux.fund's
"Schedule a call" → `https://cal.hanzo.ai/lux`.

This directory is the **entire overlay** on top of the upstream fork. cal.com's
branding is env-driven (`packages/lib/constants.ts`), so the white-label is
config, not a source rewrite. The only source changes on `hanzo/overlay` are
three in-place logo SVG swaps under `apps/web/public/`.

## What's here

| File | Purpose |
|------|---------|
| `deployment.yaml` | Namespace + Deployment + Service + Ingress (TLS `cal.hanzo.ai`) |
| `configmap.yaml` | `cal-env` — non-secret brand + URL env |
| `secret.template.yaml` | Documents `cal-secrets` keys. **Template only — never apply with real values.** |
| `env.hanzo.example` | Full env surface (brand + secret) for local/dev + reference |
| `../../.github/workflows/deploy.yml` | `cal-hanzo-deploy`: build → `ghcr.io/hanzoai/calendar` → rollout |

## The white-label (no source fork of brand strings)

cal.com reads brand identity from `NEXT_PUBLIC_*` env with cal.com-only
fallbacks. Overriding them is the whole job:

- `NEXT_PUBLIC_APP_NAME=Hanzo Calendar` (reaches ~74 files: page titles, emails, meta)
- `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS`, `NEXT_PUBLIC_SENDER_ID`
- `NEXT_PUBLIC_WEBAPP_URL=https://cal.hanzo.ai` (auth links, embeds, webhooks)
- Logos: `apps/web/public/{calcom-logo-white-word,cal-logo-word-black,cal-com-icon-white}.svg`
  replaced in place with Hanzo text wordmarks (`constants.ts` paths untouched).
  These are placeholder text wordmarks — swap for real Hanzo brand SVGs when available.

`NEXT_PUBLIC_*` that affect statically-rendered HTML are baked at image build
(workflow `build-args`); `NEXT_PUBLIC_WEBAPP_URL` is baked as a placeholder that
the container's `scripts/start.sh` rewrites to the pod's runtime value at boot.

## Deploy prerequisites (human-gated — see the full checklist in the run report)

1. Cloudflare DNS: `cal.hanzo.ai` → hanzo-k8s ingress (proxied).
2. Postgres provisioned; DSN in `cal-secrets.DATABASE_URL`.
3. KMS-populate `cal-secrets`: `NEXTAUTH_SECRET`, `CALENDSO_ENCRYPTION_KEY`,
   `GOOGLE_API_CREDENTIALS`, SMTP creds.
4. Per-founder Google/O365 calendar OAuth consent (in-app, post-deploy).
5. GitHub Actions secrets: `ROLLOUT_KUBECONFIG` (scoped ci-rollout SA).

cal.com runs `prisma migrate deploy` + app-store seed on boot, so a reachable
Postgres is a hard start dependency.

## License

This fork tracks **Cal.diy**, not upstream cal.com. Cal.diy is **100%
MIT-licensed** (root `LICENSE` = MIT; README: "no proprietary Enterprise
Edition features"). It removed cal.com's open-core AGPL/EE split, so there is
**no AGPL §13 network-use obligation and no cal.com commercial license key**
required to run `cal.hanzo.ai` publicly.

MIT still requires retaining the copyright + permission notice: keep the root
`LICENSE` (Cal.com, Inc. + contributors) intact — which this overlay does (it
touches only `deploy/hanzo/`, `.github/workflows/deploy.yml`, and three logo
SVGs). If Hanzo ever pulls features from **upstream cal.com** (which IS AGPL
with a separately-licensed `packages/features/ee` subtree), that code carries
its own terms and the AGPL network-source obligation would attach to it — so
prefer merging from Cal.diy `main`, not cal.com, to stay MIT-clean.
