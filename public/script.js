// Função para rolagem suave até a seção da equipe
function scrollToTeam() {
    const teamSection = document.getElementById('team');
    if (teamSection) { // Verifica se a seção existe antes de tentar rolar
        teamSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Adiciona a classe 'loaded' ao body após o carregamento do DOM
// Útil para iniciar animações CSS de entrada de forma controlada
document.addEventListener('DOMContentLoaded', function() {
    // Pequeno atraso para garantir que as transições/animações CSS funcionem corretamente
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Função para gerenciar a classe 'mobile' no body
function gerenciarClasseMobile() {
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Adiciona/remove a classe '.mobile' no body ao carregar e redimensionar a janela
window.addEventListener('load', gerenciarClasseMobile);
window.addEventListener('resize', gerenciarClasseMobile);

// NOTA SOBRE ANIMAÇÕES DOS CARDS DA EQUIPE:
// O seu CSS já inclui uma animação 'fadeInUp' para os '.team-card' que é executada
// quando a página carrega:
// .team-card {
//     opacity: 0;
//     transform: translateY(20px);
//     animation: fadeInUp 0.6s ease forwards;
// }
// O código JavaScript anterior que usava 'IntersectionObserver' para animar os cards
// ao rolar a página era redundante com essa animação CSS já existente para o efeito visual
// inicial. Por isso, foi removido para simplificar o script.
// Se você desejar um comportamento de animação diferente (ex: animar somente ao se tornarem visíveis
// na rolagem, e não no carregamento inicial), o CSS e o JavaScript precisariam ser ajustados
// de forma coordenada.