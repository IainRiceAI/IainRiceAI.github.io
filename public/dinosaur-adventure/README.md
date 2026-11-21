# 🦕 Dinosaur Adventure — Version 1

A tiny, colourful dinosaur platform game designed for a 7-year-old to **play and learn to edit actual code**.

## Play immediately

1. Unzip `dinosaur-adventure-v1.zip`.
2. Double-click `index.html` to open it in Chrome, Edge or Firefox. **No installation, internet connection, Spark or server required.**
3. Choose a dinosaur. Move with ← →, jump with SPACE, use your power with X.
4. Stomp on raptors from above (or use your powers), collect eggs and beat the T. rex.

On phones/tablets, use the on-screen controls. The graphics are drawn using Canvas: no external images or downloads are required.

## Your daughter's coding challenges

Open `settings.js` in VS Code or any text editor. After making a change, **save** and **refresh the browser**.

1. **Colours:** Find `sky`. Change `"#9BDFFF"` to `"#FFB5DF"`. What happened?
2. **Variables:** Find Troodon's `speed`. Change `300` to `420`. Is it easier or harder to control?
3. **Lives:** Find Triceratops' `lives`. Can you give it 6?
4. **Loops and spacing:** Change `eggSpacing` from `240` to `120`. What changes in the game?
5. **Boss:** Change `boss.health` from `3` to `1`. Is the boss easier?
6. **Boolean logic:** Change `rockObstacles: true` to `false`. What disappears?
7. **Compare dinosaurs:** Which dinosaur gets through narrow tunnels? Why?

For more challenging work, open `game.js` and look for the functions `activatePower`, `hurt`, `drawWorld`, and `update`. Ask your daughter to describe what each `if` statement is checking, then experiment with it.

## Dinosaur rules

- **Triceratops:** slow, **4 lives**, X charges through enemies and rocks.
- **Brachiosaurus:** **3 lives**, X stomps enemies/rocks; **too tall for narrow passages** (must jump over their roofs).
- **Troodon:** fastest, **2 lives**, X super jumps.
- Powers have cooldowns, edited in `settings.js`.
- Raptors patrol; jumping on their heads defeats them.
- T. rex appears near the end and takes multiple hits. Jump on its head or use a special power.

## Use on DGX Spark / VS Code

For this version you only need static files. On the Spark (or any machine with Python):

```bash
cd dinosaur-adventure-v1
python3 -m http.server 8000
```

In VS Code Remote SSH you can forward port 8000 and browse to `http://localhost:8000` on your laptop. Alternatively just open the HTML file locally.

## Publish free on GitHub Pages

1. Create a new public GitHub repository, such as `dinosaur-adventure`.
2. Upload `index.html`, `style.css`, `settings.js`, and `game.js` to the repository root.
3. In your repository, open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, and select `main` / `(root)`.
4. Once GitHub publishes it, the game will be at `https://YOUR-USERNAME.github.io/dinosaur-adventure/`.

No build step, dependencies, backend, API keys or payments are necessary.

## What we'd add in Version 2

Character sprites/animations drawn by your daughter, sound, checkpoint flags, multiple levels, richer boss attacks, additional enemy types and a bigger map. We intentionally kept Version 1 small enough to understand and change.

## Fix in Version 1.1

- Corrected Brachiosaurus drawing coordinates so its feet sit on the ground rather than appearing to float.


## Version 1.1 fixes

- Brachiosaurus drawing is foot-anchored so it stands on the floor.
- T. rex is shorter (editable `boss.height` and `boss.width`) and has a stepping stone before the encounter (`world.bossApproachPlatform`). All three dinosaurs can jump onto it without special powers.
- Spiky green cacti replace rounded rocks; edit `world.cactusObstacles` and `world.cactusHeight`.

### Extra game-designer challenges

1. Try changing `cactusHeight: 42` to `30`. Does jumping become easier?
2. Try changing `boss.height: 75` to `55`. Can all three dinosaurs reach the boss?
3. Try switching `bossApproachPlatform` to `false`. Can you still beat the boss?
