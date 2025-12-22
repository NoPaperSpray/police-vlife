document.addEventListener("DOMContentLoaded", () => {
  // --- Logique de navigation principale ---
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  const sections = document.querySelectorAll(".main > .section");
  const quickCards = document.querySelectorAll(".quick-card[data-section-target]");
  const procedureFocusView = document.getElementById('procedureFocusView');
  let lastActiveSection = document.querySelector('.section-active');

  const activateSection = (target) => {
    const newActiveSection = document.querySelector(`.section[data-section="${target}"]`);
    if (lastActiveSection === newActiveSection) return;

    if (lastActiveSection) {
      lastActiveSection.classList.remove('section-active');
    }
    if (newActiveSection) {
      newActiveSection.classList.add('section-active');
      lastActiveSection = newActiveSection;
    }

    navItems.forEach((i) => {
      i.classList.toggle("active", i.getAttribute("data-section-target") === target);
    });
  };

  const showFocusView = () => {
    if (lastActiveSection) lastActiveSection.classList.remove('section-active');
    procedureFocusView.classList.remove('d-none');
    procedureFocusView.classList.add('d-flex');
  };

  const hideFocusView = () => {
    procedureFocusView.classList.add('d-none');
    procedureFocusView.classList.remove('d-flex');
    if (lastActiveSection) lastActiveSection.classList.add('section-active');
  };

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (procedureFocusView.classList.contains('d-flex')) {
        hideFocusView();
      }
      activateSection(item.getAttribute("data-section-target"));
    });
  });
  
  quickCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (procedureFocusView.classList.contains('d-flex')) {
        hideFocusView();
      }
      activateSection(card.getAttribute("data-section-target"));
    });
  });

  // --- Données ---
  const allProcedures = [
    { "id": "judiciaires", "title": "Procédures Judiciaires", "icon": "fa-scale-balanced", "level": "Intermédiaire", "keywords": "légal rapport flagrant délit preuve témoin", "content": `<h3>Objectif du module</h3><p>Maîtriser tout le déroulé judiciaire d’une affaire : de l’interpellation jusqu’au rapport final transmis à la hiérarchie et à la justice.</p><h3>1. Conditions d’interpellation</h3><ul><li>Flagrant délit constaté (vol, agression, effraction, etc.).</li><li>Désignation claire par un témoin fiable et cohérent.</li><li>Preuves matérielles suffisantes (caméra, description, plaque, etc.).</li></ul><h3>2. Mise en sécurité & annonce du motif</h3><p>Le suspect est immobilisé et menotté si nécessaire. L’agent annonce clairement le motif de l’interpellation, sans agressivité ni provocation.</p><h3>3. Transport vers le PDP</h3><p>Le transport se fait en sécurité, sans violence inutile. Les agents annoncent à la radio le départ et l’arrivée au poste.</p><h3>4. Suite de la procédure</h3><p>Ce module est pensé pour être complété avec les fiches « Droit Miranda », « Guide d’Arrestation » et « Gestion de Garde à Vue ».</p>` },
    { "id": "miranda", "title": "Droit Miranda", "icon": "fa-comment-dots", "level": "Débutant", "keywords": "droits silence avocat tribunal avertissement", "content": `<h3>Formule officielle</h3><p class="procedure-quote">« Vous êtes placé en état d’arrestation. Vous avez le droit de garder le silence. Tout ce que vous direz pourra être retenu contre vous devant un tribunal. Vous avez le droit à un avocat. Si vous n’en avez pas les moyens, un avocat vous sera commis d’office. Vous avez également le droit à une assistance médicale en cas de blessure. Avez-vous compris vos droits ? »</p><h3>Quand la lire ?</h3><ul><li>Avant toute fouille complète du suspect.</li><li>Avant toute amende ou décision d’incarcération.</li><li>Avant tout interrogatoire sérieux au poste.</li></ul><h3>Erreurs à éviter</h3><ul><li>Oublier de lire les droits avant la fouille ou l’amende.</li><li>Refuser de répéter les droits en cas d’incompréhension réelle.</li><li>Menacer le suspect avec les droits au lieu de les expliquer calmement.</li></ul>` },
    { "id": "arrestation", "title": "Guide d’Arrestation", "icon": "fa-handcuffs", "level": "Intermédiaire", "keywords": "menottes interpellation droits miranda fouille transport gav", "content": `<h3>1. Interpellation sur le terrain</h3><ul><li>Annonce claire : « Police de Rockford, arrêtez-vous, mains visibles ! »</li><li>Immobilisation et menottage si nécessaire, sans violence inutile.</li><li>Contrôle rapide : armes visibles, danger immédiat, civils autour.</li></ul><h3>2. Sécurisation & droits</h3><ul><li>Motif d’interpellation annoncé au suspect.</li><li>Lecture du Droit Miranda avant fouille ou amende.</li><li>Fouille sommaire sur place uniquement si danger potentiel.</li></ul><h3>3. Transport & arrivée au PDP</h3><ul><li>Annonce radio 10-8 / 10-41 / 10-42 ou équivalents.</li><li>Transport sécurisé, sans insultes ni provocations HRP.</li><li>Installation du suspect en zone de fouille / GAV à l’arrivée.</li></ul><h3>4. Suite de la procédure</h3><p>La procédure se poursuit avec la fiche « Gestion de Garde à Vue ».</p>` },
    { "id": "balisage", "title": "Balisage & Sécurité", "icon": "fa-triangle-exclamation", "level": "Avancé", "keywords": "périmètre sécurité scène de crime ruban cônes bloquer", "content": `<h3>1. Principes généraux</h3><ul><li>Assurer la sécurité des civils, des agents et de la scène.</li><li>Être visible de jour comme de nuit (cones, rubans, véhicules).</li><li>Adapter le périmètre au type d’incident (accident, crime, événement).</li></ul><h3>2. Types de périmètres</h3><ul><li><strong>Périmètre d’intervention :</strong> zone immédiate du danger, réservée aux unités opérationnelles.</li><li><strong>Périmètre judiciaire :</strong> scène de crime gelée pour préserver les indices.</li><li><strong>Périmètre de sécurité publique :</strong> mettre les civils hors de portée du danger.</li></ul><h3>3. Bonnes pratiques</h3><ul><li>Un seul point d’entrée et de sortie sur les scènes judiciaires.</li><li>Agents dédiés à l’orientation des civils et des autres services.</li><li>Communication radio claire sur l’emplacement et le type de périmètre.</li></ul>` },
    { "id": "code-radio", "title": "Code Radio", "icon": "fa-wave-square", "level": "Débutant", "keywords": "10-codes communication dispatch patrouille statut poursuite", "content": `<h3>Codes 10 – Grille des communications radio</h3>... (contenu complet)` },
    { "id": "garde-a-vue", "title": "Gestion de Garde à Vue", "icon": "fa-clipboard-list", "level": "Avancé", "keywords": "gav mec cellule avocat médecin amendes incarcération", "content": `<h3>1. Entrée en garde à vue</h3>... (contenu complet)` }
  ];
  const allTrainings = allProcedures.filter(p => ['judiciaires', 'miranda', 'balisage'].includes(p.id));
  const trafficUnitTrainings = [
    { "id": "pit", "title": "Formation PIT", "icon": "fa-car-burst", "level": "Avancé", "keywords": "pit poursuite véhicule immobilisation", "content": `<h2>Formation à la technique d'immobilisation de précision (PIT)</h2><p>Le contenu de cette formation est en cours de rédaction.</p>` },
    { "id": "alcoolemie", "title": "Formation Alcoolémie", "icon": "fa-whiskey-glass", "level": "Intermédiaire", "keywords": "alcool test éthylotest dui", "content": `<h2>Formation sur les contrôles d'alcoolémie</h2><p>Le contenu de cette formation est en cours de rédaction.</p>` },
    { "id": "controle-vitesse", "title": "Formation Contrôle de Vitesse", "icon": "fa-gauge-high", "level": "Débutant", "keywords": "radar vitesse cinémomètre", "content": `<h2>Formation sur l'utilisation du cinémomètre et les contrôles de vitesse</h2><p>Le contenu de cette formation est en cours de rédaction.</p>` },
    { "id": "escorte", "title": "Formation Escorte de Convois", "icon": "fa-caravan", "level": "Avancé", "keywords": "escorte convoi vips protection", "content": `<h2>Formation sur les protocoles d'escorte de convois</h2><p>Le contenu de cette formation est en cours de rédaction.</p>` }
  ];

  // --- Logique des grilles et de la vue focus ---
  const grids = {
    procedures: { container: document.getElementById('procedureGrid'), data: allProcedures, filteredData: allProcedures },
    training: { container: document.getElementById('trainingGrid'), data: allTrainings, filteredData: allTrainings },
    traffic: { container: document.getElementById('trafficGrid'), data: trafficUnitTrainings, filteredData: trafficUnitTrainings }
  };
  
  const procedureSearchInput = document.getElementById('procedureSearch');
  const trainingSearchInput = document.getElementById('trainingSearch');
  const trafficSearchInput = document.getElementById('trafficSearch');

  const procedureFocusContent = document.getElementById('procedureFocusContent');
  const backToGridBtn = document.getElementById('backToGridBtn');
  const prevProcedureBtn = document.getElementById('prevProcedureBtn');
  const nextProcedureBtn = document.getElementById('nextProcedureBtn');

  let currentItemIndex = 0;
  let currentItemArray = [];

  const levelColorMapping = { 'Débutant': 'level-easy', 'Intermédiaire': 'level-intermediate', 'Avancé': 'level-advanced' };

  function displayCards(gridInfo) {
    const { container, filteredData } = gridInfo;
    if (!container) return;
    container.innerHTML = '';
    if (!filteredData || filteredData.length === 0) {
      container.innerHTML = '<div class="col"><p class="text-muted">Aucun élément à afficher.</p></div>';
      return;
    }
    filteredData.forEach((item, index) => {
      const levelClass = levelColorMapping[item.level] || 'level-default';
      container.insertAdjacentHTML('beforeend', `
        <div class="col" style="--animation-order: ${index};">
          <div class="card procedure-card h-100" data-index="${index}">
            <div class="card-body">
              <div class="procedure-card-header">
                <div class="procedure-card-icon"><i class="fa-solid ${item.icon}"></i></div>
                <span class="badge procedure-card-level ${levelClass}">${item.level}</span>
              </div>
              <h5 class="card-title mt-3">${item.title}</h5>
            </div>
          </div>
        </div>`);
    });
  }

  function renderFocusView(index, itemArray) {
    currentItemArray = itemArray;
    currentItemIndex = index;
    const item = currentItemArray[index];
    if (!item) return;

    procedureFocusContent.classList.add('content-fading-out');
    setTimeout(() => {
      procedureFocusContent.innerHTML = `<h2>${item.title}</h2><hr>${item.content}`;
      procedureFocusContent.classList.remove('content-fading-out');
    }, 200);
  }
  
  function handleGridClick(event, gridInfo) {
    const card = event.target.closest('.procedure-card');
    if (!card) return;
    const itemIndex = parseInt(card.dataset.index, 10);
    renderFocusView(itemIndex, gridInfo.filteredData);
    showFocusView();
  }

  // Attacher les gestionnaires d'événements
  for (const key in grids) {
    const gridInfo = grids[key];
    if (gridInfo.container) {
      gridInfo.container.addEventListener('click', (e) => handleGridClick(e, gridInfo));
    }
  }
  
  backToGridBtn.addEventListener('click', hideFocusView);

  prevProcedureBtn.addEventListener('click', () => {
    const newIndex = (currentItemIndex - 1 + currentItemArray.length) % currentItemArray.length;
    renderFocusView(newIndex, currentItemArray);
  });

  nextProcedureBtn.addEventListener('click', () => {
    const newIndex = (currentItemIndex + 1) % currentItemArray.length;
    renderFocusView(newIndex, currentItemArray);
  });

  // Gérer la recherche pour chaque section
  if (procedureSearchInput) {
    procedureSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      grids.procedures.filteredData = allProcedures.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || (p.keywords && p.keywords.toLowerCase().includes(searchTerm))
      );
      displayCards(grids.procedures);
    });
  }

  if (trainingSearchInput) {
    trainingSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      grids.training.filteredData = allTrainings.filter(t => 
        t.title.toLowerCase().includes(searchTerm) || (t.keywords && t.keywords.toLowerCase().includes(searchTerm))
      );
      displayCards(grids.training);
    });
  }

  if (trafficSearchInput) {
    trafficSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      grids.traffic.filteredData = trafficUnitTrainings.filter(t => 
        t.title.toLowerCase().includes(searchTerm) || (t.keywords && t.keywords.toLowerCase().includes(searchTerm))
      );
      displayCards(grids.traffic);
    });
  }

  // Affichage initial
  displayCards(grids.procedures);
  displayCards(grids.training);
  displayCards(grids.traffic);
});
