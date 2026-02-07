# Trinity Documentation

Unified documentation for the Trinity AI platform, built with Docusaurus.

## Overview

Trinity is a comprehensive AI-powered platform that provides intelligent assistance across various business domains. This documentation site serves as the central knowledge base for understanding, developing, and maintaining Trinity applications.

## Features

- 📚 Comprehensive documentation for Trinity applications
- 🔍 Local search functionality (offline, no external service needed)
- 🎨 Modern, responsive UI with dark mode support
- 🤖 AI-powered documentation assistance
- 📱 Mobile-friendly design
- 🔗 Integrated documentation for SalesCoach and other Trinity applications

## Prerequisites

- Node.js >= 18.0
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/RamachandraMurthy/trinity-docs.git
cd trinity-docs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional, for AI features):
```env
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```

## Development

Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

## Build

Build the site for production:
```bash
npm run build
```

The static site will be generated in the `build` directory.

## Serve Production Build

Serve the production build locally:
```bash
npm run serve
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run clear` - Clear Docusaurus cache
- `npm run swizzle` - Copy theme components for customization
- `npm run write-translations` - Extract translatable strings
- `npm run write-heading-ids` - Add heading IDs to markdown files

## Project Structure

```
trinity-docs/
├── docs/                    # Documentation markdown files
│   ├── intro.md            # Introduction page
│   └── salescoach/         # SalesCoach documentation
│       ├── architecture.md
│       ├── flow/           # Application flow documentation
│       └── ...
├── src/
│   ├── components/         # React components
│   ├── css/               # Custom styles
│   ├── pages/             # Additional pages
│   ├── plugins/           # Docusaurus plugins
│   └── theme/             # Theme customizations
├── static/                # Static assets
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.js            # Sidebar configuration
└── package.json           # Dependencies and scripts
```

## Documentation Structure

Each application's documentation follows a consistent structure:

1. **Overview** - High-level introduction and key features
2. **Architecture** - System design, components, and data flows
3. **Application Flow** - Step-by-step walkthrough of core processes
4. **Security** - Security considerations and best practices
5. **Improvements** - Roadmap and enhancement opportunities

## Technologies

- [Docusaurus](https://docusaurus.io/) - Documentation framework
- React - UI library
- MDX - Markdown with JSX support
- Prism - Syntax highlighting

## Contributing

This documentation is generated from source code analysis and maintained alongside the codebase. If you find inaccuracies or have suggestions for improvement, please:

1. Create an issue describing the problem or enhancement
2. Submit a pull request with your changes
3. Ensure documentation follows the existing structure and style

## License

Copyright © 2025 DXC Technology — Trinity Platform. All rights reserved.

## Support

For questions or issues related to the Trinity platform or this documentation, please contact the development team.
