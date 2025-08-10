# 🤝 Contributing to AI-First Expo Mobile Template

Thank you for your interest in contributing! This template is designed to help developers build amazing mobile apps with AI assistance.

## 🎯 Project Goals

- Provide a modern, production-ready Expo React Native template
- Optimize for AI-assisted development (GitHub Copilot, Cursor)
- Include best practices and common patterns
- Support Firebase integration out of the box
- Maintain clean, readable, and well-documented code

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/expo-mobile-template.git
   cd expo-mobile-template
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env
   # Fill in your Firebase config
   ```
5. **Start development**
   ```bash
   npm start
   ```

## 📋 Contribution Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper interfaces
- **Naming**: Use descriptive, clear variable and function names
- **Components**: Follow React functional component patterns
- **Styling**: Use TailwindCSS classes consistently
- **Comments**: Add JSDoc comments for complex functions

### File Organization

```
├── app/                    # Expo Router screens
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utilities and services
├── stores/               # Zustand state stores
├── types/                # TypeScript definitions
├── assets/               # Static assets
└── constants/            # App constants
```

### Component Patterns

#### UI Components
```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={`/* your tailwind classes */`}
        {...props}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
);
```

#### Screen Components
```typescript
// app/example.tsx
import { Text } from '@/components/ui';
import { SafeAreaView } from 'react-native';

export default function ExampleScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Text>Example Screen</Text>
    </SafeAreaView>
  );
}
```

#### Store Patterns
```typescript
// stores/exampleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleState {
  value: string;
  setValue: (value: string) => void;
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value }),
    }),
    {
      name: 'example-storage',
    }
  )
);
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Numbered steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: 
   - OS (iOS/Android/Web)
   - Device model
   - Expo SDK version
   - Node.js version

## ✨ Feature Requests

For new features:

1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution
3. **Alternatives**: Other solutions considered
4. **Compatibility**: Impact on existing code
5. **AI-First**: How does this help with AI development?

## 🔧 Development Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation
- `refactor/component-name` - Code refactoring

### Commit Messages
Use conventional commits:
```
feat: add new authentication component
fix: resolve navigation issue on Android
docs: update setup instructions
refactor: simplify store structure
```

### Pull Request Process

1. **Create feature branch** from `main`
2. **Make changes** following guidelines
3. **Test thoroughly** on iOS and Android
4. **Update documentation** if needed
5. **Submit pull request** with:
   - Clear title and description
   - Screenshots/videos for UI changes
   - Test instructions
   - Breaking changes noted

### Testing

Before submitting:
- [ ] App builds successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] Tested on iOS and Android
- [ ] Authentication flow works
- [ ] Navigation works correctly
- [ ] No console errors/warnings

## 📱 AI-First Considerations

When contributing, consider:

### Code Patterns
- Use consistent patterns that AI can learn from
- Add clear TypeScript interfaces
- Include descriptive comments
- Follow established naming conventions

### Documentation
- Update `AI_INSTRUCTIONS.md` for new patterns
- Add examples for complex implementations
- Document common use cases
- Include troubleshooting tips

### Component Design
- Make components reusable and composable
- Use clear prop interfaces
- Include proper defaults
- Support theming and customization

## 🎨 Design System

### Colors
Follow the theme colors in `constants/theme-colors.ts`:
- Primary: Brand colors
- Secondary: Accent colors
- Gray: Text and borders
- Semantic: Success, warning, error

### Typography
Use the Text component variants:
- H1, H2, H3: Headings
- Body: Regular text
- Caption: Small text
- Code: Monospace text

### Spacing
Use Tailwind spacing scale:
- `p-4`, `m-4`: Standard spacing
- `gap-4`: Flex/grid gaps
- `space-x-4`: Space between elements

## 🤖 AI Integration

### GitHub Copilot
- Write descriptive function names
- Add TypeScript interfaces
- Use consistent patterns
- Include helpful comments

### Cursor AI
- Follow `.cursorrules` guidelines
- Maintain project structure
- Use established patterns
- Keep context files updated

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks for major features

## 📞 Questions?

- Open a GitHub issue for bugs/features
- Join our Discord community
- Check existing documentation
- Review similar implementations

Thank you for helping make this template better! 🙏
