# Design Guidelines: Hackathon_Ing_SUAI Document Processor (Multi-Page Application)

## Design Philosophy
**Modern, Professional, Multi-Page Experience**: A comprehensive document processing platform with distinct pages for landing, upload/processing, task history, API documentation, and about/support. Design combines utility-focused efficiency with beautiful modern aesthetics inspired by contemporary SaaS platforms.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) for clean, modern readability
- **Headings**: 
  - H1: 2.5rem-4rem (40-64px), font-weight 700 - Page titles and hero sections
  - H2: 1.875rem-3rem (30-48px), font-weight 600 - Section headers
  - H3: 1.25rem-1.5rem (20-24px), font-weight 600 - Component titles
  - H4: 1rem-1.125rem (16-18px), font-weight 600 - Subsection titles
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **UI Elements**: 0.875rem (14px), font-weight 500 - buttons, labels, status
- **Small Text**: 0.75rem-0.875rem (12-14px) - captions, metadata

### Color System
- **Primary (#1e3a8a - Dark Blue)**: 
  - Hero backgrounds
  - Primary CTAs
  - Sidebar active states
  - Brand elements
- **Accent (#059669 - Green)**: 
  - Success states
  - Progress indicators
  - Secondary CTAs
  - Interactive elements
- **Background**: 
  - Light mode: #ffffff, #f8fafc, #f1f5f9
  - Card backgrounds: #ffffff
  - Muted backgrounds: #f8fafc
- **Text Hierarchy**:
  - Primary: foreground (adapts to light/dark)
  - Secondary: muted-foreground
  - Tertiary: muted-foreground with reduced opacity
- **Borders & Dividers**: border color from Shadcn theme

### Layout Structure

#### Sidebar Navigation
- Fixed left sidebar with collapsible functionality
- Width: 18rem (288px) expanded, 3.5rem collapsed
- Contains:
  - App logo and title
  - Navigation menu with icons
  - Footer with copyright
- Sticky positioning with high z-index
- Smooth collapse/expand animation

#### Page Layouts
Each page follows consistent structure:
1. **Header Bar** (48px height)
   - Sidebar toggle button
   - Theme toggle (optional)
   - Breadcrumbs or title (optional)

2. **Main Content Area**
   - Full viewport height with scroll
   - Max-width containers: 6xl (1152px) for most pages
   - Padding: 6-8 (24-32px) on mobile, 8-12 (32-48px) on desktop

3. **Spacing System**
   - Page top padding: py-6 to py-12 (24-48px)
   - Section spacing: space-y-8 to space-y-12 (32-48px)
   - Card gaps: gap-6 to gap-8 (24-32px)
   - Component padding: p-6 to p-8 (24-32px)

## Page-Specific Design

### Landing Page
**Hero Section:**
- Full-width gradient background (primary colors)
- Min-height: 600px
- Centered content with max-width
- Large heading (4xl-6xl)
- Subtitle (xl-2xl)
- Dual CTA buttons (primary + outline)
- Subtle grid pattern overlay

**Features Grid:**
- 3-column grid on desktop, 2-column tablet, 1-column mobile
- Card-based feature blocks
- Icons with colored backgrounds
- Hover elevation effects
- Clear visual hierarchy

**Stats Section:**
- 3-column layout
- Large numbers (5xl, bold)
- Accent colors for emphasis
- Muted background

**CTA Section:**
- Accent background color
- White/light text
- Large heading and button
- Full-width with padding

### Upload/Process Page
**Upload Zone:**
- Large central area (min-height 400px)
- Dashed border (2px) in muted color, accent on drag-over
- Large icon (96px) centered
- Clear instructional text
- Background transitions on hover/drag

**File Preview Grid:**
- Responsive grid: 1-3 columns
- Card-based file items
- File type icons
- File metadata (name, size)
- Remove button (top-right)

**Processing Status:**
- Full-width card
- Status icon with animation
- Progress bar (height: 8px)
- File count badges
- Error states with destructive colors

**Download Section:**
- Success-themed card (accent/green colors)
- Large success icon
- File count display
- Dual action buttons (Download + Process More)

### Task History Page
**Task List:**
- Stacked card layout
- Each card shows:
  - Status icon (animated for processing)
  - Task name/ID
  - Status badge
  - File count and timestamps
  - Download button (if completed)
  - Progress bar (if processing)
  - Error message (if failed)
- Sorted by date (newest first)
- Hover elevation on cards

**Empty State:**
- Centered layout
- Large icon
- Helpful message
- CTA to upload page

### API Documentation Page
**Swagger Embed Section:**
- Full-width card container
- External link to full docs
- Placeholder with CTA

**Endpoint Tabs:**
- Tabbed interface (Upload, Status, Download)
- Each tab shows:
  - Endpoint path and method
  - Request/response schemas
  - Code examples (curl, JS, Python)
- Code blocks with syntax highlighting
- Muted background for code

### About Page
**How It Works:**
- 3-step process cards
- Numbered icons with gradients
- Clear descriptions
- Visual progression

**Supported Formats:**
- 3-column grid
- Icon-based format cards
- File extension lists

**FAQ Accordion:**
- Full-width accordion component
- Clear questions
- Detailed answers
- Smooth expand/collapse

**Tech Stack:**
- 2-column grid
- Bullet point lists
- Clear categorization

## Component Library

### Sidebar (Shadcn)
- Uses built-in Shadcn sidebar primitives
- SidebarProvider wraps entire app
- SidebarHeader with branding
- SidebarContent with navigation menu
- SidebarFooter for metadata
- Active state highlighting
- Keyboard shortcut support (Cmd/Ctrl+B)

### Cards
- White background with subtle border
- Rounded corners (rounded-lg)
- Padding: p-6 or p-8
- Hover elevation for interactive cards
- Shadow: subtle elevation
- Border: 2px for emphasis (optional)

### Buttons
- **Variants:**
  - default: Primary color background
  - secondary: Muted background
  - outline: Border with transparent background
  - ghost: No background until hover
- **Sizes:**
  - sm: Compact (h-8)
  - default: Standard (min-h-9)
  - lg: Large (min-h-10)
  - icon: Square (h-9 w-9)
- Consistent hover/active elevation
- Icon + text combinations
- Loading states with spinners

### Progress Indicators
- Height: h-2 (8px)
- Accent color fill
- Smooth animation
- Rounded ends
- Background: muted color

### Badges
- **Variants:**
  - default: Accent/primary
  - secondary: Muted
  - destructive: Error states
  - outline: Bordered
- Compact size (h-5 or h-6)
- No line wrapping
- Clear text hierarchy

### Status Indicators
- Icon-based (Lucide React)
- Color-coded:
  - Success: Accent/green
  - Error: Destructive/red
  - Processing: Primary/blue with spin animation
  - Pending: Muted
- Consistent sizing (h-5 w-5 or h-6 w-6)

## Animations & Interactions

### Page Transitions
- Smooth navigation (handled by Wouter)
- No jarring layout shifts
- Content fade-in on load (subtle)

### Hover States
- Cards: Subtle elevation using hover-elevate class
- Buttons: Built-in elevation from Shadcn
- Links: Underline or color change
- Icons: Scale or color transition (subtle)

### Loading States
- Skeleton screens for initial load
- Spinners for actions (Loader2 icon, animated)
- Progress bars for processing
- Disabled button states during operations

### Interactive Elements
- Scale transforms: Very subtle (1.02 max)
- Color transitions: 200ms duration
- Smooth progress animations
- Animated spinners for processing states

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
  - Single column layouts
  - Stacked elements
  - Reduced padding (px-6, py-6)
  - Collapsible sidebar (sheet overlay)

- **Tablet**: 768px - 1024px
  - 2-column grids
  - Moderate spacing
  - Standard sidebar

- **Desktop**: > 1024px
  - 3-column grids
  - Maximum spacing
  - Full sidebar experience
  - Optimal readability

### Sidebar Responsiveness
- Desktop: Persistent sidebar with expand/collapse
- Mobile: Drawer/sheet overlay
- Automatic adaptation via Shadcn sidebar hooks

## Dark Mode Support
- Configured via Shadcn theme system
- CSS variables adapt automatically
- All colors use semantic tokens
- Images/graphics work in both modes
- Toggle in header (optional)

## Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images/icons
- Color contrast compliance (WCAG AA)

## Visual Hierarchy
1. **Primary Focus**: Hero CTAs, Upload zone, Download buttons
2. **Secondary**: Navigation, Feature cards, Task items
3. **Tertiary**: Metadata, Timestamps, Helper text
4. **Least Important**: Footer text, Small captions

## Best Practices
- Consistent spacing throughout
- Clear visual separation between sections
- Proper use of white space
- Scannable content layout
- Action buttons always visible and accessible
- Loading and error states always handled
- Mobile-first approach
- Performance-optimized animations
