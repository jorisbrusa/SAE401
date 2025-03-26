-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-test888.alwaysdata.net
-- Generation Time: Mar 26, 2025 at 08:01 PM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test888_easytodrive_db`
--
CREATE DATABASE IF NOT EXISTS `test888_easytodrive_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test888_easytodrive_db`;

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `ID_Admin` int(11) NOT NULL,
  `MDP` varchar(255) NOT NULL,
  `Auto_ecole` int(11) DEFAULT NULL,
  `Nom` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`ID_Admin`, `MDP`, `Auto_ecole`, `Nom`, `Email`) VALUES
(1, 'admin123', 1, 'Jean Admin', 'jean.admin@example.com'),
(2, 'admin456', 2, 'Sophie Admin', 'sophie.admin@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `Auto_Ecole`
--

CREATE TABLE `Auto_Ecole` (
  `ID_Auto_Ecole` int(11) NOT NULL,
  `Nom` varchar(100) NOT NULL,
  `Adresse` varchar(255) NOT NULL,
  `Dirigeant` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Auto_Ecole`
--

INSERT INTO `Auto_Ecole` (`ID_Auto_Ecole`, `Nom`, `Adresse`, `Dirigeant`) VALUES
(1, 'Auto-Ecole Paris', '123 Rue de Paris, Paris', 'Jean Dupont'),
(2, 'Auto-Ecole Lyon', '45 Avenue de Lyon, Lyon', 'Marie Curie');

-- --------------------------------------------------------

--
-- Table structure for table `Avis`
--

