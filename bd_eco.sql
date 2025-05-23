CREATE DATABASE  IF NOT EXISTS `bd_eco` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_eco`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_eco
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'almacenamiento','editando','2025-05-07 23:12:00.965416','2025-05-22 17:55:44.000000',NULL),(2,'perifericos','categoria de perifericos pc','2025-05-20 09:50:32.340791','2025-05-22 17:48:15.000000',NULL),(3,'celulares','categoria de celulares de todas las marcas','2025-05-20 11:20:01.102277','2025-05-22 17:47:59.000000',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1746658112944,'InitialMigrate1746658112944');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `specification_id` int DEFAULT NULL,
  `title_id` int DEFAULT NULL,
  `specification_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e1acdfdecfde64e57b91b7256e8` (`product_id`),
  KEY `FK_6535ed00eee75934e382179a301` (`specification_id`),
  KEY `FK_7262e9a9c47edc247af46988193` (`title_id`),
  KEY `FK_033cd843cbe938387545f44818a` (`specification_type_id`),
  CONSTRAINT `FK_033cd843cbe938387545f44818a` FOREIGN KEY (`specification_type_id`) REFERENCES `specification_types` (`id`),
  CONSTRAINT `FK_6535ed00eee75934e382179a301` FOREIGN KEY (`specification_id`) REFERENCES `specifications` (`id`),
  CONSTRAINT `FK_7262e9a9c47edc247af46988193` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `FK_e1acdfdecfde64e57b91b7256e8` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
INSERT INTO `product_specifications` VALUES (1,'2025-05-20 10:08:53.590237','2025-05-22 16:42:57.390309',NULL,1,1,NULL,1),(2,'2025-05-20 10:09:07.721806','2025-05-22 16:42:57.389455',NULL,2,1,NULL,1),(3,'2025-05-20 11:37:16.741552','2025-05-22 16:42:57.387797',NULL,3,2,NULL,1),(4,'2025-05-20 11:38:03.435094','2025-05-22 16:42:57.386232',NULL,3,1,NULL,2),(5,'2025-05-22 16:44:49.151908','2025-05-22 16:44:49.000000',NULL,2,2,NULL,1),(6,'2025-05-22 17:45:08.779922','2025-05-22 17:45:08.779922',NULL,10,3,1,2),(7,'2025-05-22 17:45:08.818481','2025-05-22 17:45:08.818481',NULL,10,4,1,2),(8,'2025-05-22 17:54:29.923601','2025-05-22 17:54:29.923601',NULL,11,5,1,2),(9,'2025-05-22 17:54:29.960370','2025-05-22 17:54:29.960370',NULL,11,6,1,2),(10,'2025-05-22 17:54:30.004354','2025-05-22 17:54:30.004354',NULL,11,7,1,3);
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `subcategory_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c9de3a8edea9269ca774c919b9a` (`subcategory_id`),
  CONSTRAINT `FK_c9de3a8edea9269ca774c919b9a` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'probaaaa','producto probado y editado',0.00,'string','2025-05-20 09:49:07.763105','2025-05-20 09:50:02.000000',NULL,1),(2,'probaaaa','producto respues',0.00,'string','2025-05-20 09:54:00.006580','2025-05-20 09:54:00.006580',NULL,1),(3,'iphone 15 pro max','iphone excelente para tu uso diario y cotidiano',3403000.00,'asassasg','2025-05-20 11:26:43.065275','2025-05-20 11:30:53.401597',NULL,3),(4,'iphone 11 pro max','iphone excelente para tu uso diario y cotidiano',3403000.00,'undefined/uploads/images/fdf50328-2ed4-4f7c-ba12-bdd0bb3b4c51.png','2025-05-20 12:01:14.487521','2025-05-20 12:12:20.000000',NULL,4),(5,'imagennnn','string',5999.00,'undefined/uploads/images/df32bcb6-5310-4edc-acff-05768f377909.png','2025-05-20 12:20:18.425136','2025-05-20 12:22:07.000000',NULL,1),(6,'string','string',0.00,'string','2025-05-22 16:01:13.706128','2025-05-22 16:01:13.706128',NULL,1),(7,'string','string',0.00,'string','2025-05-22 16:02:10.221966','2025-05-22 16:02:10.221966',NULL,1),(8,'string','string',0.00,'string','2025-05-22 16:03:21.841587','2025-05-22 16:03:21.841587',NULL,1),(9,'papaya','soy una papaya',22.00,'C:\\fakepath\\diagrama de uso.png','2025-05-22 16:56:54.147648','2025-05-22 17:50:57.338983',NULL,4),(10,'MERCUSYS_BC66','producto melo una chimba',2333.00,'/placeholder.svg','2025-05-22 17:45:08.720240','2025-05-22 17:45:08.720240',NULL,4),(11,'Sansung galaxi s27 ultra Pro max amalaamalalamam','producto muy bueno para cualquier persona que busca aventura.',2300299.00,'/placeholder.svg','2025-05-22 17:54:29.874371','2025-05-22 17:54:29.874371',NULL,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2025-05-07 23:15:46.211650','2025-05-07 23:15:46.211650',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesuser`
