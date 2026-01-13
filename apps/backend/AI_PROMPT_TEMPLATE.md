# Prompt Template para Geração de Artigos

Copie o conteúdo abaixo e cole na sua ferramenta de IA (Claude, ChatGPT, etc). Substitua `[TEMA DO ARTIGO]` pelo assunto que deseja abordar.

---

Você é um redator sênior e especialista em SEO. Sua tarefa é escrever um artigo completo para um blog de tecnologia e inovação chamado "Pullsar".

**Tema do Artigo:** [TEMA DO ARTIGO]

Gere o resultado EXCLUSIVAMENTE em formato JSON, sem texto antes ou depois, seguindo estritamente a estrutura abaixo. O conteúdo deve ser rico, bem formatado (Markdown no corpo do texto) e otimizado para leitura.

```json
{
  "title": "Título atrativo e otimizado para SEO (Max 60 chars)",
  "subtitle": "Subtítulo engajador que complementa o título",
  "slug": "slug-otimizado-para-seo-separado-por-hifens",
  "description": "Meta description curta e instigante para SEO (Max 160 chars)",
  "readTime": "X min de leitura",
  "imagePrompt": "Um prompt detalhado e artístico para gerar uma imagem de capa no Midjourney/DALL-E. Descreva estilo, iluminação, e elementos visuais. Ex: 'Cinematic wide shot of a futuristic cyberpunk city with neon lights, purple and blue color palette, realistic, detailed, 8k'.",
  "category": "Tecnologia",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "contentBlocks": [
    {
      "__component": "blocks.rich-text",
      "content": "## Introdução\n\nEscreva a introdução aqui. Use **negrito** para destaque. A introdução deve prender o leitor logo de cara."
    },
    {
      "__component": "blocks.quote",
      "quote": "Frase de destaque ou citação relevante",
      "author": "Nome do Autor (opcional)",
      "role": "Cargo ou contexto (opcional)"
    },
    {
      "__component": "blocks.rich-text",
      "content": "## Desenvolvimento\n\nDesenvolva o assunto com profundidade. Use parágrafos curtos.\n\n### Subtópico Importante\n\nDetalhes sobre o subtópico. Traga dados ou exemplos práticos."
    },
    {
      "__component": "blocks.cta",
      "title": "Gostou deste artigo?",
      "description": "Compartilhe com seus amigos e assine nossa newsletter.",
      "buttonUrl": "/newsletter",
      "buttonText": "Assinar Agora",
      "variant": "primary"
    }
  ]
}
```

**Regras Importantes:**

1.  **blocks.rich-text**: O campo `content` DEVE ser Markdown válido.
2.  **category**: Escolha uma categoria existente ou sugira uma nova (ex: Tecnologia, Inovação, Carreira, Design).
3.  **tags**: Lista de strings simples.
4.  **imagePrompt**: Capriche na descrição visual.
5.  **NÃO invente componentes** fora da lista: `blocks.rich-text`, `blocks.quote`, `blocks.cta` (e `blocks.image` se tiver URL, mas evite por enquanto).
