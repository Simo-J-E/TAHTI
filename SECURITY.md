# Security

Do not report credentials or private timetable URLs in public issues.

The GitHub Pages frontend is public. Anything compiled into `VITE_*` values is visible to visitors. Privileged database or service credentials belong only in a server-side environment.

When changing the existing API/data layer, preserve existing identifiers and data and use incremental migrations if a database is introduced or already exists outside this archive.
