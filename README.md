# 🚗 Aceleradio.AI - Transformador de Dados Veiculares

Um sistema completamente desnecessário que muda o gênero musical baseado na velocidade do seu carro. Porque quem precisa de um DJ quando seu carro pode ser um?

## Visão Geral

Este projeto revolucionário (e totalmente inútil) recebe dados de telemetria veicular do Google Cloud Pub/Sub, analisa a velocidade do veículo e determina qual gênero musical você DEVE estar ouvindo naquele momento. Afinal, quem nunca quis que seu carro escolhesse a playlist por você?

## Funcionalidades Absolutamente Dispensáveis

- Processamento de dados veiculares em tempo real via Google Cloud Pub/Sub (porque usar o velocímetro seria muito simples)
- Algoritmo sofisticado de seleção musical baseado unicamente na velocidade
- Servidor WebSocket para notificar instantaneamente qual música você deveria estar ouvindo
- Arquitetura super complexa para uma tarefa ridiculamente simples

## Stack Tecnológica Exageradamente Robusta

- Framework NestJS
- TypeScript
- Google Cloud Pub/Sub
- Socket.IO para comunicação em tempo real

## Como Começar (Se Realmente Quiser)

### Pré-requisitos

- Node.js 18+ (mais atual = mais legal)
- Conta Google Cloud com Pub/Sub habilitado (porque gastar dinheiro em ideias inúteis é o objetivo)
- Um carro com telemetria (ou simule dados, ninguém vai conferir mesmo)

### Variáveis de Ambiente

```
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=caminho/para/service/account/aqui.json
PUBSUB_PROJECT_ID=seu-projeto-gcp-id
PUBSUB_TOPIC_NAME=car-data-topic
PUBSUB_SUBSCRIPTION_NAME=car-data-subscription
```

### Instalação

```bash
# Instalar dependências (muitas desnecessárias)
pnpm install

# Iniciar o servidor
pnpm start:dev
```

## Como Funciona

1. O sistema se conecta ao Google Cloud Pub/Sub (gastando seus créditos)
2. Seu carro envia dados sobre velocidade (que você poderia ver no painel)
3. Nosso algoritmo revolucionário decide qual gênero musical combina com sua velocidade
4. O aplicativo recebe a notificação e muda a música automaticamente
