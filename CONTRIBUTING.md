# 🤝 Contributing to LibreUML

First off, thank you for considering contributing to **LibreUML**! 🚀  
We are an open-source project built by students for students (and developers), and we value **every contribution** — whether it's fixing a typo, translating languages, or building a complex engineering engine.

## 📜 License

By contributing, you agree that your contributions will be licensed under the **GNU Affero General Public License v3 (AGPL-3.0)** — the same license that covers the project.  
If you or your company need a commercial license (exempt from AGPL obligations), see [COMMERCIAL_LICENSE.md](./COMMERCIAL_LICENSE.md).

### Contributor license terms

**Please read this before opening a pull request.** LibreUML is **dual-licensed** (AGPL-3.0 and a commercial license). To keep that possible, **by opening a pull request you explicitly agree to all of the following**:

1. **AGPL-3.0.** Your contribution is licensed under the AGPL-3.0, like the rest of the project.
2. **Relicensing grant.** You also grant the LibreUML maintainers a perpetual, worldwide, non-exclusive, royalty-free and irrevocable license to use, reproduce, modify, distribute, sublicense and **relicense your contribution under other terms, including the proprietary commercial license** described in [COMMERCIAL_LICENSE.md](./COMMERCIAL_LICENSE.md), which may be sold to third parties.
3. **You keep your copyright and your authorship.** You are not transferring ownership of your work, and your commits keep you as their author in the git history.
4. **It is yours to give.** The contribution is your own original work, or you have the right to submit it. If it includes third-party code, its license must be compatible with the AGPL-3.0 and you must say where it comes from. If an employer or school could claim rights over your work, get their permission first. This follows the [Developer Certificate of Origin](https://developercertificate.org/).
5. **No compensation, no obligation.** Contributions are voluntary and unpaid. The maintainers are not obliged to merge or keep any contribution, and everything is provided "as is", without warranty.

If you do not agree with these terms, **please do not open a pull request**. They apply to every contribution submitted after they were published in this file.

---

## 🛠️ The Tech Stack

Before diving in, make sure you are comfortable with our core stack:

- **Frontend:** React 18 + TypeScript + Vite  
- **State Management:** Zustand  
- **Diagram Engine:** Konva (react-konva)  
- **Styling:** Tailwind CSS  
- **Testing:** Vitest  

---

## 🚦 Getting Started

1. Fork the repository on GitHub.

2. Clone your fork locally and add the original repository as `upstream`:

```bash
git clone https://github.com/<your-username>/LibreUML.git
cd LibreUML
git remote add upstream https://github.com/LibreUML/LibreUML.git
git fetch upstream
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Run tests (please ensure everything is green before submitting):

```bash
npm run test
```

---

## 🗺️ Roadmap & Help Wanted (Wishlist)

We have a clear vision, but we need hands on deck.  
Feel free to pick a feature and open a **Pull Request**!

### 🟢 Easy / Good First Issues

- 🇧🇷 **Portuguese Translation**  
  Create `src/locales/pt.json` and add the language option in **Settings**.

- ⌨️ **Shortcuts Cheat Sheet**  
  Create a Modal or Sidebar panel listing all keyboard shortcuts (Ctrl+Z, Ctrl+C, etc.).

- 🎨 **High Contrast Theme**  
  Add a new theme in `tailwind.config.js` for better accessibility.

### 🟡 Intermediate / Features

- ☕ **Java Getters & Setters**  
  Update `JavaGeneratorService` to optionally include boilerplate getters and setters for private attributes.

- 💾 **SQL Export**  
  Implement a context menu action **Generate SQL** on a node to copy a `CREATE TABLE` script to the clipboard.

### 🔴 Advanced / Engineering Engines

- 🐍 **Python Support**  
  Create `PythonGeneratorService`.

  **Challenge:** Handle Python’s lack of strict types (use **Type Hints**) and indentation-based syntax.

- 🔷 **C# Support**  
  Create `CSharpGeneratorService`.

  **Challenge:** Handle **Namespaces** correctly.

- 🎓 **UML Linter (Education Layer)**  
  Analyze the diagram graph (nodes and edges) to detect architectural smells:
  - Circular Dependencies (A → B → A)
  - God Classes (classes with >20 methods)
  - Interface overuse

---

## 📏 Code Style & Standards

### 1. Commits

We follow the **Conventional Commits** specification.

Examples:

```text
feat(lang): add portuguese translation
fix(parser): resolve crash on empty java file
docs(readme): update installation steps
style(ui): improve button contrast
```

### 2. File Structure

We use a **Domain-Driven / Hexagonal-ish** architecture:

- `src/features/` — UI components scoped to a domain (e.g., diagram)
- `src/services/` — Pure logic (parsers, generators). **No React code**
- `src/store/` — Global state management (Zustand)

### 3. Testing

If you touch logic inside `src/services/`, you **must** add or update the corresponding test in `__tests__/`.

---

## ⚖️ Pull Request Process

### Which branch?

| Branch | Who uses it |
|---|---|
| `contributors` | **All external pull requests go here.** |
| `develop` | Maintainers. `contributors` is merged into it periodically. |
| `main` | Maintainers. Releases only, promoted from `develop`. |

Pull requests opened directly against `main` are **closed automatically** with instructions to re-open them against `contributors`. When your work is merged, your commits keep you as their author.

1. Create a new branch **from `contributors`**:

```bash
git fetch upstream
git checkout -b feature/my-new-feature upstream/contributors
```

2. Make your changes and commit.

3. Push to your fork and submit a **Pull Request** with `contributors` as the base branch.

4. Describe your changes clearly.  
   📸 **Screenshots are highly appreciated for UI changes!**

---

Thank you for building with us! If you like LibreUML, a ⭐ on the repo and sharing it with friends or classmates helps us a lot. ❤️  
**The LibreUML Team**