CREATE TABLE `Avis` (
  `ID_AVIS` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Contenu` varchar(500) DEFAULT NULL,
  `Eleve_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Avis`
--

INSERT INTO `Avis` (`ID_AVIS`, `Date`, `Contenu`, `Eleve_ID`) VALUES
(1, '2024-03-10', 'Super auto-école, très satisfait !', 1),
(2, '2024-03-15', 'Bonne formation mais un peu cher.', 2),
(5, '2025-03-22', 'TEST24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Eleves`
--

CREATE TABLE `Eleves` (
  `ID` int(11) NOT NULL,
  `NEPH_Email` varchar(100) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Auto_Ecole` int(11) DEFAULT NULL,
  `Jour_inscription` date NOT NULL,
  `Resultat_Examin` varchar(50) DEFAULT NULL,
  `Taux_de_reussite` int(11) DEFAULT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Eleves`
--

INSERT INTO `Eleves` (`ID`, `NEPH_Email`, `Prenom`, `Nom`, `Auto_Ecole`, `Jour_inscription`, `Resultat_Examin`, `Taux_de_reussite`, `code`) VALUES
(1, 'neph1234@example.com', 'Pierre', 'Durand', 1, '2024-03-23', 'Réussi', 85, '$2y$10$T/2pEFqwuySNu4uM/YYuFuvgDM/3tNexB1L3NpNbRbgHCNVVzdFC2'),
(2, 'neph5678@example.com', 'Lucie', 'Martin', 2, '2024-02-15', 'Échec', 45, '*7A207D62654EF52CD99190785BBE352603D813F4'),
(4, 'jeanmoulin@example.com', 'Jeans', 'Moulin', 1, '0000-00-00', NULL, NULL, '$2y$10$GFi8LGmQw6xJa9OrSL6QSObjBBKLkdwBwOM8dZYzl7y2hYvtAAPBG');

-- --------------------------------------------------------

--
-- Table structure for table `Resultat_Examen_Code`
--

CREATE TABLE `Resultat_Examen_Code` (
  `ID_C_Examen` int(11) NOT NULL,
  `Eleve_ID` int(11) DEFAULT NULL,
  `Date` date NOT NULL,
  `Numero_Examen` varchar(50) NOT NULL,
  `Note` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Resultat_Examen_Code`
--

INSERT INTO `Resultat_Examen_Code` (`ID_C_Examen`, `Eleve_ID`, `Date`, `Numero_Examen`, `Note`) VALUES
(1, 1, '2024-03-05', 'CODE123', 25),
(2, 2, '2024-03-20', 'CODE456', 21),
(3, 1, '2024-03-01', 'CODE001', 35),
(4, 1, '2025-03-21', 'CODE-TEST', 39),
(5, 1, '2024-03-10', 'CODE003', 31),
(6, 1, '2024-03-12', 'CODE004', 40),
(7, 1, '2024-03-15', 'CODE005', 25),
(8, 1, '2024-03-18', 'CODE006', 38),
(9, 1, '2024-03-20', 'CODE007', 27),
(10, 1, '2024-03-22', 'CODE008', 33),
(17, 1, '2025-03-21', '55', 40);

-- --------------------------------------------------------

--
-- Table structure for table `Resultat_Examen_Simu`
--

CREATE TABLE `Resultat_Examen_Simu` (
  `ID_S_Examen` int(11) NOT NULL,
  `Eleve_ID` int(11) DEFAULT NULL,
  `Date` date NOT NULL,
  `Numero_Examen` varchar(50) NOT NULL,
  `Impression` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Resultat_Examen_Simu`
--

INSERT INTO `Resultat_Examen_Simu` (`ID_S_Examen`, `Eleve_ID`, `Date`, `Numero_Examen`, `Impression`) VALUES
(1, 1, '2024-03-07', 'SIMU123', 'Examen réussi avec aisance'),
(2, 2, '2024-03-22', 'SIMU456', 'Quelques difficultés sur certaines questions'),
(3, 1, '2024-03-02', 'SIMU001', 'Bon'),
(4, 1, '2024-03-06', 'SIMU002', 'Moyen'),
(5, 1, '2024-03-09', 'SIMU003', 'Excellent'),
(6, 1, '2024-03-11', 'SIMU004', 'Passable'),
(7, 1, '2024-03-14', 'SIMU005', 'Bon'),
(8, 1, '2024-03-17', 'SIMU006', 'Très bon'),
(9, 1, '2024-03-19', 'SIMU007', 'Médiocre'),
(10, 1, '2024-03-21', 'SIMU008', 'Excellent'),
(11, 1, '2024-03-24', 'SIMU009', 'Bon');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`ID_Admin`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Auto_ecole` (`Auto_ecole`);

--
-- Indexes for table `Auto_Ecole`
--
ALTER TABLE `Auto_Ecole`
  ADD PRIMARY KEY (`ID_Auto_Ecole`);

--
-- Indexes for table `Avis`
--
ALTER TABLE `Avis`
  ADD PRIMARY KEY (`ID_AVIS`),
  ADD KEY `Eleve_ID` (`Eleve_ID`);

--
-- Indexes for table `Eleves`
--
ALTER TABLE `Eleves`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NEPH_Email` (`NEPH_Email`),
  ADD KEY `Auto_Ecole` (`Auto_Ecole`);

--
-- Indexes for table `Resultat_Examen_Code`
--
ALTER TABLE `Resultat_Examen_Code`
  ADD PRIMARY KEY (`ID_C_Examen`),
  ADD KEY `fk_recode_eleve` (`Eleve_ID`);

--
-- Indexes for table `Resultat_Examen_Simu`
--
ALTER TABLE `Resultat_Examen_Simu`
  ADD PRIMARY KEY (`ID_S_Examen`),
  ADD KEY `Eleve_ID` (`Eleve_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `ID_Admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Auto_Ecole`
--
ALTER TABLE `Auto_Ecole`
  MODIFY `ID_Auto_Ecole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Avis`
--
ALTER TABLE `Avis`
  MODIFY `ID_AVIS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Eleves`
--
ALTER TABLE `Eleves`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `Resultat_Examen_Code`
--
ALTER TABLE `Resultat_Examen_Code`
  MODIFY `ID_C_Examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Resultat_Examen_Simu`
--
ALTER TABLE `Resultat_Examen_Simu`
  MODIFY `ID_S_Examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Admin`
--
ALTER TABLE `Admin`
  ADD CONSTRAINT `Admin_ibfk_1` FOREIGN KEY (`Auto_ecole`) REFERENCES `Auto_Ecole` (`ID_Auto_Ecole`) ON DELETE CASCADE;

--
-- Constraints for table `Avis`
--
ALTER TABLE `Avis`
  ADD CONSTRAINT `Avis_ibfk_1` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleves` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `Eleves`
--
ALTER TABLE `Eleves`
  ADD CONSTRAINT `Eleves_ibfk_1` FOREIGN KEY (`Auto_Ecole`) REFERENCES `Auto_Ecole` (`ID_Auto_Ecole`) ON DELETE CASCADE;

--
-- Constraints for table `Resultat_Examen_Code`
--
ALTER TABLE `Resultat_Examen_Code`
  ADD CONSTRAINT `Resultat_Examen_Code_ibfk_1` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleves` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_recode_eleve` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleves` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `Resultat_Examen_Simu`
--
ALTER TABLE `Resultat_Examen_Simu`
  ADD CONSTRAINT `Resultat_Examen_Simu_ibfk_1` FOREIGN KEY (`Eleve_ID`) REFERENCES `Eleves` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
