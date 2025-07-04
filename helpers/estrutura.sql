CREATE DATABASE `gerenciador_financas`;

USE `gerenciador_financas`;

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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `tipo` enum('D','C') NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1

CREATE TABLE `users_categories` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `users_categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `debits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,2) DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1  DEFAULT CHARSET=latin1;

CREATE TABLE `credits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,2) DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `gerenciador_financas`.`users`
(`nome`,
`email`,
`senha`,
`cpf`,
`cep`,
`numero`,
`complemento`)
VALUES
('Admin', 'admin@admin.com', '$2b$10$IPfuQUUE4ssNUYS614WwjOWFR2pWiqpDqKv0Cc1a5wGBjX1ScPzM.', '99999999999', '01234567', '1', 'Casa A');

