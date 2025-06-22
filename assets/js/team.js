fetch('assets/data/team.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('teamGrid');

    data.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <div class="team-name">${member.name}</div>
      `;
      grid.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading team data:', error));
