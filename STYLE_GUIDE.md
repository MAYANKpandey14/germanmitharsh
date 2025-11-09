# German Mit Harsh - Style Guide

## Color System

### Conversion Accent Color
**Primary CTA Color (Orange):** `--accent: 25 95% 53%`
- **Use for:** Primary CTAs only (Enroll Now, Buy, Submit buttons)
- **Do NOT use for:** Secondary actions, links, or decorative elements
- **Reasoning:** This trains users to recognize the primary action on every page

### Color Palette

#### Light Mode
- **Primary Blue:** `--primary: 221 83% 53%` - Brand color, headings, links
- **Primary Dark:** `--primary-dark: 224 76% 36%` - Gradients, darker accents
- **Secondary Gold:** `--secondary: 43 96% 56%` - Badges, highlights
- **Accent Orange:** `--accent: 25 95% 53%` - PRIMARY CTAs ONLY
- **Background:** `--background: 0 0% 100%` - Main background
- **Foreground:** `--foreground: 222 47% 11%` - Body text
- **Muted:** `--muted: 210 40% 96%` - Secondary backgrounds
- **Muted Foreground:** `--muted-foreground: 215 16% 47%` - Secondary text
- **Border:** `--border: 214 32% 91%` - Component borders

#### Dark Mode
- Same color names, adjusted for dark backgrounds
- Maintains consistency across modes

### Color Usage Rules

1. **Primary CTAs** → Use `variant="cta"` on Button component (orange accent)
2. **Secondary CTAs** → Use `variant="outline"` on Button component
3. **Text Links** → Use `text-primary` class
4. **Success States** → Use `text-accent` (green from lucide icons)
5. **Body Text** → Use `text-foreground` (never hard-coded colors)
6. **Secondary Text** → Use `text-muted-foreground`

## Typography

### Font Families
- **Headings:** Poppins (defined via `font-heading`)
- **Body Text:** Inter (defined via `font-body`)

### Type Scale
All sizes use responsive design:

```tsx
// Headlines
<h1 className="text-4xl md:text-5xl lg:text-6xl">
<h2 className="text-3xl md:text-4xl lg:text-5xl">
<h3 className="text-2xl md:text-3xl">
<h4 className="text-xl md:text-2xl">

// Body Text (minimum 16px)
<p className="text-base md:text-lg">        // Default body
<p className="text-lg md:text-xl">          // Large body
<p className="text-sm">                     // Small text (use sparingly)
```

### Font Weights
- **Regular:** 400 (default for body)
- **Medium:** 500 (for emphasis)
- **Semibold:** 600 (for button text, labels)
- **Bold:** 700 (for headlines)

### Typography Rules
1. **Never use `text-sm`** for body content (min 16px = `text-base`)
2. **All headings** automatically use Poppins via `font-heading`
3. **Consistent line heights** via Tailwind defaults
4. **Responsive sizing** on all text elements

## Button Components

### Button Variants

```tsx
// PRIMARY CTA (Conversion Accent Color - Orange)
<Button variant="cta">Enroll Now</Button>

// SECONDARY CTA (Blue outline)
<Button variant="outline">Learn More</Button>

// DEFAULT (Blue filled)
<Button variant="default">Submit</Button>

// DESTRUCTIVE (Red)
<Button variant="destructive">Delete</Button>

// GHOST (Transparent)
<Button variant="ghost">Cancel</Button>

// LINK (Text link style)
<Button variant="link">Read More</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>      // h-9
<Button size="default">Medium</Button> // h-10 (default)
<Button size="lg">Large</Button>      // h-11
<Button size="icon">Icon</Button>     // h-10 w-10
```

### Button Usage Guidelines

1. **One Primary CTA per section** - Use `variant="cta"` sparingly
2. **Hover states** - All buttons darken by 10% on hover (built-in)
3. **Icons with text** - Use lucide-react icons with 2-unit gap
4. **Loading states** - Add `disabled` prop when loading

Example:
```tsx
<Button variant="cta" size="lg" disabled={isLoading}>
  {isLoading ? "Processing..." : "Enroll Now"}
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>
```

## Spacing System

### Container Padding
```tsx
// Mobile first, responsive
<div className="px-4 md:px-6 lg:px-8">
<div className="py-8 md:py-12 lg:py-16">
```

### Component Gaps
```tsx
<div className="gap-4 md:gap-6 lg:gap-8">  // Between cards/items
<div className="space-y-4 md:space-y-6">   // Vertical stacking
<div className="space-x-3 md:space-x-4">   // Horizontal items
```

### Section Spacing
```tsx
<section className="py-12 md:py-16 lg:py-20">  // Section padding
<div className="mb-8 md:mb-12 lg:mb-16">       // Section margins
```

## Design Patterns

### Cards
```tsx
<Card className="hover-lift border-2 border-transparent hover:border-primary/20">
  <CardContent className="p-6 md:p-8">
    {/* Content */}
  </CardContent>
</Card>
```

### Hero Sections
- Always include: Headline, Sub-headline, Primary CTA
- Headline should be 4xl-7xl responsive
- CTA should use `variant="cta"`
- Include social proof immediately below

