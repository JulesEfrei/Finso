<div id="top"></div>

<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->

[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
  <!-- <img src="images/logo.png" alt="Logo" width="80" height="80" /> -->
  <!-- https://drive.google.com/uc?export=view&id=      => Google drive Link -->

  <h2 align="center">Finso</h2>

  <p align="center">
    Personal finance tracker (University project)
    <br />
    <!-- <a href="https://github.com/JulesEfrei/Finso"><strong>Explore the docs</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/JulesEfrei/Finso">View Demo</a>
    · -->
    <a href="https://github.com/JulesEfrei/Finso/issues">Report Bug</a>
    ·
    <a href="https://github.com/JulesEfrei/Finso/pulls">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap / Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#credit">Credit</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

- What the application does ?
- State of the Project (Alpha, Beta, Realeased)
- Main difficulties - [Roadmap](#roadmap)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project.

- [Vue.js](https://vuejs.org/)
- [Bun](https://bun.sh)
- [Drizzle ORM](https://orm.drizzle.team)
- [PostgreSQl](https://www.postgresql.org)
- [Hono Js](https://hono.dev)
- [Pinia](https://pinia.vuejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/JulesEfrei_/Finso.git
   ```

2. Setup environment variables (You can simply duplicate `.env.dist` file to `.env`)

   ```.env
   DB_HOST=db (Should be db if you're using docker, or localhost if running it withtout docker)
   DB_NAME=my_db
   DB_USER=root
   DB_PASSWORD=password
   JWT_SECRET=your-secret-key
   VITE_BASE_URL=http://localhost:3000/api
   ```

3. Run the application

   - Dev mode
     ```bash
     docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
     ```
   - Production mode
     ```bash
     docker compose -f docker-compose.yml up -d
     ```

4. Make database migration & import data fixtures

```bash
docker compose exec api bun run setup
```

5. Enjoy the application

```plainText
// DEV MODE \\
API => http://localhost:3000
FRONT-END => http://localhost:5173

// PROD MODE \\
API => http://localhost:3000
FRONT-END => http://localhost:8080
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

API endpoints:

Here is the updated markdown table with a "Body Params" column for the specified endpoints:

| Method | Endpoint                                         | Parameters            | Body Params                                                                              | Description                             |
| ------ | ------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------- |
| GET    | /api/health                                      | N/A                   | N/A                                                                                      | Check the health of the API             |
| POST   | /api/auth/register                               | N/A                   | {name: string, email: string, password: string}                                          | Register a new user                     |
| POST   | /api/auth/login                                  | N/A                   | {email: string, password: string}                                                        | Authenticate user (login)               |
| PUT    | /api/users/{id}                                  | id                    | {name: string, email: string, password: string}                                          | Modify user information                 |
| DELETE | /api/users/{id}                                  | id                    | N/A                                                                                      | Delete the user by ID                   |
| GET    | /api/users/{userId}/transactions                 | userId                | N/A                                                                                      | Get all transactions of the user        |
| GET    | /api/users/{userId}/transactions/categories      | userId                | N/A                                                                                      | Get transactions categories of the user |
| GET    | /api/users/{userId}/transactions/{transactionId} | userId, transactionId | N/A                                                                                      | Get a specific transaction by ID        |
| GET    | /api/users/{userId}/transactions/insight/month   | userId                | N/A                                                                                      | Get average income and outcome by month |
| POST   | /api/users/{userId}/transactions                 | userId                | {name: string, amount: number, date: date, type: "income"\|"outcome", category?: string} | Add a new transaction                   |
| DELETE | /api/users/{userId}/transactions/{transactionId} | userId, transactionId | N/A                                                                                      | Delete a specific transaction by ID     |

> Speicificity for the GET => /api/users/{userId}/transactions endpoint.
> You can user url params to filter the result. Here is the filter available:
>
> - name
> - type
> - minAmount
> - maxAmount
> - startDate
> - endDate
> - category

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Here is the roadmap of the project. Checked flags mean the features is out and unchecked flags mean that the feature is comming.

- [x] Architecture
  - [x] Docker configuration
  - [x] Pipiline on main
- [x] Front-end
  - [x] Dashboard view
  - [x] Profile view
  - [x] Transaction list view
  - [x] Login / Register view
  - [x] Quick add transaction modal
  - [x] Redirect when not logged
  - [x] Logout
  - [x] Auth store with Pinia
  - [x] Dark mode (based on user's system preference)
  - [x] Responsive
- [ ] Back-end API
  - [x] Create database schema
  - [x] JWT Authentication
  - [x] Auth routes
  - [x] Transactins routes
    - [x] CRUD
    - [x] Transactions filters
  - [x] User routes
  - [ ] Revalidate JWT token
- [ ] Testing
  - [x] API unit testing
  - [x] Front-end unit testing
  - [x] End-to-end testing
  - [ ] Test coverage > 90%

See the [open issues](https://github.com/JulesEfrei/Finso/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Credit -->

## Credit

List of people

- [Me](https://github.com/JulesEfrei)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Linked'in - [Jules](https://www.linkedin.com/in/jules-bruzeau/)

GitHub Profile: [JulesEfrei](https://github.com/JulesEfrei/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information. If no license is available in the Finso, it will be available one day, I hope.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/JulesEfrei/Finso.svg?style=for-the-badge
[contributors-url]: https://github.com/JulesEfrei/Finso/graphs/contributors -->
<!-- [stars-shield]: https://img.shields.io/github/stars/JulesEfrei/Finso.svg?style=for-the-badge
[stars-url]: https://github.com/JulesEfrei/Finso/stargazers -->

[forks-shield]: https://img.shields.io/github/forks/JulesEfrei/Finso.svg?style=for-the-badge
[forks-url]: https://github.com/JulesEfrei/Finso/network/members
[issues-shield]: https://img.shields.io/github/issues/JulesEfrei/Finso.svg?style=for-the-badge
[issues-url]: https://github.com/JulesEfrei/Finso/issues
[license-shield]: https://img.shields.io/github/license/JulesEfrei/Finso.svg?style=for-the-badge
[license-url]: https://github.com/JulesEfrei/Finso/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jules-bruzeau/
[product-screenshot]: images/screenshot.png
