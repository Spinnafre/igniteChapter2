# Imagem base
FROM node

# Diretório com as informações, onde vai ficar a imagem
WORKDIR /user/app

COPY package.json ./

RUN npm install

# Copia tudo para dentro da pasta raiz
COPY . .

# Porta
EXPOSE 3333

# Rodar os camando que precisa rodar
CMD ["npm","start"]