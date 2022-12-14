-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: recipiedb
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `data` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fav`
--

DROP TABLE IF EXISTS `fav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fav_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `fav_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fav`
--

LOCK TABLES `fav` WRITE;
/*!40000 ALTER TABLE `fav` DISABLE KEYS */;
/*!40000 ALTER TABLE `fav` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `ingredients` varchar(255) DEFAULT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Leo','1234',1),(2,NULL,NULL,1),(3,NULL,NULL,1),(4,'axel','12345',1),(5,'SmolDawg','wendywinx',1),(6,'juho','$2a$10$osjUCisXIqx27yiLmRoI8e9HqT1zQzeap38JC3..oMFbTqctCZmb.',1),(7,'SmolDawg','$2a$10$.dBtUHaQfTwCwg1IMMLasOdCHb6rWGzF1shJoBMduw/BbddGQrESK',1),(8,'SmolDawg','$2a$10$IP6L2bV/S9J55AHcZ9P0N.ozXb8i9xp/rTjlx/C5DFO013/m04EPC',1),(9,'as','$2a$10$Vxm9mcDtC4CXplwGK5ZrS.Nx5HiU1Qp4nl1gNL//78yWSPl2AnzPm',1),(10,'sas','$2a$10$/L4Q.9U3aOBaYo6Fgh6Cx.W4M7u4UckvUcCe3fTHtmnckJqCE81L2',1),(11,'kuka sä oot','$2a$10$dKFA2os.tSkbXajUx5yhXOVy1ka8A.51fDl6P2P9eR3MCYoPZdkae',1),(12,'sasasas','$2a$10$ltWo4UkthMOkpCjoD1AHTePAY8ue8xxbxFcwwy1iVjaUlnp5lGfb2',1),(13,'sasa','$2a$10$NATlIpiEJMqFVNvIOWRKuOgf4phogbsnBgi2nzritCo5qBn7aGE5m',1),(14,'sasa','$2a$10$gqlqqp2Q9r3H6vpAck11XOLEwAAOvyC9BiX/8Th72woChpsWaxKwa',1),(15,'foo','$2a$10$vn6roINTDMG1JCrphDOc8O86zawERCk6k8OLMfLqNVJ6INWxqxNii',1),(16,'foo','$2a$10$y/LHA1w5T90ixEWPeOw3XOlem3waV4XU1ncxmUjpB6EyOL91TysY2',1),(17,'asadad','$2a$10$JhpiFr22Bggf80pPe5lTMesICqfhKcSHrohaUk9MQmIDOZFoRDg0e',1),(18,'asasas','$2a$10$o4JUpbCef5ih6oBAUZBQzOA4dP/UGlrzljmd6L.eKo0OBGaCkjOG2',1),(19,'sasasasasas','$2a$10$px/IX/nCV8cEoo71fbE8..9a0oEj6pXZHWS7/N27Be67DwrG231HS',1),(20,'dawdawdaw','$2a$10$Mub0jiuvOyZ3va.OWrQntOyipoenyKN2kHc70jkhoMeu1NmiPUyJa',1),(21,'waddawdawda','$2a$10$Ksi8An9wPEkmCg7RK7ybt.HwLa4i0V2Li3ypPzS4xm8Vj8B7.77zy',1),(22,'122','$2a$10$TqWUt4eLiYcjBVFlTeL2a.admu2Dlmub.GY1E98eVuJ055Z8Clf6O',1),(23,'wadadawdwaddw','$2a$10$gicnk3flIkpCfFwYzkrIuOraK4IBAG0.Cv7uEq69KwTllzNckg0QS',1),(24,'oot hyvä','$2a$10$Ruvzv4nvOosYFXbAJRYfh.5RotFMCxkbbIJkOBRnJhvNOmkDQah9S',1),(25,'sasasas','$2a$10$p3eb8dCeARSJeptH1R/yeOQYbU3bpE0M/eDeslwOZveoZRWOvz.dK',1),(26,'foosqsq','$2a$10$VIeEOZ7WR1V/bZP/Ixl.OOFh83aUht0.36EafFj6B5hUGxgGGuvSK',1),(27,'leoooo','$2a$10$YTk0.efSzot2j77BLkQUNO7/Frft90ZSjvfG5CUkTg7K5aVVuXW5.',1),(28,'leoryoo','$2a$10$W7jyCR8IWUZ4Cqs1/DaQCeQE2u303u8OtikgGgfNrSiUMf6vt8o3W',2),(29,'onkivaa','$2a$10$C9Cjon8/TFHcDlR827iSMeOE95355frcpFhz5ZqIRwRAr2d/WKqYW',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'recipiedb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 14:39:40
