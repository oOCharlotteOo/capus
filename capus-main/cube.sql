-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 02, 2021 at 06:49 PM
-- Server version: 10.5.9-MariaDB-1:10.5.9+maria~focal
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cube`
--

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('38709752b3fd');

-- --------------------------------------------------------

--
-- Table structure for table `caracterise`
--

CREATE TABLE `caracterise` (
  `id_res` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_cat` int(11) NOT NULL,
  `label_cat` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_cat`, `label_cat`) VALUES
(1, 'communication'),
(2, 'cultures'),
(3, 'loisirs'),
(4, 'monde professionnel'),
(5, 'parentalité'),
(6, 'santé physique'),
(7, 'vie affective');

-- --------------------------------------------------------

--
-- Table structure for table `commentaires`
--

CREATE TABLE `commentaires` (
  `id_com` int(11) NOT NULL,
  `content_com` varchar(255) NOT NULL,
  `status_com` enum('Validated','Refused','Pending') DEFAULT NULL,
  `created_at_com` date NOT NULL,
  `updated_at_com` date DEFAULT NULL,
  `deleted_at_com` date DEFAULT NULL,
  `id_res` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `commentaires`
--

INSERT INTO `commentaires` (`id_com`, `content_com`, `status_com`, `created_at_com`, `updated_at_com`, `deleted_at_com`, `id_res`, `id_user`) VALUES
(1, 'J\'ai passé un super moment au café de la Bourse avec ma fille. Merci de nous permettre de nous reconnecter autour de petits plaisirs simples.', NULL, '2021-05-01', NULL, NULL, 1, 2),
(2, 'Une excellente idée d\'application, je vais tous vous inviter à boire un café !', 'Validated', '2021-05-02', NULL, NULL, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `consulter`
--

CREATE TABLE `consulter` (
  `id_cons` int(11) NOT NULL,
  `id_res` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `favorite` tinyint(1) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `note_user` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `consulter`
--

INSERT INTO `consulter` (`id_cons`, `id_res`, `id_user`, `favorite`, `start_date`, `end_date`, `note_user`) VALUES
(1, 1, 1, 1, '2021-05-02', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `csp`
--

CREATE TABLE `csp` (
  `id_csp` int(11) NOT NULL,
  `label_csp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `csp`
--

INSERT INTO `csp` (`id_csp`, `label_csp`) VALUES
(1, '1-Agriculteurs'),
(2, '2-Artisans/Commerçants/Chefs d\'entreprise'),
(3, '3-Cadres et professions intellectuelles supérieures'),
(4, '4-Professions intermédiaires'),
(5, '5-Employés'),
(6, '6-Ouvriers'),
(7, '7-Retraités'),
(8, '8-Autres personnes sans activité professionnelle');

-- --------------------------------------------------------

--
-- Table structure for table `est_valable`
--

CREATE TABLE `est_valable` (
  `id_res` int(11) NOT NULL,
  `id_rel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `est_valable`
--

INSERT INTO `est_valable` (`id_res`, `id_rel`) VALUES
(1, 1),
(1, 2),
(1, 3),
(4, 2),
(4, 3),
(5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id_rel` int(11) NOT NULL,
  `label_rel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id_rel`, `label_rel`) VALUES
(1, 'ma famille'),
(2, 'mes voisins'),
(3, 'mes amis');

-- --------------------------------------------------------

--
-- Table structure for table `ressources`
--

