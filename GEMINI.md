# Project Overview

This is a static personal portfolio website for Anas Alhalabi, a software engineer. The site is designed to showcase his work, services, and articles. It is a bilingual site, supporting both English and Arabic.

## Key Technologies

*   **Frontend:** Plain HTML, CSS, and JavaScript.
*   **3D Graphics:** Three.js is used for an animated galaxy background effect.
*   **Internationalization (i18n):** A custom JavaScript implementation (`i18n.js`) handles language switching by fetching translations from `translations/translations.json`.

## Project Structure

*   `index.html`: The main English landing page.
*   `index-ar.html`: The main Arabic landing page.
*   `articles.html` / `articles-ar.html`: Pages that list all articles.
*   `articles/`: This directory contains the individual HTML files for each article.
*   `script.js`: Contains the main client-side logic, such as the mobile menu, smooth scrolling, and dynamically loading recent articles onto the homepage.
*   `articles-config.js`: A JavaScript file that acts as a database for article metadata. It contains an array of article objects with details like ID, title, date, description, and tags in both English and Arabic.
*   `i18n.js`: Manages the language switching functionality.
*   `translations/translations.json`: Stores the translation strings for English and Arabic.
*   `galaxy-bg.js`: Implements the Three.js animated background.
*   `styles.css`: The primary stylesheet for the website.
*   `.github/workflows/`: Contains GitHub Actions workflows for deployment.

## Development

This is a static website with no build process. To "run" the project, you can open the `.html` files directly in a web browser. For development, it's recommended to use a local web server to avoid potential issues with file pathing and browser security policies.

### Running a local server (Example with Python)

```bash
python3 -m http.server
```

Then open `http://localhost:8000` in your browser.

## Content Management

### Articles

To add a new article:
1.  Create a new HTML file in the `articles/` directory. The filename should match the `id` you'll specify in the config.
2.  Add the article's metadata to the `articlesData` array in `articles-config.js`. This includes the title, description, date, and tags for both English and Arabic.

### Translations

To add or modify translations, edit the `translations/translations.json` file. Add the new key-value pairs under the respective `en` and `ar` language objects.
