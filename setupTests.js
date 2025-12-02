// make Vitest's expect available globally before jest-dom imports
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add the jest-dom matchers to Vitest's expect
expect.extend(matchers);
