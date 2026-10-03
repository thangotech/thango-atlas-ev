# Thangotech Engineering | EV Atlas

**Foundations of Electric Vehicle Engineering**  
Short Learning Programme | Non-credit-bearing | NQF Credits: 0  
Programme provided by **Prof Bonginkosi Thango**, **Thangotech Engineering**.

## Website

- `index.html`: 3D EV atlas, guided laboratory and Take Course buttons.
- `course.html`: five-module reading/assessment interface.
- `admin.html`: owner sign-in interface; no embedded participant database.
- `verify.html`: registered certificate checker, after backend setup.
- `privacy.html`: programme privacy notice.
- `COURSE_NOTES.html`: printable notes.

The original supplied Thangotech Engineering logo is in `assets/`. The source signature, certificate PDF, assessment answers, backend SQL, owner identifiers and real records are NOT part of this public package.

## Upload to GitHub Pages

Extract the public ZIP. Upload these files and the entire `assets` folder at the root of the existing repository; do not upload the ZIP or an enclosing folder. Commit to `main`. Keep Settings > Pages > Deploy from a branch > main > / (root).

The largest file is below GitHub's browser-upload limit. No npm build is required for Pages. Existing unmatched files are not removed by a new upload; review old publicly served certificate generators or private material separately rather than assuming an overwrite removed them.

## Service status

Reading and the atlas are available without an account. Registration, tracked completion, private metrics and server-issued certificates are closed until the owner configures and tests the separate backend, verified email and owner MFA. `service-config.js` is intentionally empty; it accepts only a project URL and a publishable key, never a secret/service_role key.

Do not put participant records, answer banks, signature images, owner packages, private certificate previews or environment files into this repository. A private source repository does not replace backend access controls.

The public release does not assert an independently verified NQF level or accreditation. It is not a vehicle service manual or authority to work on high-voltage equipment.

Official upload guide: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
