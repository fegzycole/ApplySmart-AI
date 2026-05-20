# Engineering Patterns

This document is the operating contract for ApplySmart AI. New work must follow these patterns aggressively. If a feature needs a different pattern, update this document in the same change and explain why the existing pattern was insufficient.

## Core Rules

- Prefer KISS and small modules over broad abstractions.
- Inspect the owning package or feature before editing. Match the established local pattern unless this document is stale, and update this document in the same change when a new pattern becomes canonical.
- Keep one responsibility per file: routes render pages, hooks coordinate state, services call APIs, utilities transform data.
- Do not hide multiple responsibilities in one file by using local helper components. If a component, hook, or class owns several concerns, split the concerns into named files.
- Reuse shared primitives before adding new ones.
- Remove dead code immediately. Do not leave placeholder hooks, unused props, or comments that restate code.
- Do not expose placeholder features in UI, hooks, or stats. If the backend contract does not support a behavior, do not ship fake handlers or zero-value counters for it.
- Add comments only for non-obvious behavior, external constraints, temporary tradeoffs with a follow-up, or domain rules that are easy to break.
- Do not create a second implementation of a solved concern. Consolidate first, extend second.
- If two files need the same constants, routes, cache behavior, endpoint paths, or UI shell logic, move that concern to one shared owner.
- Do not add a dependency until the existing stack or a small local abstraction is clearly insufficient. Remove verified-unused dependencies during nearby cleanup.
- Keep changes incremental and behavior-preserving. Public API contracts, routes, DTO names, and user-visible workflows should change only when fixing a confirmed bug or aligning with the backend contract.
- Add or update focused tests for meaningful logic changes. If a change only moves presentation structure, run the available type/build/test gates and state why no new test was useful.
- Do not commit changes from an agent unless the human explicitly asks and the commit author is the configured Git user.

## Complexity and Consistency

- Keep methods, hooks, and components small enough to understand in two minutes. Prefer extracting named collaborators over adding branches to an already busy file.
- Treat cyclomatic or cognitive complexity above 3 as a refactor signal. Split conditionals, extract predicates, isolate mapping, and move workflow steps into intention-revealing functions.
- Avoid deep nesting. Use early returns, small predicate methods, finite lookup maps, and small renderer components.
- Prefer one canonical implementation for each concern: one app shell, one destructive dialog primitive, one API client, one endpoint constant owner, one query-cache helper set, and one DTO shape per backend contract.
- Do not introduce parallel styles for the same thing. When touching an area, normalize nearby code to the dominant pattern instead of mixing aliases, class composition styles, cache invalidation styles, or response types.
- Shared abstractions must make call sites easier to read. Do not extract tiny differences into generic wrappers, inheritance chains, or "utils" files that obscure intent.

## Frontend

- Stack: React 18, Vite, TypeScript, React Query, `react-router`, Tailwind-style classes, shared UI primitives in `frontend/src/shared/components/ui`.
- Feature code lives in `frontend/src/features/<feature>`.
- Feature folders should use this shape when needed: `components`, `pages`, `hooks`, `services`, `types`, `constants`, `utils`.
- Cross-feature code belongs in `frontend/src/shared`.
- Use `@/` for shared/root imports and relative imports for nearby feature files. Do not mix multiple alias styles for the same import owner.
- Authenticated app shell lives in `frontend/src/shared/components/layout/AppLayout.tsx`. It composes the shell only; header, brand, navigation, theme, mobile menu, and user menu behavior each have their own owners in the shared layout folder.
- App navigation lives in `frontend/src/shared/components/layout/app-navigation.ts`. Do not duplicate route arrays inside pages or feature layouts.
- Do not add new page-level layout systems while `AppLayout` exists. Feature pages should render inside the shared app shell.
- API endpoint paths live in `frontend/src/shared/constants/api-endpoints.ts`.
- API services must import `API_ENDPOINTS`; do not define local `ENDPOINTS` maps unless the endpoint is truly private to that module and cannot be shared.
- API services call `apiClient` with endpoints relative to `/api/v1`, for example `/jobs`, not `/api/v1/jobs`.
- API success envelopes use `ApiSuccessResponse` from `frontend/src/shared/types/api-response.types.ts`. Do not define feature-local success envelope types.
- Delete mutations should return the backend success envelope, not an invented boolean or empty object type.
- Query-string POST contracts should use the `params` argument on `apiClient.post`; do not send JSON bodies to endpoints that the backend declares as `@RequestParam`.
- Blob downloads should use `apiClient.getBlobByUrl` or `postBlob` so backend-relative paths and auth handling stay centralized.
- API error presentation should use the shared error-feedback utilities when a feature needs consistent toast/form behavior.
- React Query keys live next to feature hooks and should expose an `all`, `lists`, `details`, and `detail(id)` shape when applicable.
- Mutation hooks own cache invalidation. Page components should not manually invalidate query caches.
- Repeated cache behavior belongs in `frontend/src/shared/lib/query-cache.ts`.
- Use `invalidateDetailAndList` and `removeDetailAndInvalidateList` instead of repeating `invalidateQueries` and `removeQueries` sequences.
- Keep backend DTO types and frontend service types aligned. If an endpoint does not exist, do not expose a hook for it.
- Prefer named exports for services, hooks, and components.
- Avoid barrel files that hide ownership unless the feature already uses them consistently.
- No feature service should know auth token mechanics; that belongs to `apiClient` and auth services.
- Do not add UI state to services. Services are network boundaries only.
- Do not add API calls directly in components. Components call hooks; hooks call services.
- Do not reintroduce unused frontend dependencies such as client-side PDF libraries or `react-router-dom` unless the product requirement explicitly needs them and the import is used in source code.

