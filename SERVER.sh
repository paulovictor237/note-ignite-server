# conectar-se ao servidor da amazon
https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#ConnectToInstance:instanceId=i-08a8e58942b41e3be
chmod 400 ignite-nodejs.pem
ec2-18-228-222-55.sa-east-1.compute.amazonaws.com

# [servidor] criando um novo sudo user
sudo adduser app 
sudo usermod -aG sudo app    
sudo su - app 

# [servidor] criando ssh
mkdir .ssh
chmod 700 .ssh/
cd .ssh
touch authorized_keys
vi authorized_keys 
chmod 600 authorized_keys
sudo service ssh restart
ssh app@18.228.222.55 

# [pessoal] gerando ssh
ssh-keygen
cat ~/.ssh/id_rsa.pub  

# [servidor] instalar pacotes
https://github.com/nodesource/distributions/blob/master/README.md
https://docs.docker.com/compose/install/linux/
https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable
sudo apt install nginx
pm2 start dist/shared/infra/http/server.js  --name rentx_app

# install packages
yarn add @babel/cli @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/preset-env babel-plugin-module-resolver babel-plugin-transform-typescript-metadata @babel/preset-typescript -D