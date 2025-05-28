# Darrell S. Best Jr. - Portfolio Website

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdarrellbest.github.io)](https://darrellbest.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://pages.github.com/)

## Overview

Personal portfolio website showcasing my work as a Senior AI Research Engineer. Features a comprehensive blog covering AI research, ethics, hardware acceleration, and privacy-preserving technologies. Built with modern web technologies and a focus on performance, accessibility, and responsive design.

**Live Site:** [https://darrellbest.github.io](https://darrellbest.github.io)

## Features

- **Responsive Design**: Fully mobile-responsive with smooth animations and mobile menu overlay
- **Interactive Navigation**: Sidebar navigation with animated hamburger menu
- **AI Research Blog**: In-depth articles on cutting-edge AI topics with regular updates
- **Project Showcase**: Featured articles and research projects
- **Skills Visualization**: Animated skill bars showing technical proficiencies
- **Category Filtering**: Interactive blog filtering by topic (Research, Privacy, Healthcare, Ethics, Hardware)
- **Reading Time Estimates**: Automatic reading time calculation for all blog posts
- **Smooth Scrolling**: Parallax effects and section animations
- **Dark Theme**: Eye-friendly dark color scheme with accent colors

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **CSS Architecture**: Modular CSS with custom properties
- **Icons**: Feather Icons
- **Hosting**: GitHub Pages
- **Typography**: Inter, Source Serif Pro, JetBrains Mono

## Project Structure

```
├── index.html          # Main portfolio page
├── blog.html          # Blog listing page with category filtering
├── blog/              # Individual blog posts
│   ├── multilingual-ai-future.html
│   ├── ai-healthcare-diagnostics.html
│   ├── privacy-preserving-ai.html
│   ├── ethical-considerations-ai.html
│   └── hardware-acceleration-ai.html
├── css/               # Modular CSS files
│   ├── main.css       # CSS entry point
│   ├── variables.css  # CSS custom properties
│   ├── base.css       # Base styles and typography
│   ├── layout.css     # Layout components
│   ├── sections.css   # Section-specific styles
│   ├── components.css # UI components
│   ├── utilities.css  # Utility classes
│   ├── responsive.css # Responsive breakpoints
│   └── blog.css       # Blog-specific styles
├── script.js          # JavaScript functionality
├── me.png            # Profile picture
└── README.md         # This file
```

## Key Sections

- **About**: Professional summary and expertise
- **Experience**: Work history and key projects including Hawkeye, Danube, and Sonic Screwdriver
- **Featured Articles**: Showcasing latest blog posts on the homepage
- **Blog**: Comprehensive AI research blog with the following articles:
  - The Future of Multilingual AI (Updated May 2025)
  - AI in Healthcare: Transforming Medical Diagnostics (Updated May 2025)
  - Privacy-Preserving AI with Federated Learning (Updated May 2025)
  - Ethical Considerations in AI Development (Updated May 2025)
  - Hardware Acceleration for AI: The Complete Landscape (Updated May 2025)
- **Education**: Academic background (MS in Computer Science at USC, BS from Clemson)
- **Publications**: Research publications including ETRA 2016 paper
- **Skills**: Technical skills breakdown (Python, PyTorch, Hugging Face, etc.)
- **Contact**: Professional contact information

## Development

To run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/DarrellBest/DarrellBest.github.io.git
   ```

2. Open `index.html` in a web browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

## Recent Updates (May 2025)

- **Mobile Responsiveness**: Fixed navigation issues and black spacing on tablet/mobile views
- **Blog Redesign**: Professional blog layout with featured posts and category filtering
- **Content Updates**: All blog articles updated with latest AI developments:
  - Multilingual AI: GPT-4o, Llama 3, Gemini 1.5 Pro coverage
  - Healthcare AI: 600+ FDA approvals, real-world deployments
  - Federated Learning: $50B+ market analysis, industry adoption
  - AI Ethics: OpenAI governance crisis, deepfake epidemic, regulatory updates
  - Hardware: NVIDIA Blackwell, ASICs, Groq LPU, complete landscape coverage

## Performance Optimizations

- Lazy loading for images
- Optimized animations with `will-change` and GPU acceleration
- Modular CSS for better caching
- Minimal JavaScript with vanilla implementation
- Efficient intersection observers for scroll animations
- Mobile-optimized with overlay menu and touch interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Darrell S. Best Jr. All rights reserved.

---

Feel free to explore the code and reach out if you have any questions!