### Course Pages
- Video/content at top
- Transformation section (What You'll Be Able To Do)
- Course details cards (Duration, Format, Certification)
- Curriculum accordion
- Testimonials (filtered by level)
- FAQ section
- Final CTA
- Sticky mobile CTA (appears after 30% scroll)

## Animations

### Available Utility Classes
```tsx
className="animate-fade-in"     // Fade in from below
className="animate-slide-up"    // Slide up reveal
className="hover-scale"         // Scale on hover
className="hover-lift"          // Lift with shadow on hover
```

### Staggered Animations
```tsx
{items.map((item, index) => (
  <div 
    key={index}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
))}
```

### Custom Keyframes
- `fadeIn` - 0.6s ease-out
- `slideUp` - 0.6s ease-out  
- `slide-up` - For sticky mobile CTA
- `float-gentle` - For floating elements
- `float-soft` - Alternative float with rotation

## Icons

### Using Lucide React
```tsx
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

// Standard icon size
<ArrowRight className="h-5 w-5" />

// Large icon (for cards)
<CheckCircle2 className="h-12 w-12 text-primary" />

// Icon with text
<Button>
  View Course
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
```

### Icon Color Usage
- Primary actions: `text-primary`
- Success states: `text-accent`
- Warnings: `text-destructive`
- Muted/inactive: `text-muted-foreground`

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Grid Patterns
```tsx
// 2 columns mobile, 3 tablet, 4 desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

// 1 column mobile, 2 desktop
<div className="grid md:grid-cols-2 gap-8">

// Auto-fit responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Component Examples

### Social Proof Bar
```tsx
<SocialProofBar />
// Displays: Star rating, student count, pass rate, credentials
```

### FAQ Section
```tsx
<FAQ />
// 8-10 common questions in accordion format
```

### Course Curriculum
```tsx
<CourseCurriculum modules={courseModules} />
// Accordion with FREE PREVIEW badges
```

### Sticky Mobile CTA
```tsx
<StickyMobileCTA 
  level="A1 Course"
  price="₹15,000"
  originalPrice="₹20,000"
/>
// Appears after 30% scroll on mobile only
```

### Video Player
```tsx
<VideoPlayer 
  videoId="youtube-id"  // Optional
  title="Course Preview"
/>
// Shows placeholder if no videoId provided
```

## SEO Best Practices

### Meta Tags
```tsx
<SEOHead 
  title="Course Name | German Mit Harsh"
  description="Conversion-focused description under 160 chars"
  keywords="german, learn german, german course"
/>
```

### Semantic HTML
- Use `<main>`, `<section>`, `<article>` for structure
- Use `<h1>` once per page
- Progressive heading hierarchy (h1 → h2 → h3)

### Image Optimization
- Always include `alt` attributes
- Use responsive images
- Implement lazy loading for below-fold images

## Accessibility

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Use proper `tabIndex` when needed
- Test with Tab key navigation

### ARIA Labels
```tsx
<button aria-label="Close menu">
  <X className="h-5 w-5" />
</button>
```

### Focus States
- All buttons have built-in focus rings
- Use `focus-visible:` for custom focus styles

### Color Contrast
- All text meets WCAG AA standards
- Test with contrast checker tools
- Never use low-contrast text

## Common Patterns

### Call-to-Action Section
```tsx
<section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
    <p className="text-xl mb-6">Join 500+ successful students</p>
    <Button variant="cta" size="lg">Enroll Now</Button>
  </div>
</section>
```

### Testimonial Card
```tsx
<Card className="hover-lift">
  <CardContent className="p-6">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
      ))}
    </div>
    <p className="italic mb-4">"{testimonial.quote}"</p>
    <div className="font-semibold">{testimonial.name}</div>
    <Badge variant="secondary">{testimonial.result}</Badge>
  </CardContent>
</Card>
```

### Feature Card
```tsx
<Card className="hover-lift">
  <CardContent className="p-6 text-center">
    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </CardContent>
</Card>
```

## File Organization

### Component Structure
```
src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── Navigation.tsx   # Global navigation
│   ├── Footer.tsx       # Global footer
│   ├── NavDropdown.tsx  # Course dropdown
│   ├── SocialProofBar.tsx
│   ├── CourseCurriculum.tsx
│   ├── FAQ.tsx
│   ├── StickyMobileCTA.tsx
│   ├── VideoPlayer.tsx
│   ├── CourseTestimonials.tsx
│   └── SEOHead.tsx
├── pages/
│   ├── Home.tsx
│   ├── CourseVideo.tsx
│   ├── Contact.tsx
│   └── ...
└── index.css           # Global styles & design tokens
```

## Adding New Content

### Adding a New Course
1. Add course data to `CourseVideo.tsx` courseData object
2. Include: title, duration, description, transformations, modules, price
3. Ensure modules have FREE PREVIEW lessons marked
4. Add testimonials for that level in `CourseTestimonials.tsx`

### Adding New Testimonials
1. Edit `CourseTestimonials.tsx`
2. Add to appropriate level array
3. Include: name, level, quote, result

### Adding FAQ Items
1. Edit `FAQ.tsx`
2. Add to `faqData` array
3. Format: { question, answer }

## Testing Checklist

- [ ] All CTAs use correct accent color
- [ ] Typography minimum 16px for body text
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px)
- [ ] All images have alt attributes
- [ ] Keyboard navigation works
- [ ] Hover states function correctly
- [ ] Forms have validation
- [ ] Loading states implemented
- [ ] Dark mode tested (if applicable)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
