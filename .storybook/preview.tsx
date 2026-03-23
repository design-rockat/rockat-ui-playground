import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { rockatLightTheme, rockatDarkTheme } from '../src/design-system/theme/antd-theme';
import '../src/app/globals.css';

const withTheme: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark';

  // Sync CSS tokens with toolbar selection
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

  const antdConfig = {
    ...(isDark ? rockatDarkTheme : rockatLightTheme),
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdConfig}>
      <div
        style={{
          background: 'var(--rockat-bg)',
          minHeight: '100vh',
          padding: '1.5rem',
          transition: 'background 0.2s',
          color: 'var(--rockat-text)',
        }}
      >
        <Story />
      </div>
    </ConfigProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
