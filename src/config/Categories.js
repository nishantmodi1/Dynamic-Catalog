export const CATEGORY_CONFIG = {
  Cars: {
    color: '#E63946',
    bg: 'rgba(230, 57, 70, 0.12)',
    border: 'rgba(230, 57, 70, 0.25)',
    glow: 'rgba(230, 57, 70, 0.15)',
    emoji: '🚗',
    description: 'From hatchbacks to hypercars',
  },
  Bikes: {
    color: '#F4A261',
    bg: 'rgba(244, 162, 97, 0.12)',
    border: 'rgba(244, 162, 97, 0.25)',
    glow: 'rgba(244, 162, 97, 0.15)',
    emoji: '🏍️',
    description: 'Two wheels, pure freedom',
  },
  Phones: {
    color: '#4CC9F0',
    bg: 'rgba(76, 201, 240, 0.12)',
    border: 'rgba(76, 201, 240, 0.25)',
    glow: 'rgba(76, 201, 240, 0.15)',
    emoji: '📱',
    description: 'Smart devices for modern life',
  },
  Computers: {
    color: '#2DC653',
    bg: 'rgba(45, 198, 83, 0.12)',
    border: 'rgba(45, 198, 83, 0.25)',
    glow: 'rgba(45, 198, 83, 0.15)',
    emoji: '💻',
    description: 'Machines that power the world',
  },
}

export const CATEGORIES = ['All', ...Object.keys(CATEGORY_CONFIG)]
