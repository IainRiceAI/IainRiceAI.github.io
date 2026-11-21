/*
  🌟 YOUR GAME DESIGNER CONTROL ROOM! 🌟
  Change the numbers and colours below, SAVE the file,
  then REFRESH the browser to see your changes.

  CHALLENGE 1: Make the sky PINK! Try sky: "#FFB5DF"
  CHALLENGE 2: Make Troodon VERY fast! Try speed: 420
  CHALLENGE 3: Give the boss 1 health point instead of 3.
  CHALLENGE 4: Add more eggs by changing eggSpacing.

  IMPORTANT: Keep commas, quotes and curly brackets where they are.
  Each number has a comment explaining what it changes.
*/
window.GAME_SETTINGS = {
  world: {
    sky: "#9BDFFF",            // Sky colour. Try "#FFB5DF" for pink!
    grass: "#83CB64",          // Grass colour. Try "#D5A8F0"
    earth: "#B67B47",          // Underground colour
    sunshine: "#FFD966",       // Colour of the sun
    hill: "#75C9B6",           // Distant hills
    levelLength: 3200,         // How many pixels long is the level?
    gravity: 1250,             // Bigger = dinosaurs fall faster
    eggSpacing: 240,           // Smaller = more eggs to collect
    raptorSpacing: 480,        // Smaller = more raptor baddies
    platforms: true,           // Set false to hide raised platforms
    cactusObstacles: true,     // Set false to remove the spiky cacti
    cactusHeight: 42,          // Make cacti taller or shorter (try 30 or 55)
    bossApproachPlatform: false,// Small stepping stone just before the T. rex
    narrowTunnels: true        // Set false to remove low tunnels
  },
  dinosaurs: {
    triceratops: {
      name: "Triceratops",
      colour: "#43B77A",       // Dino body colour
      speed: 205,              // Slow but strong!
      jump: 520,               // Bigger = jumps higher
      lives: 4,                // Has ONE EXTRA life
      power: "CHARGE",
      powerSeconds: 1.0,       // How long charge lasts
      cooldownSeconds: 5       // How long to wait before power again
    },
    brachiosaurus: {
      name: "Brachiosaurus",
      colour: "#669FE5",
      speed: 235,
      jump: 490,
      lives: 3,
      power: "STOMP",
      powerSeconds: 0.7,
      cooldownSeconds: 5
      // Is TOO TALL to pass under a small tunnel!
    },
    troodon: {
      name: "Troodon",
      colour: "#B076E9",
      speed: 300,              // Fastest dinosaur!
      jump: 505,
      lives: 2,                // Only TWO lives
      power: "SUPER JUMP",
      powerSeconds: 0.7,
      cooldownSeconds: 4
    }
  },
  boss: {
    appearAt: 2770,           // Pixel position where T. rex arrives
    health: 3,                // Hits needed to defeat T. rex
    speed: 125,               // How fast T. rex charges
    width: 95,                // Boss size: smaller = easier to jump over
    height: 75,               // Normal jumps can land on its head
    colour: "#E87C4E"         // T. rex body colour
  },
  raptor: {
    colour: "#EAA44B",        // Enemy colour
    speed: 80                 // How fast enemies patrol
  }
};
