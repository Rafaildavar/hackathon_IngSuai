# Design Guidelines: Hackathon_Ing_SUAI Document Processor

## Design Approach
**Reference-Based + System Hybrid**: Drawing inspiration from Dropbox's clarity and WeTransfer's focused workflows, combined with Material Design principles for professional tech presentation. This utility-focused application prioritizes efficiency while maintaining visual appeal for hackathon demonstration.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) for clean, modern readability
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700 - "Hackathon_Ing_SUAI"
  - H2: 1.875rem (30px), font-weight 600 - Section headers
  - H3: 1.25rem (20px), font-weight 600 - Component titles
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **UI Elements**: 0.875rem (14px), font-weight 500 - buttons, labels, status

### Layout System
**Spacing Units**: Tailwind spacing with primary values of 4, 6, 8, 12, 16, 24
- Container padding: `px-6 md:px-12 lg:px-24`
- Section spacing: `py-12 md:py-16`
- Component gaps: `gap-6` for primary layouts, `gap-4` for nested elements
- Card padding: `p-6 md:p-8`

### Color Application
- **Primary (#1e3a8a)**: Header background, primary buttons, brand elements
- **Accent (#059669)**: Success states, progress indicators, CTAs, active file states
- **Background (#f8fafc)**: Main canvas
- **Neutrals**: 
  - Text: #1f2937 (gray-800)
  - Secondary text: #6b7280 (gray-500)
  - Borders: #e5e7eb (gray-200)
  - Cards/panels: #ffffff

## Component Library

### Header
- Full-width with primary color background (#1e3a8a)
- Height: `h-16 md:h-20`
- Logo: "Hackathon_Ing_SUAI" with subtitle "AI Document Processor" in white
- Subtle bottom border shadow for depth

### Drag & Drop Zone
- Large central area: min-height 400px on desktop, 300px mobile
- Dashed border (3px) in gray-300 when idle, accent green when dragging over
- Icon: Large upload cloud icon (96px) centered above text
- Primary text: "Drag & drop your documents here"
- Secondary text: "or click to browse • Supports Images, PDF, and ZIP files"
- Background: white with subtle gray-50 tint on hover
- Rounded corners: `rounded-xl`
- Spacing: `p-12 md:p-16`

### File Preview Cards
- Grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Card structure:
  - Thumbnail area (aspect-ratio 4:3) with document icon or image preview
  - File name (truncated with ellipsis)
  - File size in gray-500
  - Remove button (small, top-right, red on hover)
- White background, border gray-200, `rounded-lg`
- Padding: `p-4`

### Progress Indicators
- Processing state: Full-width horizontal progress bar with accent green
- Height: `h-2`, rounded ends
- Animated pulse effect during processing
- Status text below: "AI processing documents..." with rotating ellipsis
- Estimated time display in gray-500

### Buttons
- **Primary** (Upload/Download): Background accent green, white text, `px-8 py-3`, `rounded-lg`, font-weight 600
- **Secondary** (Cancel/Clear): Border gray-300, gray-700 text, `px-6 py-2.5`, `rounded-lg`
- Height consistency: `h-12` for primary actions
- Hover: Subtle scale (1.02) and brightness adjustment
- Disabled: Opacity 50%, cursor-not-allowed

### Status Messages
- Success: Green background-50, green-700 text, green-500 border-left (4px)
- Error: Red equivalent color scheme
- Info: Blue equivalent color scheme
- Padding: `p-4`, `rounded-lg`, with icon on left

### Layout Structure
**Main Container**:
- Max-width: `max-w-6xl` centered with `mx-auto`
- Vertical flow with `space-y-8`

**Section Order**:
1. Header (fixed or sticky)
2. Hero/Upload Zone (central focus)
3. File Preview Grid (conditionally visible)
4. Processing Status (conditionally visible)
5. Download Section (conditionally visible)

## Animations
- **File upload**: Gentle fade-in for preview cards (300ms)
- **Drag state**: Border color transition (200ms)
- **Processing**: Continuous progress bar animation with ease-in-out
- **Success state**: Checkmark icon with subtle scale-up effect
- Minimize other animations to maintain professional appearance

## Images
**Icon Library**: Heroicons (CDN)
- Upload cloud icon for drag-drop zone
- Document icons for file type indicators
- Checkmark for success states
- Loading spinner for processing

**No hero image needed** - This is a utility-focused application where the drag-drop zone serves as the primary visual element.

## Responsive Behavior
- **Mobile** (< 768px): Single column, reduced padding, stacked layout
- **Tablet** (768px-1024px): 2-column file grid, moderate spacing
- **Desktop** (> 1024px): 3-column file grid, full spacing, optimal readability

This design creates a professional, efficient document processing interface that showcases hackathon-quality development while maintaining exceptional usability for demonstrations.