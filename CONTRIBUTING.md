# Contributing to Swift Flow AI

First off, thank you for considering contributing to Swift Flow AI! It's people like you that make Swift Flow AI such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/swift-flow-ai.git

# Navigate to the directory
cd swift-flow-ai

# Install dependencies
npm install

# Start development server
VITE_ENABLE_MSW=true npm run dev
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type - use `unknown` or proper types
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Follow React best practices
- Use proper component composition
- Keep components focused and reusable

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Use CSS variables for theme colors
- Ensure responsive design

### Code Style

- Run `npm run lint` before committing
- Follow the existing code formatting
- Write meaningful commit messages
- Comment complex logic

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new workflow builder component
fix: resolve authentication token expiry issue
docs: update installation instructions
style: format code with prettier
refactor: reorganize component structure
test: add tests for approval service
chore: update dependencies
```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components (route handlers)
- `src/contexts/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/services/` - API clients and business logic
- `src/utils/` - Utility functions
- `src/types/` - TypeScript type definitions
- `src/mocks/` - MSW handlers for development

## Testing

(Coming soon - we're working on adding comprehensive tests)

## Documentation

- Update the README.md if you change functionality
- Comment your code where necessary
- Update type definitions
- Keep documentation clear and concise

## Questions?

Feel free to open an issue with the label `question` if you have any questions about contributing.

Thank you for contributing! 🎉

