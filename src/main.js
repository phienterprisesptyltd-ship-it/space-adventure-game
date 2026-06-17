const SAGAS = [
  ['I', 'The Phantom Menace'], ['II', 'Attack of the Clones'], ['III', 'Revenge of the Sith'],
  ['IV', 'A New Hope'], ['V', 'The Empire Strikes Back'], ['VI', 'Return of the Jedi'],
  ['VII', 'The Force Awakens'], ['VIII', 'The Last Jedi'], ['IX', 'The Rise of Skywalker']
];
const LEVEL_TYPES = ['space chase', 'droid rescue', 'desert sprint', 'stealth raid', 'hangar brawl', 'asteroid escape', 'temple puzzle', 'council duel', 'trench run', 'boss showdown'];
const POWERS = ['Force Push', 'Force Pull', 'Mind Trick', 'Saber Throw', 'Force Dash', 'Battle Meditation'];
const SABERS = ['blue guardian blade', 'green mystic blade', 'purple champion blade', 'red shadow blade', 'dual sabers', 'double-bladed saber'];

export function createCampaign() {
  return SAGAS.map(([episode, title], movieIndex) => ({
    episode,
    title,
    levels: Array.from({ length: 20 }, (_, i) => ({
      id: `${episode}-${i + 1}`,
      name: `Episode ${episode} Level ${i + 1}: ${LEVEL_TYPES[(i + movieIndex) % LEVEL_TYPES.length]}`,
      studs: 1000 + (movieIndex * 20 + i + 1) * 125,
      power: POWERS[(i + movieIndex) % POWERS.length],
      saber: SABERS[(i + movieIndex) % SABERS.length],
      objective: i % 5 === 4 ? 'Defeat the chapter villain in a brick-built duel.' : 'Collect studs, solve toy-brick puzzles, and rescue allies.'
    }))
  }));
}

const state = { campaign: createCampaign(), movieIndex: 0, levelIndex: 0, studs: 0, powers: new Set(['Force Push']), sabers: new Set(['blue guardian blade']) };
const root = document.getElementById('root');

function render() {
  const movie = state.campaign[state.movieIndex];
  const level = movie.levels[state.levelIndex];
  const completed = state.movieIndex * 20 + state.levelIndex;
  root.innerHTML = `<main class="app">
    <section class="hero"><p class="eyebrow">Brick-built space fantasy campaign</p><h1>Galactic Brick Saga</h1>
      <p class="note">A legally distinct, playful space adventure inspired by toy-brick co-op action games: 9 movie-style chapters, 180 total levels, Force-like powers, customizable lightsaber-style energy blades, studs, puzzles, vehicles, and boss duels.</p>
      <div class="stats"><span>🏆 ${state.studs.toLocaleString()} studs</span><span>✨ ${completed}/180 levels cleared</span></div></section>
    <section class="grid"><aside class="panel"><h2>Movie Episodes</h2>${state.campaign.map((m, i) => `<button data-movie="${i}" class="${i === state.movieIndex ? 'selected' : ''}">Episode ${m.episode}<small>${m.title}</small><strong>20 levels</strong></button>`).join('')}</aside>
      <section class="panel playfield"><h2>${movie.title}</h2><div class="level-card"><div class="planet"><div class="moon"></div></div><h3>${level.name}</h3><p>${level.objective}</p><ul><li>⚡ Unlock: ${level.power}</li><li>🗡️ Saber style: ${level.saber}</li><li>🛡️ Reward: ${level.studs.toLocaleString()} studs</li></ul><button id="complete" class="primary">Play / Complete Level</button></div></section>
      <aside class="panel"><h2>Level Select</h2><div class="levels">${movie.levels.map((_, i) => `<button data-level="${i}" class="${i === state.levelIndex ? 'selected chip' : 'chip'}">${i + 1}</button>`).join('')}</div><h2>Unlocked Loadout</h2><p><b>Powers:</b> ${[...state.powers].join(', ')}</p><p><b>Sabers:</b> ${[...state.sabers].join(', ')}</p></aside></section></main>`;
  document.querySelectorAll('[data-movie]').forEach(btn => btn.addEventListener('click', () => { state.movieIndex = Number(btn.dataset.movie); state.levelIndex = 0; render(); }));
  document.querySelectorAll('[data-level]').forEach(btn => btn.addEventListener('click', () => { state.levelIndex = Number(btn.dataset.level); render(); }));
  document.getElementById('complete').addEventListener('click', completeLevel);
}

function completeLevel() {
  const movie = state.campaign[state.movieIndex];
  const level = movie.levels[state.levelIndex];
  state.studs += level.studs; state.powers.add(level.power); state.sabers.add(level.saber);
  if (state.levelIndex < 19) state.levelIndex += 1; else if (state.movieIndex < state.campaign.length - 1) { state.movieIndex += 1; state.levelIndex = 0; }
  render();
}

render();