CREATE TABLE `ressources` (
  `id_res` int(11) NOT NULL,
  `title_res` varchar(100) NOT NULL,
  `image_res` varchar(255) DEFAULT NULL,
  `status_res` enum('Validated','Refused','Pending') DEFAULT NULL,
  `acces_res` tinyint(1) DEFAULT NULL,
  `created_at_res` date NOT NULL,
  `content_res` varchar(255) DEFAULT NULL,
  `content_long_res` text DEFAULT NULL,
  `source_res` varchar(50) NOT NULL,
  `updated_at_res` date DEFAULT NULL,
  `deleted_at_res` date DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_type_res` int(11) NOT NULL,
  `difficulty` enum('1','2','3','4','5') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ressources`
--

INSERT INTO `ressources` (`id_res`, `title_res`, `image_res`, `status_res`, `acces_res`, `created_at_res`, `content_res`, `content_long_res`, `source_res`, `updated_at_res`, `deleted_at_res`, `id_user`, `id_type_res`, `difficulty`) VALUES
(1, 'Coffee Bar', 'cafe.jpg', 'Validated', 1, '2021-04-27', 'Invitez quelqu\'un à boire un café', 'Invitez quelqu\'un à boire une tasse de café bien chaud et recréez du lien social avec vos amis, vos voisins...Un défi convivial et facile à réaliser !', '', NULL, NULL, 1, 1, '1'),
(4, 'Plateau de cupcakes', 'cupcakes.jpg', 'Validated', 1, '2021-05-02', 'Réalisez un plateau de cupcakes', 'Réalisez un plateau de cupcakes et offrez un moment de bonheur sucré à votre entourage. Laissez-vous tenter par ce défi coloré !', '', NULL, NULL, 1, 1, '4'),
(5, 'Hôtel à insectes', 'insectes.jpg', 'Validated', NULL, '2021-05-02', 'Préservez la biodiversité en installant cet abri', 'Installez un hôtel à insecte et engagez vous pour la préservation de la biodiversité. Invitez vos amis à défendre la Nature !', '', NULL, NULL, 1, 1, '2');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_roles` int(11) NOT NULL,
  `label_role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_roles`, `label_role`) VALUES
(1, 'citoyen'),
(2, 'citoyen connecté'),
(3, 'admin'),
(4, 'super admin'),
(5, 'modérateur');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id_tokens` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `deleted_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id_tokens`, `created_at`, `deleted_at`, `updated_at`, `id_user`) VALUES
(1, '2021-01-07', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `type_ressources`
--

CREATE TABLE `type_ressources` (
  `id_type_res` int(11) NOT NULL,
  `label_type_res` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type_ressources`
--

INSERT INTO `type_ressources` (`id_type_res`, `label_type_res`) VALUES
(1, 'challenge');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `password_user` varchar(100) NOT NULL,
  `mail_user` varchar(100) NOT NULL,
  `birthdate_user` date NOT NULL,
  `created_at_user` date NOT NULL,
  `updated_at_user` date DEFAULT NULL,
  `deleted_at_user` date DEFAULT NULL,
  `id_roles` int(11) NOT NULL,
  `zip_code_user` varchar(5) NOT NULL,
  `pseudo_user` varchar(50) NOT NULL,
  `id_csp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `firstname`, `lastname`, `password_user`, `mail_user`, `birthdate_user`, `created_at_user`, `updated_at_user`, `deleted_at_user`, `id_roles`, `zip_code_user`, `pseudo_user`, `id_csp`) VALUES
(1, 'patou', 'dubois', '1234', 'user@test.fr', '1986-08-17', '2021-01-07', NULL, NULL, 4, '', '', 2),
(2, 'Jean Michel', 'La Banane', '1234', 'labananejeanmichel@viacesi.fr', '1986-08-17', '2021-01-07', NULL, NULL, 4, '', '', 2),
(3, 'Alexandre', 'Clain', '1234', 'aclain@cesi.fr', '1986-08-17', '2021-01-07', NULL, NULL, 4, '', '', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `caracterise`
--
ALTER TABLE `caracterise`
  ADD PRIMARY KEY (`id_res`,`id_cat`),
  ADD KEY `id_cat` (`id_cat`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indexes for table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id_com`),
  ADD KEY `id_res` (`id_res`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `consulter`
--
ALTER TABLE `consulter`
  ADD PRIMARY KEY (`id_cons`),
  ADD KEY `consulter_ibfk_1` (`id_user`),
  ADD KEY `consulter_ibfk_2` (`id_res`);

--
-- Indexes for table `csp`
--
ALTER TABLE `csp`
  ADD PRIMARY KEY (`id_csp`);

--
-- Indexes for table `est_valable`
--
ALTER TABLE `est_valable`
  ADD PRIMARY KEY (`id_res`,`id_rel`),
  ADD KEY `id_rel` (`id_rel`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id_rel`);

--
-- Indexes for table `ressources`
--
ALTER TABLE `ressources`
  ADD PRIMARY KEY (`id_res`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_type_res` (`id_type_res`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_roles`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id_tokens`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `type_ressources`
--
ALTER TABLE `type_ressources`
  ADD PRIMARY KEY (`id_type_res`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_roles` (`id_roles`),
  ADD KEY `id_csp` (`id_csp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id_com` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `consulter`
--
ALTER TABLE `consulter`
  MODIFY `id_cons` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `csp`
--
ALTER TABLE `csp`
  MODIFY `id_csp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id_rel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ressources`
--
ALTER TABLE `ressources`
  MODIFY `id_res` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_roles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id_tokens` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `type_ressources`
--
ALTER TABLE `type_ressources`
  MODIFY `id_type_res` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `caracterise`
--
ALTER TABLE `caracterise`
  ADD CONSTRAINT `caracterise_ibfk_1` FOREIGN KEY (`id_res`) REFERENCES `ressources` (`id_res`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `caracterise_ibfk_2` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id_cat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_res`) REFERENCES `ressources` (`id_res`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `consulter`
--
ALTER TABLE `consulter`
  ADD CONSTRAINT `consulter_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consulter_ibfk_2` FOREIGN KEY (`id_res`) REFERENCES `ressources` (`id_res`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `est_valable`
--
ALTER TABLE `est_valable`
  ADD CONSTRAINT `est_valable_ibfk_1` FOREIGN KEY (`id_res`) REFERENCES `ressources` (`id_res`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `est_valable_ibfk_2` FOREIGN KEY (`id_rel`) REFERENCES `relations` (`id_rel`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ressources`
--
ALTER TABLE `ressources`
  ADD CONSTRAINT `ressources_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ressources_ibfk_2` FOREIGN KEY (`id_type_res`) REFERENCES `type_ressources` (`id_type_res`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_roles`) REFERENCES `roles` (`id_roles`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_csp`) REFERENCES `csp` (`id_csp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
