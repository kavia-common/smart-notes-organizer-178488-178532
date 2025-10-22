# Smart Notes Frontend

Angular app providing a two-pane notes UI with Ocean Professional theme.

How to run:
- npm install
- npm start
- Open http://localhost:3000

Features:
- Two-pane layout: sidebar list and main editor
- Create, edit, delete notes
- Search with highlighting
- LocalStorage persistence
- Deep-linking: /notes and /notes/:id
- Responsive with collapsible sidebar (toggle in top bar)
- Accessible buttons and focus styles

Routing:
- ShellComponent is the app layout
- NotesPageComponent handles list + editor in one route

Styling:
- SCSS variables in src/styles.scss implement the Ocean Professional theme
