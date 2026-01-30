# Prasanth Muntha — Portfolio

A minimal, interactive portfolio website with a black & white aesthetic, terminal mode, and hidden easter eggs.

**Live:** [prsanthx.github.io](https://prsanthx.github.io)

---

## Features

### Visual Design
- **Black & white theme** — Clean, high-contrast aesthetic
- **Geometric background** — Floating shapes (triangles, squares, diamonds, circles) that drift and rotate
- **Circuit line animation** — Data pulses flow through a spine connecting each section
- **Custom cursor** — Dot with trailing ring, expands on hover
- **Scroll progress indicator** — Thin line at top showing scroll position
- **Parallax effects** — Subtle depth on scroll

### Interactive Elements
- **Loading screen** — Terminal-style boot sequence on first load
- **Resume modal** — Click "Resume" to see a LaTeX compile animation, then view/download PDF
- **Terminal mode** — Press `` ` `` or click the terminal button to open an interactive command line

### Terminal Commands
| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Navigate to About section |
| `projects` | Navigate to Projects section |
| `stack` | Navigate to Tech Stack section |
| `contact` | Navigate to Contact section |
| `resume` | Open resume modal |
| `github` | Open GitHub profile |
| `linkedin` | Open LinkedIn profile |
| `email` | Open email client |
| `whoami` | Display bio card |
| `neofetch` | Show system info (styled) |
| `ls` | List all sections |
| `matrix` | Activate Matrix easter egg |
| `hyper` | Activate Hyper mode |
| `clear` | Clear terminal |
| `sudo hire prasanth` | Interactive hiring form |

### Easter Eggs 🥚
- **Konami Code** — ↑↑↓↓←→←→BA activates Hyper mode
- **Type "matrix"** — Matrix rain animation
- **Type "hello"** — Friendly greeting
- **Type "hire"** — Hiring message
- **Click logo 5x** — Glitch effect
- **Shift + Click status panel** — Secret terminal output
- **Double-click name** — Bounce animation
- **Floating hints** — Random hints appear in the background

---

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, Grid, Flexbox
- **Vanilla JavaScript** — No frameworks, ~1400 lines
- **Fonts** — Space Mono, Inter (Google Fonts)
- **Icons** — Font Awesome 6

---

## Setup

### Local Development
```bash
# Clone the repo
git clone https://github.com/prsanthx/prsanthx.github.io.git
cd prsanthx.github.io

# Open in browser
open index.html
# Or use a local server
python -m http.server 8000
```

### Configure Formspree (for hiring submissions)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your endpoint URL
4. In `script.js`, find and replace:
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

---

## File Structure

```
├── index.html      # Main HTML
├── style.css       # All styles (~1400 lines)
├── script.js       # All JavaScript (~1400 lines)
├── resume.pdf      # Resume PDF file
├── resume.tex      # Resume LaTeX source
├── favicon.svg     # PM. logo favicon
└── README.md       # This file
```

---

## Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
  --black: #0a0a0a;
  --white: #f5f5f5;
  --gray: #888;
}
```

### Add/Remove Easter Eggs
Easter eggs are defined in `script.js` under the `// EASTER EGGS` section.

### Modify Terminal Commands
Commands are in the `commands` object in `script.js`.

---

## Performance

- No external JavaScript frameworks
- Minimal dependencies (only Google Fonts & Font Awesome)
- Animations use `requestAnimationFrame`
- Parallax disabled on mobile for performance
- Custom cursor disabled on touch devices

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT — Feel free to use this as inspiration for your own portfolio!

---

## Contact

**Prasanth Muntha**
- Email: pmuntha@mail.yu.edu
- GitHub: [@prsanthx](https://github.com/prsanthx)
- LinkedIn: [prasanth-muntha](https://linkedin.com/in/prasanth-muntha-30b96623b/)

---

*Built with ☕ and way too many easter eggs.*
