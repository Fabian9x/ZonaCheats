// ========================================
//     SIMPLE COMPONENT LOADER
//     ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Función simple para cargar componentes
    function loadComponent(element, componentName) {
        if (!element || !componentName) return;
        
        fetch(`components/${componentName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading ${componentName}: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                console.log(`✅ Component ${componentName} loaded successfully`);
            })
            .catch(error => {
                console.error(`❌ Error loading component ${componentName}:`, error);
                element.innerHTML = `<p style="color: red; padding: 20px;">Error loading ${componentName} component</p>`;
            });
    }
    
    // Cargar todos los componentes automáticamente
    const navElements = document.querySelectorAll('[data-component="nav"]');
    const footerElements = document.querySelectorAll('[data-component="footer"]');
    
    navElements.forEach(element => {
        loadComponent(element, 'nav');
    });
    
    footerElements.forEach(element => {
        loadComponent(element, 'footer');
    });
    
    console.log('🚀 Simple component loader initialized');
});
