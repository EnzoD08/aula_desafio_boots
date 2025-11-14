let events = [
    { id: "E01",
      titulo: "Cybersecurity",
      categoria: "Palestra",
      dataISO: "05/12/2025",
      local: "Auditório Senai",
      descricao: "Palestra de conscientização sobre Cybersegurança",
      destaque: "Aberto",
      img: "../img/CyberSecurity.png"
    },

    { id: "E02",
      titulo: "Segurança no Trabalho",
      categoria: "Palestra",
      dataISO: "20/11/2025",
      local: "Auditório Senai",
      descricao: "Palestra de conscientização sobre Segurança no Trabalho",
      destaque: "Lotado",
      img: "../img/SegurancaNoTrabalho.png"
    },

    { id: "E03",
      titulo: "Senai Portas Abertas - 30 Anos",
      categoria: "Comemoração",
      dataISO: "01/12/2025",
      local: "Campus Senai",
      descricao: "Evento Portas Abertas em comemoração aos 30 anos do Senai Zerbini",
      destaque: "Aberto",
      img: "../img/Senai_PortasAbertas.png"
    }
];

// 1. Função para carregar e exibir os cards de evento
function loadEventCards() {
    const cardContainer = document.getElementById('product-cards');
    if (!cardContainer) return; // Sai se o container não for encontrado

    let htmlContent = '';

    events.forEach(event => {
        // Classe Bootstrap condicional para o destaque (Badge)
        let badgeClass = '';
        if (event.destaque === 'Aberto') {
            badgeClass = 'bg-success';
        } else if (event.destaque === 'Lotado') {
            badgeClass = 'bg-danger';
        } else {
            badgeClass = 'bg-secondary';
        }

        // Cria o HTML do Card de Evento
        htmlContent += `
            <div class="col">
                <div 
                    class="card h-100 shadow-sm event-card" 
                    style="cursor: pointer;"
                    data-bs-toggle="modal" 
                    data-bs-target="#eventDetailModal" 
                    data-event-id="${event.id}"
                >
                    <img src="${event.img}" class="card-img-top" alt="${event.titulo}" style="height: 150px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary">${event.titulo}</h5>
                        <p class="card-text small mb-1">
                            <i class="fas fa-calendar-alt me-1"></i> Data: ${event.dataISO}
                        </p>
                        <p class="card-text small mb-2">
                            <i class="fas fa-map-marker-alt me-1"></i> Local: ${event.local}
                        </p>
                        <span class="badge ${badgeClass} mt-auto align-self-start">${event.destaque}</span>
                    </div>
                </div>
            </div>
        `;
    });

    cardContainer.innerHTML = htmlContent;

    // 2. Adiciona o Event Listener para preencher o Modal
    setupModalListener();
}

// 3. Configura o listener do modal (executado após os cards serem criados)
function setupModalListener() {
    const detailModal = document.getElementById('eventDetailModal');

    if (detailModal) {
        detailModal.addEventListener('show.bs.modal', function (event) {
            // Botão que acionou o modal (o Card clicado)
            const button = event.relatedTarget; 
            const eventId = button.getAttribute('data-event-id');
            
            // Encontra o objeto evento correspondente
            const eventData = events.find(e => e.id === eventId);
            
            if (eventData) {
                // Preenche o conteúdo do Modal
                const modalTitle = detailModal.querySelector('.modal-title');
                const modalBody = detailModal.querySelector('.modal-body');

                modalTitle.textContent = eventData.titulo;
                modalBody.innerHTML = `
                    <div class="text-center mb-3">
                        <img src="${eventData.img}" class="img-fluid rounded shadow-sm" alt="${eventData.titulo}" style="max-height: 200px; object-fit: cover;">
                    </div>
                    <p class="mb-2"><strong class="text-primary"><i class="fas fa-calendar-alt me-2"></i>Data:</strong> ${eventData.dataISO}</p>
                    <p class="mb-2"><strong class="text-primary"><i class="fas fa-map-marker-alt me-2"></i>Local:</strong> ${eventData.local}</p>
                    <p class="mb-2"><strong class="text-primary"><i class="fas fa-tag me-2"></i>Categoria:</strong> ${eventData.categoria}</p>
                    <hr>
                    <p class="mb-0"><strong class="text-primary"><i class="fas fa-info-circle me-2"></i>Descrição:</strong></p>
                    <p>${eventData.descricao}</p>
                    <div class="text-end">
                        <span class="badge ${eventData.destaque === 'Aberto' ? 'bg-success' : 'bg-danger'}">${eventData.destaque}</span>
                    </div>
                `;
            }
        });
    }
}


// Executa o carregamento dos cards quando a página for totalmente carregada
document.addEventListener('DOMContentLoaded', loadEventCards);


/*
    Ajuste opcional: Função para controle de visualização de seção (Home, Eventos, Sobre Nós)
    Esta função esconde todas as seções e mostra apenas a selecionada.
*/
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove 'active' de todos os links
        document.querySelectorAll('.sidebar .nav-link').forEach(nav => nav.classList.remove('active'));
        
        // Adiciona 'active' ao link clicado
        this.classList.add('active');
        
        // Esconde todas as seções de conteúdo
        document.querySelectorAll('.content-area > section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Mostra a seção alvo
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

// Garante que apenas a seção 'home' esteja visível por padrão
document.addEventListener('DOMContentLoaded', () => {
    // Esconde todas as seções, exceto a primeira ('home-section')
    document.querySelectorAll('.content-area > section').forEach((section, index) => {
        section.style.display = index === 0 ? 'block' : 'none';
    });
});