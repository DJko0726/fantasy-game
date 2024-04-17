# 使用 Node.js 的官方映像
FROM node:21

# 設定工作目錄
WORKDIR /app

# 複製 package.json 與 package-lock.json 並安裝相依套件
COPY package*.json ./
RUN npm install

# 複製應用程式程式碼
COPY . .

# 開放應用程式所需的 port
EXPOSE 3000

# 啟動應用程式
CMD ["npm", "start"]