<!-- PROJECT SHIELDS -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h2 align="center">Sockets Demo</h2>

  <p align="center">
    A few projects examples of things you can do with sockets. Made in Angular, Node and Express. I came up with this idea after taking a course of Udemy by [Fernando Herrera](https://github.com/Klerith) to show everything learned.
    <br />
    <a href="https://github.com/tomimelo/sockets-projects"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://angular-node-sockets-demo.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/tomimelo/sockets-projects/issues">Report Bug</a>
    ·
    <a href="https://github.com/tomimelo/sockets-projects/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This app contains some examples you can do with sockets: A chat, poll, charts, interactive maps and more.

Live demo available [HERE](https://angular-node-sockets-demo.herokuapp.com/)

### Built With

* [Angular 9](https://angular.io/)
* [Node 12](https://nodejs.org/es/)
* [Socket.io](https://socket.io/)
* [Express](https://expressjs.com/es/)
* [Bootstrap 5](https://getbootstrap.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You will need a copy of [Node.js](https://nodejs.org/es/) as an environment to run the project. Then you use a dependency manager like npm to download dependencies into your project.

* npm
  ```sh
  npm install npm@latest -g
  ```

* Angular CLI
  ```sh
  npm install -g @angular/cli
  ```

* Typescript
  ```sh
  npm install -g typescript
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tomimelo/sockets-projects.git
   ```
2. Install NPM packages - You need to execute this command in both ***backend*** and ***frontend*** folders:
   ```sh
   npm install
   ```
3. Open a terminal and enter *frontend*. Then run the following command for a dev server
   ```sh
   ng serve
   ```
3. On another terminal enter *backend* folder and compile typescript project
   ```sh
   tsc
   ```
4. Enter on *dist* generated folder an run node server
   ```sh
   node index.js
   ```
5. Your app is ready. Open your browser and go to:
   ```sh
   localhost:5000
   ```


<!-- USAGE EXAMPLES -->
## Usage

You can open the same page on another browser to play around and see changes in real time.

<!-- CONTACT -->
## Contact

Tomas Melone - tomasmelone@hotmail.com

Project Link: [https://github.com/tomimelo/sockets-projects](https://github.com/tomimelo/sockets-projects)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

[README](https://github.com/othneildrew/Best-README-Template) template by @othneildrew

<!-- MARKDOWN LINKS & IMAGES -->
[forks-shield]: https://img.shields.io/github/forks/tomimelo/sockets-projects.svg?style=for-the-badge
[forks-url]: https://github.com/tomimelo/sockets-projects/network/members
[stars-shield]: https://img.shields.io/github/stars/tomimelo/sockets-projects.svg?style=for-the-badge
[stars-url]: https://github.com/tomimelo/sockets-projects/stargazers
[issues-shield]: https://img.shields.io/github/issues/tomimelo/sockets-projects.svg?style=for-the-badge
[issues-url]: https://github.com/tomimelo/sockets-projects/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tomasmelone