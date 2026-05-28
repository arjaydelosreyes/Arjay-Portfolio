import '@testing-library/jest-dom'

// jsdom does not implement IntersectionObserver — stub it out for all tests
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver
