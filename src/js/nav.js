
    // Pega todos os links do menu
    const navLinks = document.querySelectorAll('nav.menu-desktop ul li a');

    // Pega todas as sections que têm ID (home, sobre, projeto, skills, contato)
    const sections = document.querySelectorAll('section[id]');

    // Configuração do IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');

            if (entry.isIntersecting) {
                // Remove classe 'active' de todos
                navLinks.forEach(link => link.classList.remove('active'));

                // Adiciona 'active' só no link correspondente
                document.querySelector(`nav.menu-desktop ul li a[href="#${id}"]`).classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.4 // Reduzido de 0.6 para 0.2
    });

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });

