    document.addEventListener("DOMContentLoaded", () => {
      const cabNavLinks = document.querySelectorAll('nav a[data-path="cabs"]');
      cabNavLinks.forEach(link => {
        link.className = "px-space-md py-space-sm bg-primary-container text-on-primary font-semibold shadow-sm text-body-md-medium font-body-md-medium rounded-full";
      });
      const homeLinks = document.querySelectorAll('nav a[data-path="home"]');
      homeLinks.forEach(link => {
        link.classList.remove("bg-primary-container", "text-on-primary", "font-semibold");
        link.classList.add("text-on-surface-variant");
      });
    });
  