--

DROP TABLE IF EXISTS `rolesuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `roleId` bigint NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e679da7709b7d96fa5f66ffc59f` (`userId`),
  KEY `FK_20e333d7e9e22feef025eaa6f51` (`roleId`),
  CONSTRAINT `FK_20e333d7e9e22feef025eaa6f51` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `FK_e679da7709b7d96fa5f66ffc59f` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesuser`
--

LOCK TABLES `rolesuser` WRITE;
/*!40000 ALTER TABLE `rolesuser` DISABLE KEYS */;
INSERT INTO `rolesuser` VALUES (2,2,1,'2025-05-07 23:16:07.828123','2025-05-07 23:16:07.828123',NULL);
/*!40000 ALTER TABLE `rolesuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specification_types`
--

DROP TABLE IF EXISTS `specification_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specification_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specification_types`
--

LOCK TABLES `specification_types` WRITE;
/*!40000 ALTER TABLE `specification_types` DISABLE KEYS */;
INSERT INTO `specification_types` VALUES (1,'especificacuon tipo','2025-05-20 10:07:39.090197','2025-05-20 11:33:30.761280',NULL),(2,'Pantalla','2025-05-20 11:32:40.828179','2025-05-20 11:33:06.000000',NULL),(3,'almacenamiento','2025-05-22 17:44:07.401781','2025-05-22 17:44:07.401781',NULL);
/*!40000 ALTER TABLE `specification_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specifications`
--

DROP TABLE IF EXISTS `specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specifications`
--

LOCK TABLES `specifications` WRITE;
/*!40000 ALTER TABLE `specifications` DISABLE KEYS */;
INSERT INTO `specifications` VALUES (1,'especi','string','2025-05-20 10:06:52.409643','2025-05-20 10:06:52.409643',NULL),(2,'TIPO','amoled','2025-05-20 11:36:24.920611','2025-05-20 11:36:24.920611',NULL),(3,'Almacenamiento','126 GB','2025-05-22 17:45:08.748337','2025-05-22 17:45:08.748337',NULL),(4,'lsd','64 .pl','2025-05-22 17:45:08.800598','2025-05-22 17:45:08.800598',NULL),(5,'Oled','6.7 pulgadas','2025-05-22 17:54:29.898870','2025-05-22 17:54:29.898870',NULL),(6,'lsd','pantalla curva de gran duracion','2025-05-22 17:54:29.941002','2025-05-22 17:54:29.941002',NULL),(7,'capacidad','246 gb ','2025-05-22 17:54:29.986944','2025-05-22 17:54:29.986944',NULL);
/*!40000 ALTER TABLE `specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f7b015bc580ae5179ba5a4f42ec` (`category_id`),
  CONSTRAINT `FK_f7b015bc580ae5179ba5a4f42ec` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'string','string','2025-05-08 00:04:10.395753','2025-05-09 13:58:57.581759',NULL,1),(3,'cuartaeditada','meedite','2025-05-08 00:15:11.417115','2025-05-09 13:58:57.578883',NULL,1),(4,'soycuarta','string','2025-05-08 00:16:24.166497','2025-05-08 00:16:24.166497',NULL,1),(5,'ihpone','sssss','2025-05-20 11:21:36.068118','2025-05-22 17:51:46.246804',NULL,3),(6,'sansung',NULL,'2025-05-22 17:51:46.247576','2025-05-22 17:51:46.247576',NULL,3);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titles`
--

LOCK TABLES `titles` WRITE;
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` VALUES (1,'formacion','2025-05-20 10:07:14.679142','2025-05-20 10:07:14.679142',NULL);
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'jhonier','string','$2b$10$VOTyK1P59l7TWJbtJ8ESu.V2.795l82lsxwPBn5BSAI89S9CLEU6q','jhonierpasos9@gmail.com','2025-05-07 23:16:07.809086','2025-05-07 23:16:07.809086',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23 10:03:25