## Frontend Components

- Pages compose feature sections and bind hooks. They should not contain repeated JSX blocks, endpoint calls, cache invalidation, or formatting logic.
- Route files should be thin. A route can attach providers and render one workspace component, but workflow state and async side effects belong in hooks.
- Feature hooks coordinate state and mutations. If a hook returns a handler, the handler must perform real supported behavior.
- Context files provide and consume context only. Types live in `types`, defaults live in `constants`, item factories live in `utils`, and context state transitions live in hooks.
- Use `cn(...)` from `frontend/src/shared/lib/utils.ts` for conditional class composition. Do not use `className` template literals or string concatenation.
- Dynamic Tailwind classes must come from finite lookup maps, for example `{ sans: "font-sans", serif: "font-serif" }`. Do not construct classes like `font-${font}` because Tailwind cannot reliably see them.
- Repeated destructive confirmation flows use `frontend/src/shared/components/DestructiveConfirmationDialog.tsx`. Feature wrappers may supply labels and descriptions, but they should not duplicate the alert-dialog shell.
- Repeated empty states use `EmptyState`; repeated workspace titles/actions use `WorkspacePageHeader`.
- Document artifact card chrome belongs in `frontend/src/features/documents/components/DocumentArtifactCardFrame.tsx`. Resume and cover-letter cards own their content and actions only.
- Repeated visual concepts get one component owner. For resumes, identity rendering belongs in `ResumeIdentity`, score rendering belongs in `ResumeScoreBadge`, status rendering belongs in `StatusBadge`, and preview sections belong in `builder/previews/PreviewPrimitives.tsx`.
- Resume builder types belong in `frontend/src/features/resume/types/resume-builder.types.ts`. Do not redefine `ResumeTemplate` or resume builder data shapes in optimizer or builder components.
- Repeated formatting belongs in a utility. Resume preview contact, date range, responsibilities, education title, and empty-state checks belong in `builder/previews/preview-utils.ts`.
- Resume builder textarea inputs that map to arrays should preserve the user's raw input while editing. Use focused hooks such as `useProjectTechnologyInputs` instead of binding directly to `array.join(", ")` when doing so would collapse trailing separators.
- Resume preview action state belongs in preview hooks such as `useResumePreviewActions` and layout measurement belongs in layout hooks such as `useResumePreviewLayout`.
- Dashboard chart chrome belongs in `DashboardChartCard`; chart drawing belongs in chart body components; shared chart styling belongs in `dashboard-chart.constants.ts`.
- Auth pages use `AuthPageShell` for page chrome and `useFormState` for local form objects. Do not hand-roll auth page wrappers or one-off form-state setters.
- App chrome uses shared `AppLayout` and `APP_NAVIGATION`. Do not create route-specific navigation arrays in page components.
- Components should accept the smallest prop surface they need. Remove unused callbacks, booleans, variants, and display props during nearby edits.
- Components should render supported product behavior only. Do not keep hidden or disconnected buttons as placeholders for future work.
- Components primarily describe UI. Heavy branching, transformations, filtering, API decisions, and effect orchestration belong in hooks, services, or utilities with names that describe the workflow.

## Backend

