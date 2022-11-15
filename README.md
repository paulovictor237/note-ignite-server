# Legenda

**RF** -> Requisitos Funcionais
**RNF** -> Requisitos não Funcionais
**RN** -> Regra de negócio

# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro
Deve ser possivel listar todas as categorias

**RNF**
Não deve ser possivel cadastrar um carro com uma placa ja existente
Não deve ser possivel alterar a placa de um carro já existente
O carro deve ser cadastrado por padrão com disponibilidade
O usuario responsavel pelo cadastro deve ser o administrador

# Listagem de carro

**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possível listar todos os carros disponiveis pelo nome da categoria
Deve ser possível listar todos os carros disponiveis pelo nome da marca
Deve ser possível listar todos os carros disponiveis pelo nome do carro

**RN**
O usuario não precisa estar logado no sistema

# Cadastro de especificaçao no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possovel listar todas as especificações
Deve ser possovel listar todos os carros

**RN**
Nao deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro
O usuario responsavel pelo cadastro deve ser o administrador

# Cadastro de imagens do carro

**RF**
deve ser possivel cadastrar a imagem do carro
deve ser possivel listar todas as imagens do carro

**RN**
Utilizar o muter para upload dos arquivos

**RN**
O usuariuo pode cadastrar mais de uma iamgem para o mesmo carro
O usuario responsavel pelo cadastro deve ser o administrador

# Alugel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
o aluguel de ve ter duração minima de 24h
Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o meso usuario
Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o meso carro
