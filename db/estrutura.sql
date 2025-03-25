//TODO - colocar estrutura do banco e tabelas
CREATE DATABASE `gerenciador_financas` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cpf` varchar(11) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;