- Stack: Spring Boot, Java 17, JPA repositories, DTOs, service interfaces plus `impl` classes.
- Put backend code in one owner package per concern. Service code belongs in `backend/src/main/java/ai/applysmart/service/<domain>`, and security code belongs in `backend/src/main/java/ai/applysmart/security/<concern>`.
- Do not leave domain contracts in `service`, implementations in `service/impl`, and helpers elsewhere. Keep the interface, implementation, and extracted collaborators together in the same domain folder.
- Do not reintroduce generic packages for domain-specific code. For example, dashboard mapping belongs in `service/dashboard`, not a root `mapper` package.
- Do not add MapStruct back unless the codebase deliberately adopts it end to end. Current mappers are explicit Java classes colocated with their domain services.
- Mirror production package structure in tests. Service tests should live under the same `service/<domain>` path as the code they cover.
- Controllers handle HTTP concerns only: request validation, authenticated user injection, status codes, and delegation.
- Controllers must use `ControllerUtils.handlePaginatedRequest` for optional pagination and `ControllerUtils.successResponse` for success-only `ApiResponse` payloads.
- Controllers should stay focused by subdomain. Do not merge profile, billing, security, notifications, and account routes into one controller when they can live in separate settings controllers.
- Services own business rules, transaction boundaries, entity lookup, and DTO mapping when no dedicated mapper exists.
- Services should orchestrate business workflows. If a service accumulates several independent calculations, move those calculations into dedicated collaborators.
- Repositories own persistence queries only.
- Shared parsing, text, enum, date, and pagination behavior belongs in `util` only when it is truly cross-domain. Validation-specific rules belong in `validation`, and domain-specific parsing belongs beside the domain service that uses it.
- Exceptions should flow through `GlobalExceptionHandler`; do not build ad-hoc error responses inside services.
- Unsupported product capabilities must throw `UnsupportedFeatureException`; never return fake success responses for behavior that is not implemented.
- Internal server errors must not expose raw exception messages to clients.
- Use soft-delete repository behavior consistently where entities support it.
- Use supported Hibernate soft-delete restrictions such as `@SQLRestriction`; do not add new deprecated `@Where` filters.
- Keep logs useful: include actor/resource identifiers, not full secrets, tokens, or large payloads.
- Entity builder defaults must use Lombok `@Builder.Default`; never rely on field initializers with `@Builder`.
- Runtime/security settings belong in typed `@ConfigurationProperties` classes under `backend/src/main/java/ai/applysmart/config`; do not inject grouped settings with scattered `@Value` fields.
- Required runtime properties should be validated with Jakarta validation annotations so startup fails fast with a clear configuration error.
- CORS defaults must include local development origins and the production ApplySmart domains unless an environment-specific override intentionally replaces them.
- Redis is infrastructure for cache, tokens, and rate limiting; keep Redis repository scanning disabled unless a real Redis aggregate is introduced.
- Production profiles must not expose actuator health details, Swagger UI, SQL bind values, or framework DEBUG logs by default.
- External AI HTTP calls belong in `backend/src/main/java/ai/applysmart/service/ai/AnthropicClient`. Business services build prompts and parse DTOs; they do not configure raw WebClient requests.
- AI response contracts must be parsed into DTOs or value objects before persistence. If a prompt requests structured JSON, services must extract the expected fields and fail fast on malformed envelopes.
- OAuth redirect handlers must never place access or refresh tokens in query parameters. Use a short-lived exchange code and redeem it through a normal API endpoint.
- Controllers should return DTOs or `ApiResponse` only. Do not return entities.
- Services should not construct HTTP responses.
- DTO mapping belongs in dedicated mappers when mapping becomes non-trivial or appears in more than one service.
- Mappers, validators, factories, parsers, renderers, and calculators should be named for the domain responsibility they own. Avoid vague classes named `Helper`, `Utils`, `Processor`, or `Manager` unless the existing class is already the canonical owner for that responsibility.
- Auth response creation and user DTO mapping live in `backend/src/main/java/ai/applysmart/service/auth`; `AuthServiceImpl` owns authentication workflow orchestration only.
- Auth token issuing/revocation, registration, password reset, and email verification each live in focused workflow collaborators under `backend/src/main/java/ai/applysmart/service/auth`; do not add those details back to `AuthServiceImpl`.
- Refresh token flows must verify the JWT is a refresh token and should revoke the presented refresh token before issuing the next token pair.
- Rate limiting must be split between HTTP key resolution, Redis/Bucket4j infrastructure, and the public rate-limit service. Do not mix all three responsibilities in one class.
- Transactions belong on services, not controllers. Prefer class-level `@Transactional(readOnly = true)` and method-level `@Transactional` for writes.
- Repository methods should read like persistence operations; business language belongs in services.
- Job entity creation, mutation, and DTO mapping live in `backend/src/main/java/ai/applysmart/service/job`; `JobServiceImpl` owns repository access and transaction boundaries.
- Cover-letter content generation, entity creation/update, and DTO mapping live in `backend/src/main/java/ai/applysmart/service/coverletter`; `CoverLetterServiceImpl` owns persistence orchestration only.
- Settings DTO mapping, static notification preferences, and account-security mutations live in `backend/src/main/java/ai/applysmart/service/settings`; `SettingsServiceImpl` remains a thin service boundary.
- Admin user mapping, analytics assembly, and user-growth calculations live in `backend/src/main/java/ai/applysmart/service/admin`; `AdminServiceImpl` must not calculate metrics inline.
- Prompt instruction builders should compose named instruction components. Do not hide large prompt sections inside nested classes.
- Dashboard calculations live in `backend/src/main/java/ai/applysmart/service/dashboard`; `DashboardServiceImpl` owns repository access and response assembly only.
- Resume file creation, uploaded-file optimization, job-description parsing, target extraction, template selection, and resume DTO mapping live in `backend/src/main/java/ai/applysmart/service/resume`; `ResumeServiceImpl` owns repository access and transaction boundaries.
- Resume optimization workflows should assemble artifacts through focused collaborators. Do not put AI response parsing, cover-letter target resolution, file creation, and persistence in one large method.
- PDF text positioning, replacement planning, font selection, and document rebuilding live in `backend/src/main/java/ai/applysmart/service/pdf`; `PdfManipulationServiceImpl` owns the public PDF service boundary only.
- Resume template rendering lives in `backend/src/main/java/ai/applysmart/service/template`. Section renderers own section-specific HTML, `TemplateDataBinder` owns template data binding, `ResumeTemplateRenderSupport` owns shared render helpers, and `PdfGenerator` owns PDF generation selection.
- PDF generation should prefer Chromium through `ChromiumPdfRenderer` and fall back to OpenHTMLToPDF through `PdfGenerator`. Do not call browser processes directly from controllers or unrelated services.
- Resume font registration and embedded font CSS belong in `ResumeFontRegistry`; do not duplicate font paths or `@font-face` declarations in renderers.
- Runtime PDF settings belong in `application.yml` under `app.pdf`. Use `app.pdf.prefer-chromium` and `app.pdf.chromium-path` rather than hard-coded environment checks.
- Resume matching internals live in `backend/src/main/java/ai/applysmart/service/scoring`; `ResumeMatchScorerImpl` owns score policy orchestration only.
- Resume keyword extraction must be composed from focused extractors and shared normalization helpers. Do not keep every heuristic in one monolithic scoring class.
- JWT filters, token providers, and auth entry points belong under `backend/src/main/java/ai/applysmart/security/jwt`; user-detail loading belongs under `security/user`; OAuth2 classes belong under `security/oauth2`; access handlers belong under `security/access`.
- File cleanup that is intentionally deferred belongs in `backend/src/main/java/ai/applysmart/service/file/FileDeletionScheduler.java`. Do not scatter ad-hoc retry sleeps or background deletion loops through domain services.

