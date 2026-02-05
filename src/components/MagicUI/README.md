# Custom MagicUI Components

This directory contains custom-built UI components inspired by modern glassmorphism and glow effects. These components can be used to enhance the visual appeal of your React application.

## Available Components

### MagicCard
A card component with a spotlight hover effect that follows the mouse cursor.

```tsx
import MagicCard from './components/MagicUI/MagicCard';

<MagicCard className="p-6">
  <h2>Your content here</h2>
</MagicCard>
```

### ShimmerButton
A button with a shimmering gradient animation effect.

```tsx
import ShimmerButton from './components/MagicUI/ShimmerButton';

<ShimmerButton 
  text="Click Me" 
  onClick={() => console.log('Clicked!')} 
/>
```

### TextReveal
A text component that animates in when scrolled into view.

```tsx
import TextReveal from './components/MagicUI/TextReveal';

<TextReveal 
  text="This text will animate in" 
  direction="left" // or "right"
/>
```

### Meteors
Adds meteor animation effects to the background.

```tsx
import Meteors from './components/MagicUI/Meteors';

<Meteors number={20} />
```

### NeonGradientCard
A card with glowing gradient borders.

```tsx
import NeonGradientCard from './components/MagicUI/NeonGradientCard';

<NeonGradientCard 
  gradientColor="from-blue-500 via-purple-500 to-pink-500"
>
  Your content here
</NeonGradientCard>
```

## Utilities

These components use utility functions from `src/lib/utils.ts`, such as the `cn` function for class name merging.

## Tailwind Configuration

Make sure to add the required animations to your `tailwind.config.ts` file:

```js
animation: {
  shimmer: "shimmer 2s linear infinite",
  "meteor-effect": "meteor 5s linear infinite",
},
keyframes: {
  shimmer: {
    from: {
      backgroundPosition: "0 0",
    },
    to: {
      backgroundPosition: "-200% 0",
    },
  },
  meteor: {
    "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
    "70%": { opacity: 1 },
    "100%": {
      transform: "rotate(215deg) translateX(-500px)",
      opacity: 0,
    },
  },
},
```

Also add the `tailwindcss-animate` plugin to your tailwind plugins array. 