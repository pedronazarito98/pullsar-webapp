import type { StrapiApp } from '@strapi/strapi/admin';

import {
  type PluginConfig,
  type Preset,
  setPluginConfig,
  defaultHtmlPreset,
  defaultMarkdownPreset,
} from '@_sh/strapi-plugin-ckeditor';

/**
 * Configuração personalizada do preset HTML padrão
 * Inclui suporte completo para rich text com media library do Strapi
 */
const defaultHtml: Preset = {
  ...defaultHtmlPreset,
  description: 'Editor HTML completo com suporte a mídia',
  editorConfig: {
    ...defaultHtmlPreset.editorConfig,
    placeholder: 'Comece a escrever seu conteúdo...',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      '|',
      'blockQuote',
      'codeBlock',
      '|',
      'strapiMediaLib',
      'insertTable',
      '|',
      'horizontalLine',
      '|',
      'undo',
      'redo',
    ],
  },
};

/**
 * Configuração do preset Markdown
 */
const defaultMarkdown: Preset = {
  ...defaultMarkdownPreset,
  description: 'Editor Markdown para conteúdo simplificado',
};

/**
 * Configuração do plugin CKEditor
 */
const ckeditorConfig: PluginConfig = {
  presets: [defaultHtml, defaultMarkdown],
};

export default {
  config: {
    locales: ['pt-BR', 'pt'],
  },
  register() {
    // Registra a configuração do CKEditor
    setPluginConfig(ckeditorConfig);
  },
  bootstrap(app: StrapiApp) {
    console.log('[Pullsar] Admin panel initialized');
  },
};
