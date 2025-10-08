document.addEventListener('DOMContentLoaded', () => {
  // 1. Definir los elementos a controlar
  const navLinks = document.querySelectorAll('nav a');
  const introSections = ['inicio', 'destacado']; // Secciones de la vista principal (Hero y Features)
  const contentSections = ['historia', 'como-funciona', 'tipos', 'guia', 'herramientas']; // Secciones de contenido exclusivo
  
  // Combina todas las secciones para manejar la visibilidad globalmente
  const allSections = introSections.concat(contentSections);
  
  // Función de utilidad para mostrar y ocultar secciones por ID
  const toggleSections = (showIds, hideIds) => {
    // Ocultar primero todas las secciones
    hideIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) section.classList.add('hidden');
    });
    // Luego mostrar solo las deseadas
    showIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) section.classList.remove('hidden');
    });
  };

  // 2. Establecer el estado inicial (Mostrar solo Inicio y Destacado, ocultar lo demás)
  const sectionsToStartHidden = allSections.filter(id => !introSections.includes(id));
  toggleSections(introSections, sectionsToStartHidden);

  // 3. Añadir manejadores de eventos a los enlaces de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Evita el salto de página

      // Remover la clase 'active' de todos los enlaces y añadirla al enlace actual
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');

      const targetId = link.getAttribute('href').substring(1); // Obtener el ID (#inicio, #historia, etc.)

      if (targetId === 'inicio') {
        // Clic en 'Inicio': Mostrar intro, ocultar contenido
        toggleSections(introSections, contentSections);
      } else if (contentSections.includes(targetId)) {
        // Clic en una sección de contenido: Ocultar todas, mostrar solo el objetivo
        const sectionsToHide = allSections.filter(id => id !== targetId);
        toggleSections([targetId], sectionsToHide);
      }
      
      // Desplazarse al inicio de la página para enfocar el nuevo contenido
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  
  // Marcar 'Inicio' como activo al cargar la página
  document.querySelector('a[href="#inicio"]').classList.add('active');
});