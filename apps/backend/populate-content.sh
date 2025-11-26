#!/bin/bash

# Strapi Content Population Script
API_URL="http://localhost:1337/api"

echo "🚀 Starting content population..."

# Get Author ID
AUTHOR_ID=$(curl -s "${API_URL}/authors" | jq -r '.data[0].id')
echo "✓ Found Author ID: $AUTHOR_ID"

# Get Category ID  
CATEGORY_ID=$(curl -s "${API_URL}/categories" | jq -r '.data[0].id')
echo "✓ Found Category ID: $CATEGORY_ID"

# Article 1: Low Complexity
echo "📝 Creating Article 1: Introdução Simples..."
curl -X POST "${API_URL}/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Introdução Simples",
      "description": "Um artigo simples para testar",
      "author": '"$AUTHOR_ID"',
      "category": '"$CATEGORY_ID"',
      "contentBlocks": [
        {
          "__component": "blocks.rich-text",
          "content": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }
              ]
            }
          ]
        }
      ],
      "publishedAt": "'"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"'"
    }
  }'

echo ""
echo "✓ Article 1 created"

# Article 2: Medium Complexity
echo "📝 Creating Article 2: Artigo Padrão com Mídia..."
curl -X POST "${API_URL}/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Artigo Padrão com Mídia",
      "description": "Um artigo com mídia e citação",
      "author": '"$AUTHOR_ID"',
      "category": '"$CATEGORY_ID"',
      "contentBlocks": [
        {
          "__component": "blocks.rich-text",
          "content": [
            {
              "type": "heading",
              "level": 2,
              "children": [
                {
                  "type": "text",
                  "text": "Seção Principal"
                }
              ]
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "text": "Este é um artigo de complexidade média com diferentes tipos de conteúdo."
                }
              ]
            }
          ]
        },
        {
          "__component": "blocks.quote",
          "quote": "A simplicidade é o grau máximo de sofisticação",
          "author": "Da Vinci",
          "role": "Artista e Inventor"
        }
      ],
      "publishedAt": "'"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"'"
    }
  }'

echo ""
echo "✓ Article 2 created"

# Article 3: High Complexity
echo "📝 Creating Article 3: Guia Completo Interativo..."
curl -X POST "${API_URL}/articles" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Guia Completo Interativo",
      "description": "Um guia completo com múltiplos componentes",
      "author": '"$AUTHOR_ID"',
      "category": '"$CATEGORY_ID"',
      "contentBlocks": [
        {
          "__component": "blocks.video-embed",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "title": "Vídeo Tutorial",
          "autoplay": false
        },
        {
          "__component": "blocks.cta",
          "title": "Baixe Agora",
          "description": "Obtenha acesso completo ao material",
          "buttonText": "Clique Aqui",
          "buttonUrl": "#download",
          "variant": "primary"
        }
      ],
      "publishedAt": "'"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"'"
    }
  }'

echo ""
echo "✓ Article 3 created"

echo "✅ All articles created successfully!"