## Comments

- Do not add section-label comments such as `// Fetch all jobs`, `{/* Header */}`, or `// Types`.
- Do not add comments that duplicate a function name or option value.
- Keep comments that explain why browser, PDF, security, OAuth, rate-limit, or AI parsing code is written in a non-obvious way.
- Delete stale comments during nearby edits.

## Validation

- Frontend type health: run `npm run typecheck` from `frontend`.
- Frontend unit tests: run `npm test` from `frontend`.
- Frontend production bundle: run `npm run build` from `frontend`.
- Frontend dependency hygiene: run `npm audit --json` from `frontend` after package changes.
- Backend verification: run `docker run --rm -v "$PWD/backend":/app -w /app maven:3.9-eclipse-temurin-17 mvn test -B` from the repo root when local Maven is unavailable.
- Backend Docker image changes should be verified with `docker build -t career-boost-ai-backend:verify ./backend`.
- PDF runtime changes should verify Chromium exists in the built image with `docker run --rm --entrypoint sh career-boost-ai-backend:verify -lc 'command -v chromium'`.
- Run `git diff --check` before handoff.
- Backend refactors should add focused unit tests around newly extracted collaborators before adding heavier integration tests.
- Keep a Spring context smoke test active with a test profile so broken configuration binding, bean wiring, or profile drift is caught by `mvn test`.
- A change is not complete if it knowingly leaves TypeScript errors, backend compile errors, or broken endpoint contracts.
- Treat compiler warnings as refactor candidates. Warnings caused by the current change should be fixed in the same change.
- If a standard gate is unavailable, say exactly which command is missing and what narrower verification was run instead.

## Naming

- React components: `PascalCase`.
- Hooks: `useThing`.
- Services: verb-first functions such as `fetchJobs`, `updateJob`, `deleteResume`.
- Constants: `SCREAMING_SNAKE_CASE` for exported immutable maps and config objects.
- DTO/request types should match backend naming where practical.
- Shared helpers should be named for intent, for example `removeDetailAndInvalidateList`, not implementation details.
