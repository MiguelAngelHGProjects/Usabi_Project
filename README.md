# Usabi_Project

Usabi_Project is an application designed to assist orchestra musicians in staying informed about scheduled concerts and associated music playlists.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Postman Documentation](#postman-documentation)   
- [Figma style](#figma-style)   
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Models](#models)
- [User manual](#user-manual)

## Overview

- Usabi_Project consists of a Ruby on Rails backend and a React frontend. This README provides information on how to set up the development environment, install dependencies, and contribute to the project.

- The users mostly can see only de proyects and the other information about playlists and their relation but not create, delete or update something of everything.

- The idea of this application arose from the need of OFGC musicians to organize their projects and concerts.

- This application had originally been developed for the OFGC company but due to a change the idea was taken to create it for the Usabi company using different technologies to adapt it to that company

## Prerequisites
Ruby on Rails: Rails 7.1.2 /Ruby 3.0.0
Node.js and npm (or Yarn): Last version
PostgreSQL: Last version

## Installation
Clone this repository: git clone: https://github.com/MiguelAngelHGProjects/Usabi_Project.git
Navigate to the project directory: cd Usabi_Project
Install backend dependencies: bundle install
Install frontend dependencies: npm install (or yarn install if using Yarn)  

## Postman Documentation
https://documenter.getpostman.com/view/29847204/2s9YkhhjqE

## Figma style
- https://www.figma.com/file/ZNQtIRRKhOMOLfblaa2AVd/Usabi_Project?type=design&node-id=0-1&mode=design

## Usage
Start the backend server: rails server
Start the frontend development server: npm start (or yarn start)
Open your browser and visit http://localhost:3000

## Configuration

Configure your PostgreSQL database:

- Open your `config/aplication.yml` file
- Update the `username`, `password`, and `database` values with your own PostgreSQL credentials

## Contributing

Contributions are welcome! If you want to contribute to the project, follow these steps:

Fork the repository.
Create a branch for your contribution: git checkout -b feature/new-feature
Make your changes and commit: git commit -m 'Add new feature'
Push to your branch: git push origin feature/new-feature
Open a Pull Request on GitHub.

## Models 
- E/R model

![EntityModel](imagesModels/EntityModel.png)
- Class diagram

![ClassDiagram](imagesModels/ClassDiagram.png)
- Use cases

![UserCases](imagesModels/UserCases.png)

- Model

![Model](imagesModels/Modelo.png)