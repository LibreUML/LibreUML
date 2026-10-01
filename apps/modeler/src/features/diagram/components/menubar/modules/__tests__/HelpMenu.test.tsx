// Help menu — "Star on GitHub" entry.
//
// Mocks:
//   • react-i18next        — t(key) → key (avoids i18next bootstrap)
//   • HelpDocumentationModal — not under test, only imported by HelpMenu

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string): string => key }),
}));

vi.mock('../../../modals/HelpDocumentationModal', () => ({ default: () => null }));

import { HelpMenuContent } from '../HelpMenu';

describe('HelpMenuContent — star entry', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the star entry', () => {
    render(<HelpMenuContent onOpenDocs={() => {}} />);
    expect(screen.getByText('menubar.help.starRepo')).toBeTruthy();
  });

  it('opens the repository in a new tab without leaking window.opener', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<HelpMenuContent onOpenDocs={() => {}} />);

    await userEvent.click(screen.getByText('menubar.help.starRepo'));

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      'https://github.com/LibreUML/LibreUML',
      '_blank',
      'noopener,noreferrer',
    );
  });
});
